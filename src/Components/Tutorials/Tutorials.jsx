import React, { useEffect, useState } from "react";

const videoList = [
  "https://youtu.be/HR0cHR70NBY",
  "https://youtu.be/oDqmwCPVGg8",
];

const getYouTubeId = (url) => {
  const m = url.match(/(?:youtu\.be\/|v=)([A-Za-z0-9_-]{11})/);
  return m ? m[1] : null;
};

const Tutorials = () => {
  const [videoMeta, setVideoMeta] = useState({});

  useEffect(() => {
    let mounted = true;
    const fetchMeta = async (url) => {
      try {
        const oembed = `https://www.youtube.com/oembed?url=${encodeURIComponent(url)}&format=json`;
        const res = await fetch(oembed);
        if (!res.ok) throw new Error("oembed failed");
        const j = await res.json();
        return { title: j.title, thumbnail: j.thumbnail_url };
      } catch {
        const id = getYouTubeId(url);
        return {
          title: url,
          thumbnail: id
            ? `https://img.youtube.com/vi/${id}/hqdefault.jpg`
            : null,
        };
      }
    };

    (async () => {
      const out = {};
      for (const v of videoList) {
        const meta = await fetchMeta(v);
        out[v] = meta;
        if (!mounted) break;
      }
      if (mounted) setVideoMeta(out);
    })();

    return () => {
      mounted = false;
    };
  }, []);

  return (
    <div className="w-full min-h-full rounded-lg bg-blue-50 flex flex-col items-center p-6 shadow-lg">
      <div className="max-w-5xl w-full mx-auto py-8">
        <h1 className="text-4xl font-extrabold text-center mb-10 text-blue-800">
          Tutorials
        </h1>

        {/* ── Video Tutorials ── */}
        <section className="mb-14">
          <h2 className="text-2xl font-bold text-blue-700 mb-6">
            Video Tutorials
          </h2>
          <div className="grid md:grid-cols-2 gap-6">
            {videoList.map((v) => {
              const meta = videoMeta[v] || { title: v, thumbnail: null };
              const id = getYouTubeId(v);
              return (
                <div
                  key={v}
                  className="bg-white rounded-xl shadow-md overflow-hidden flex flex-col"
                >
                  {/* Embeddable player */}
                  {id ? (
                    <div
                      className="relative w-full"
                      style={{ paddingTop: "56.25%" }}
                    >
                      <iframe
                        className="absolute inset-0 w-full h-full"
                        src={`https://www.youtube.com/embed/${id}`}
                        title={meta.title}
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                        allowFullScreen
                      />
                    </div>
                  ) : meta.thumbnail ? (
                    <img
                      src={meta.thumbnail}
                      alt={meta.title}
                      className="w-full h-48 object-cover"
                    />
                  ) : (
                    <div className="w-full h-48 bg-gray-200 flex items-center justify-center text-gray-500">
                      No preview available
                    </div>
                  )}
                  <div className="p-4 flex-1 flex flex-col justify-between">
                    <h3 className="font-semibold text-gray-800 text-base">
                      {meta.title !== v ? meta.title : "Tutorial Video"}
                    </h3>
                    <a
                      href={v}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="mt-3 inline-block bg-blue-600 hover:bg-blue-700 text-white text-sm px-4 py-1.5 rounded transition-colors"
                    >
                      Watch on YouTube ↗
                    </a>
                  </div>
                </div>
              );
            })}
          </div>
        </section>

        {/* ── Guide PDF Section ── */}
        <section>
          <h2 className="text-2xl font-bold text-blue-700 mb-4">
            User Guide (PDF)
          </h2>
          <p className="text-gray-600 mb-4">
            Read the guide below to learn how to use this citation tool.
          </p>
          <div className="rounded-xl overflow-hidden shadow-lg border border-gray-200">
            <iframe
              src="/DEMO.pdf"
              title="User Guide"
              className="w-full"
              style={{ height: "80vh" }}
            />
          </div>
          <div className="mt-3 text-right">
            <a
              href="/DEMO.pdf"
              download
              className="inline-block text-sm text-blue-600 hover:text-blue-800 underline"
            >
              Download PDF ↓
            </a>
          </div>
        </section>
      </div>
    </div>
  );
};

export default Tutorials;
