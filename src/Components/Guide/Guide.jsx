import React, { useEffect, useState } from "react";

const Guide = () => {
  const videos = [
    "https://youtu.be/HR0cHR70NBY",
    "https://youtu.be/oDqmwCPVGg8",
  ];
  const [videoMeta, setVideoMeta] = useState({});

  useEffect(() => {
    let mounted = true;
    const fetchMeta = async (url) => {
      try {
        const oembed = `https://www.youtube.com/oembed?url=${encodeURIComponent(url)}&format=json`;
        const res = await fetch(oembed);
        if (!res.ok) throw new Error('oembed failed');
        const j = await res.json();
        return { title: j.title, thumbnail: j.thumbnail_url };
      } catch (err) {
        // fallback: derive thumbnail from id
        try {
          const m = url.match(/(?:youtu\.be\/|v=)([A-Za-z0-9_-]{11})/);
          const id = m ? m[1] : null;
          const thumb = id ? `https://img.youtube.com/vi/${id}/hqdefault.jpg` : null;
          return { title: url, thumbnail: thumb };
        } catch (e) {
          return { title: url, thumbnail: null };
        }
      }
    };

    (async () => {
      const out = {};
      for (const v of videos) {
        const meta = await fetchMeta(v);
        out[v] = meta;
        if (!mounted) break;
      }
      if (mounted) setVideoMeta(out);
    })();

    return () => { mounted = false; };
  }, []);

  return (
    <>
      <div className="w-full h-full rounded-lg bg-blue-50 flex items-center flex-col p-6 shadow-lg">
        <div className="max-w-7xl mx-auto md:px-4 py-8">
          <h1 className="md:text-4xl font-extrabold text-center mb-8 text-blue-800">
            Reference Guide of Indian Bibliographic Standard
          </h1>

          <div className="space-y-8">
            {[
              {
                title: "1. Book",
                referenceFormat: `SURNAME, First Name., [Year]. Title of the item [sefont-semibold Designation]. Subsidiary Titles. Edition. Translated from Title by TRANSLATOR. Revised by AUTHOR. Place: Publisher, Date of Publication, [Date of update/revision]. [viewed Date of citation]. Series title and number. Standard Identifier. [Available from: Availability and access]. At:[Location].`,
                inTextCitation: [
                  { type: "Parenthetical", format: "(Name of Creator LAST NAME YEAR)" },
                  { type: "Narrative", format: "Name of Creator LAST NAME (YEAR)" },
                ],
              },
              {
                title: "2. e-Book",
                referenceFormat: `SURNAME, First Name., [Year]. Title of the item [sefont-semibold Designation]. Subsidiary Titles. Edition. Translated from Title by TRANSLATOR. Revised by AUTHOR. Place: Publisher, Date of Publication, [Date of update/revision]. [viewed Date of citation]. Series title and number. Standard Identifier. [Available from: Availability and access].`,
                inTextCitation: [
                  { type: "Parenthetical", format: "(Name of Creator LAST NAME YEAR)" },
                  { type: "Narrative", format: "Name of Creator LAST NAME (YEAR)" },
                ],
              },
              {
                title: "3. Contribution within a Book",
                referenceFormat: `SURNAME, First Name., [Year]. Title of the contribution. In: NAME OF CREATOR(S) OF THE HOST ITEM, ed. Title of the host item. [Medium Designation]. Edition. Place: Publisher, Date of Publication, Numeration (of volume). Range of page number(s) of the contribution. [Date of update/revision]. [viewed Date of citation]. Series title and number. Standard Identifier. [Available from: Availability and access]. At:[Location].`,
                inTextCitation: [
                  { type: "Parenthetical", format: "(Name of Creator LAST NAME YEAR, Range of page number(s) of the contribution)" },
                  { type: "Narrative", format: "Name of Creator LAST NAME (YEAR, Range of page number(s) of the contribution)" },
                ],
              },
              {
                title: "4. Journal",
                referenceFormat: `SURNAME, First Name, [Year]. Title of the contribution. Additional General Information. In: Title of the host serial. [Medium Designation]. Subsidiary Titles. Edition. Place: Publisher, Date of Publication. Numeration (of volume), Range of page number(s) of the contribution, [viewed Date of citation]. Standard Identifier. [Available from: Availability and access]. At: [Location].`,
                inTextCitation: [
                  { type: "Parenthetical", format: "(Title of the Journal YEAR)" },
                  { type: "Narrative", format: "Title of the Journal (YEAR)" },
                ],
              },
              {
                title: "5. Contribution within Journal",
                referenceFormat: `SURNAME, First Name, [Year]. Title of the contribution. Additional General Information. In: Title of the host serial. [Medium Designation]. Subsidiary Titles. Edition. Place: Publisher, Date of Publication. Numeration (of volume), Range of page number(s) of the contribution, [viewed Date of citation]. Standard Identifier. [Available from: Availability and access]. At: [Location].`,
                inTextCitation: [
                  { type: "Parenthetical", format: "(Name of Creator LAST NAME YEAR, Range of page number(s) of the contribution)" },
                  { type: "Narrative", format: "Name of Creator LAST NAME (YEAR, Range of page number(s) of the contribution)" },
                ],
              },
              {
                title: "6. e-Journal",
                referenceFormat: `SURNAME, First Name, [Year]. Title of the contribution. Additional General Information. In: Title of the host serial. [Medium Designation]. Subsidiary Titles. Edition. Place: Publisher, Date of Publication. Numeration (of volume), Range of page number(s) of the contribution, [viewed Date of citation]. Standard Identifier. [Available from: Availability and access].`,
                inTextCitation: [
                  { type: "Parenthetical", format: "(Name of Creator LAST NAME YEAR)" },
                  { type: "Narrative", format: "Name of Creator LAST NAME (YEAR)" },
                ],
              },
              {
                title: "7. e-Research Article in Journal",
                referenceFormat: `SURNAME, First Name, [Year]. Title of the contribution. Additional General Information. In: Title of the host serial. [Medium Designation]. Subsidiary Titles. Edition. Place: Publisher, Date of Publication. Numeration (of volume), Range of page number(s) of the contribution, [viewed Date of citation]. Standard Identifier. [Available from: Availability and access].`,
                inTextCitation: [
                  { type: "Parenthetical", format: "(Name of Creator LAST NAME YEAR, Range of page number(s) of the contribution)" },
                  { type: "Narrative", format: "Name of Creator LAST NAME (YEAR, Range of page number(s) of the contribution)" },
                ],
              },
              {
                title: "8. Websites",
                referenceFormat: `SURNAME, First Name. Standard Identifiers of creators' public identities. Page title. In: Web site title. Edition. Format and resource type. System requirements. Subsidiary Creator. Place: Publisher, Date of Publication Numeration (of volume), [Date of update/revision]. [viewed Date of citation]. Standard Identifier. [Available from: Availability and access]. Relationships.`,
                inTextCitation: [
                  { type: "Parenthetical", format: "(Name of Creator LAST NAME OR Page Title OR Website Title YEAR)" },
                  { type: "Narrative", format: "Name of Creator LAST NAME OR Page Title OR Website Title (YEAR)" },
                ],
              },
              {
                title: "9. Electronic Message",
                referenceFormat: `SURNAME, First Name, [Year]. Title of the message. Title of the host message system. [Medium Designation]. Date message was sent; Time message was sent [viewed Date of citation]. [Available from: Availability and access]. Other Information.`,
                inTextCitation: [
                  { type: "Parenthetical", format: "(Name of Creator LAST NAME YEAR)" },
                  { type: "Narrative", format: "Name of Creator LAST NAME (YEAR)" },
                ],
              },
              {
                title: "10. Patents",
                referenceFormat: `SURNAME, First Name. Patent application country. Standard Identifiers of creators' public identities. Title of the information resource. Series title. Subsidiary creator. Date of application. Date of issuance. Patent number. [Available from: Persistent Identifiers]. Item attributes. [viewed Date of citation]. [Location]. Relationships.`,
                inTextCitation: [
                  { type: "Parenthetical", format: "(Name of Creator LAST NAME)" },
                  { type: "Narrative", format: "Name of Creator LAST NAME" },
                ],
              },
            ].map((item, index) => (
              <div key={index} className="bg-white rounded-lg shadow-md p-6 transition-transform transform hover:scale-105">
                <h2 className="text-2xl font-bold mb-2">{item.title}</h2>
                <div className="mt-4">
                  <h3 className="text-lg font-semibold">Reference Format</h3>
                  <p className="mt-2 pl-4 border-l-4 border-gray-300 text-gray-700">
                    {item.referenceFormat}
                  </p>
                </div>
                <div className="mt-4">
                  <h3 className="text-lg font-semibold">In-text Citation Format</h3>
                  {item.inTextCitation.map((citation, idx) => (
                    <p key={idx} className="mt-1">
                      <span className="font-semibold">{citation.type}:</span> {citation.format}
                    </p>
                  ))}
                </div>
              </div>
            ))}
          </div>

          <div className="mt-12">
            <h2 className="text-3xl font-bold text-blue-800 mb-4">Video Tutorials</h2>
            <div className="grid md:grid-cols-2 gap-6">
              {videos.map((v) => {
                const meta = videoMeta[v] || { title: v, thumbnail: null };
                return (
                  <div key={v} className="bg-white rounded-lg shadow-md p-4 flex items-center space-x-4">
                    {meta.thumbnail ? (
                      <img src={meta.thumbnail} alt={meta.title} className="w-40 h-24 object-cover rounded" />
                    ) : (
                      <div className="w-40 h-24 bg-gray-200 rounded flex items-center justify-center">No preview</div>
                    )}
                    <div className="flex-1">
                      <h3 className="font-semibold text-lg">{meta.title}</h3>
                      <p className="text-sm text-gray-600 mt-2">Watch a short tutorial that explains how to use the citation tools and workflow.</p>
                      <div className="mt-3">
                        <a href={v} target="_blank" rel="noopener noreferrer" className="inline-block bg-blue-600 text-white px-3 py-1 rounded">Watch on YouTube</a>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
        <div className="mt-12 py-8 border-t border-gray-300">
          <h2 className="text-center text-lg font-medium text-gray-700">
            For any query, contact - <span className="font-semibold">Naresh Kumar</span> - 
            <a href="mailto:nareshiiim.kumar@gmail.com" className="text-blue-600 underline"> nareshiiim.kumar@gmail.com</a>.
          </h2>
        </div>
        {/* video link removed per request */}
      </div>
    </>
  );
};

export default Guide;