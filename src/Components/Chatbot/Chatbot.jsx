import React, { useState } from "react";
import "./chatbot.css";
import { searchAll } from "../../api/searchApis";
import siteContent from "../../data/siteContent.json";

const routes = {
  home: "/",
  guide: "/Guide",
  faq: "/FAQ",
  books: "/book-and-monograph",
  serial: "/serial",
  patents: "/patents",
  websites: "/websites",
};

const speak = (text, lang) => {
  if (!("speechSynthesis" in window)) return;
  const utter = new SpeechSynthesisUtterance(text);
  utter.lang = lang === "hi" ? "hi-IN" : "en-US";
  // choose a voice if available
  const voices = window.speechSynthesis.getVoices();
  const v = voices.find((x) =>
    lang === "hi" ? x.lang.startsWith("hi") : x.lang.startsWith("en"),
  );
  if (v) utter.voice = v;
  window.speechSynthesis.cancel();
  window.speechSynthesis.speak(utter);
};

const Chatbot = () => {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState([
    {
      from: "saathi",
      text: "Hi, I am Saathi — I can help you with site content and bibliographic search. Ask in English or Hindi.",
    },
  ]);
  const [input, setInput] = useState("");
  const [lang, setLang] = useState("en");
  const [speaking, setSpeaking] = useState(true);

  const push = (m) => setMessages((s) => [...s, m]);

  const handleQuery = async (q) => {
    const trimmed = q.trim();
    if (!trimmed) return;
    push({ from: "user", text: q });
    // heuristics: site navigation
    const low = trimmed.toLowerCase();
    if (/guide|how to|reference/.test(low)) {
      const text =
        lang === "hi"
          ? "आप Reference Guide पृष्ठ यहाँ देख सकते हैं: " + routes.guide
          : "You can see the Reference Guide here: " + routes.guide;
      push({ from: "saathi", text });
      if (speaking) speak(text, lang);
      return;
    }
    if (/faq|question/.test(low)) {
      const text =
        lang === "hi"
          ? "FAQ पृष्ठ यहाँ है: " + routes.faq
          : "FAQ page is here: " + routes.faq;
      push({ from: "saathi", text });
      if (speaking) speak(text, lang);
      return;
    }

    // site content search (Guide, FAQ, Home, forms)
    try {
      const qWords = low.split(/\s+/).filter(Boolean);
      const scores = siteContent.map((entry) => {
        const lc = (
          entry.title +
          " " +
          entry.content +
          " " +
          entry.path
        ).toLowerCase();
        let score = 0;
        for (const w of qWords) if (lc.includes(w)) score++;
        return { entry, score, lc };
      });
      const top = scores
        .filter((s) => s.score > 0)
        .sort((a, b) => b.score - a.score);
      if (top.length > 0) {
        const best = top[0].entry;
        // Try to extract direct answer sentences that contain query words
        const content = (best.content || "").replace(/\s+/g, " ").trim();
        const sentences = content.match(/[^.!?]+[.!?]?/g) || [content];
        const matches = [];
        for (const s of sentences) {
          const sl = s.toLowerCase();
          for (const w of qWords) {
            if (w.length > 2 && sl.includes(w)) {
              matches.push(s.trim());
              break;
            }
          }
          if (matches.length >= 2) break;
        }

        let answer = "";
        if (matches.length > 0) {
          // join up to two sentences for a concise direct answer
          answer = matches.slice(0, 2).join(" ");
        } else if (content.length > 0) {
          // fallback: concise summary (first 240 chars)
          answer =
            content.length > 240
              ? content.substr(0, 240).trim() + "..."
              : content;
        } else {
          answer =
            lang === "hi"
              ? "मुझे साइट से कोई विशिष्ट उत्तर नहीं मिला।"
              : "I could not find a specific answer on the site.";
        }

        const text = answer;
        push({ from: "saathi", text });
        if (speaking) speak(text, lang);
        return;
      }
    } catch (e) {
      // non-blocking: fall through to bibliographic search
      console.warn("siteContent search error", e);
    }
    // if contains DOI/ISBN or keywords search
    if (/10\.\d{4,}\/|isbn|issn|doi|title|author|search/.test(low)) {
      push({
        from: "saathi",
        text:
          lang === "hi" ? "मैं परिणाम खोज रहा हूँ..." : "Searching results...",
      });
      try {
        const results = await searchAll(trimmed);
        if (!results || results.length === 0) {
          const text =
            lang === "hi" ? "कोई परिणाम नहीं मिला।" : "No results found.";
          push({ from: "saathi", text });
          if (speaking) speak(text, lang);
          return;
        }
        // format top 3
        const top = results
          .slice(0, 3)
          .map(
            (r, i) =>
              `${i + 1}. ${r.title || r.raw?.title || ""} ${r.authors ? "- " + (r.authors.join ? r.authors.join(", ") : r.authors) : ""} ${r.doi || r.isbn || r.url ? "[" + (r.doi || r.isbn || r.url) + "]" : ""}`,
          );
        const text =
          (lang === "hi" ? "मिली हुई शीर्ष प्रविष्टियाँ: " : "Top results: ") +
          "\n" +
          top.join("\n");
        push({ from: "saathi", text });
        if (speaking) speak(text, lang);
      } catch (err) {
        const text =
          lang === "hi" ? "खोज में त्रुटि हुई।" : "Error during search.";
        push({ from: "saathi", text });
        if (speaking) speak(text, lang);
      }
      return;
    }

    // fallback: simple help
    const fallback =
      lang === "hi"
        ? 'मैं साइट की सामग्री और बिब्लियोग्राफिक खोज में मदद कर सकता हूँ। आप पूछ सकते हैं: "search <title>" या "Where is Guide"।'
        : 'I can help with site content and bibliographic search. Try: "search <title>" or "Where is Guide".';
    push({ from: "saathi", text: fallback });
    if (speaking) speak(fallback, lang);
  };

  return (
    <div className={`saathi-widget ${open ? "open" : ""}`}>
      <div
        className="saathi-button"
        onClick={() => setOpen(!open)}
        aria-label="Open Chatbot Saathi"
      >
        <span className="saathi-avatar">🤖</span>
        <span className="saathi-label">Chatbot Saathi</span>
      </div>
      {open && (
        <div className="saathi-panel">
          <div className="saathi-header">
            <div className="saathi-title">Saathi</div>
            <div className="saathi-controls">
              <select
                value={lang}
                onChange={(e) => setLang(e.target.value)}
                aria-label="Language"
              >
                <option value="en">English</option>
                <option value="hi">हिन्दी</option>
              </select>
              <button
                onClick={() => setSpeaking((s) => !s)}
                className={`mic ${speaking ? "on" : "off"}`}
              >
                {speaking ? "🔊" : "🔇"}
              </button>
            </div>
          </div>
          <div className="saathi-messages">
            {messages.map((m, i) => (
              <div key={i} className={`msg ${m.from}`}>
                {" "}
                <div className="msg-text">{m.text}</div>{" "}
              </div>
            ))}
          </div>
          <div className="saathi-input">
            <input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder={
                lang === "hi" ? "यहाँ लिखें..." : "Type your question..."
              }
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  handleQuery(input);
                  setInput("");
                }
              }}
            />
            <button
              onClick={() => {
                handleQuery(input);
                setInput("");
              }}
            >
              {lang === "hi" ? "पूछें" : "Ask"}
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Chatbot;
