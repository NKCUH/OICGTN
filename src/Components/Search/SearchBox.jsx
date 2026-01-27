import React, { useState, useContext } from "react";
import "./search.css";
import { searchAll } from "../../api/searchApis";
import { MetadataContext } from "../../context/MetadataContext";
import { mapToFormMetadata } from "../../api/metadataMapper";
import { useNavigate } from "react-router-dom";

const routeForForm = (form) => {
  switch (form) {
    case "book":
      return "/book-and-monograph";
    case "ebook":
      return "/E-book-and-monograph";
    case "book-contribution":
      return "/contribution-within-book";
    case "journal":
    case "serial":
      return "/serial";
    case "serial-contribution":
      return "/serial-contributions";
    case "website":
      return "/websites";
    case "patent":
      return "/patents";
    case "electronic-message":
      return "/electronic-messages";
    default:
      return "/";
  }
};

const allFieldKeys = [
  "title",
  "authors",
  "doi",
  "isbn",
  "publisher",
  "year",
  "url",
  "titleOfTheItem",
  "edition",
  "seriesTitleAndNumber",
  "subsidiaryTitles",
  "standardIdentifier",
  "availiabilityAndAccess",
  "place",
  "dateOfPublication",
  "titleOfTheSerial",
  "numeration",
  "volume",
  "issue",
  "titleOfTheContribution",
  "titleOfTheHostItem",
  "rangeOfPageNumbersOfTheContribution",
  "pageTitle",
  "websiteTitle",
  "patentNumber",
  "dateOfApplication",
  "dateOfIssuance",
];

const SearchBox = () => {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const { applyMetadata, chosenForm, setChosenForm } = useContext(MetadataContext);
  const navigate = useNavigate();

  const doSearch = async () => {
    if (!query || query.trim() === "") return;
    setLoading(true);
    try {
      const q = query.trim();
      const res = await searchAll(q);
      // prefer results that match the query in title/doi/isbn/authors/url; also allow searching by URL fragment
      const ql = q.toLowerCase();
      const filtered = (res || []).filter((it) => {
        if (!it) return false;
        if (it.title && it.title.toLowerCase().includes(ql)) return true;
        if (it.doi && it.doi.toLowerCase().includes(ql)) return true;
        if (it.isbn && it.isbn.toLowerCase().includes(ql)) return true;
        if (it.url && it.url.toLowerCase().includes(ql)) return true;
        if (it.authors && it.authors.join(" ").toLowerCase().includes(ql)) return true;
        if (it.source && it.source.toLowerCase().includes(ql)) return true;
        return false;
      });

      // Detect if query looks like a URL or domain. Accept forms like:
      // - http://www.example.com
      // - https://example.com/path
      // - www.example.com
      // - example.com
      const domainLike = /^(https?:\/\/)?(www\.)?[\w.-]+\.[a-z]{2,}(\/.*)?$/i;
      const looksLikeUrl = domainLike.test(q);
      let synthetic = null;
      if (looksLikeUrl) {
        // normalize url: add http:// if protocol missing so it's clickable
        let normalized = q;
        if (!/^[a-z]+:\/\//i.test(normalized)) normalized = "http://" + normalized;
        // Use hostname as title when possible
        let title = q;
        try {
          const u = new URL(normalized);
          title = u.hostname.replace(/^www\./, "");
        } catch (err) {
          // keep q
        }
        synthetic = { source: "manual-url", title: title, url: normalized };
      }

      // Prepend the synthetic result when query looks like a URL so user can always choose it.
      if (synthetic) {
        const base = (filtered.length > 0 ? filtered : res) || [];
        // ensure we don't duplicate identical url entries (compare normalized hosts/urls)
        const deduped = [synthetic, ...base.filter((b) => {
          if (!b) return true;
          if (!b.url) return true;
          try {
            const bu = new URL(b.url.indexOf("://") === -1 ? "http://" + b.url : b.url);
            const su = new URL(synthetic.url);
            return bu.href !== su.href;
          } catch (err) {
            return b.url !== synthetic.url;
          }
        })];
        setResults(deduped.slice(0, 10));
      } else {
        setResults((filtered.length > 0 ? filtered : res).slice(0, 10));
      }
    } catch (err) {
      console.error("Search error", err);
      setResults([]);
    } finally {
      setLoading(false);
    }
  };

  const onSelect = (item) => {
    const mapped = mapToFormMetadata(item);
    // Directly apply all mapped metadata to the chosen form (no preview)
    applyMetadata(mapped, null, chosenForm || null);
    setResults([]);
  };

  const onFormChange = (e) => {
    setChosenForm(e.target.value || null);
  };

  // preview/field-selection removed: selection now immediately applies metadata to forms

  return (
    <div className="search-box">
      <select className="search-target" value={chosenForm || ""} onChange={onFormChange}>
        <option value="">Autofill: Any</option>
        <option value="book">Book</option>
        <option value="ebook">E-Book</option>
        <option value="book-contribution">Book Contribution</option>
        <option value="journal">Journal</option>
        <option value="serial">e-Journal</option>
        <option value="serial-contribution">Journal Contribution</option>
        <option value="website">Website</option>
        <option value="patent">Patent</option>
        <option value="electronic-message">Electronic Message</option>
      </select>

      <input
        aria-label="global-search"
        placeholder="Search by title, DOI, ISBN, URL..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        onKeyDown={(e) => {
          if (e.key === "Enter") doSearch();
        }}
      />
      <button className="search-btn" onClick={doSearch} disabled={loading}>
        {loading ? "..." : "Search"}
      </button>
      {results && results.length > 0 && (
        <ul className="search-results">
          {results.map((r, i) => (
            <li key={i} onClick={() => onSelect(r)}>
              <div className="r-title">{r.title}</div>
              <div className="r-sub">{r.authors?.join(", ") || r.publisher || r.source}</div>
              <div className="r-id">{r.doi || r.isbn || r.url}</div>
            </li>
          ))}
        </ul>
      )}

      {/* Preview removed: selecting a result now immediately applies metadata to the form */}
    </div>
  );
};

export default SearchBox;
