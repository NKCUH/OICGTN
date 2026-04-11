import React from "react";

const Guide = () => {
  return (
    <>
      <div className="w-full h-full rounded-lg bg-blue-50 flex items-center flex-col p-6 shadow-lg">
        <div className="max-w-7xl mx-auto md:px-4 py-8">
          <h1 className="md:text-4xl font-extrabold text-center mb-8 text-blue-800">
            Reference Guide of Indian Bibliographic Reference Style
          </h1>

          <div className="space-y-8">
            {[
              {
                title: "1. Book",
                referenceFormat: `SURNAME, First Name., [Year]. Title Edition. Place: Publisher.`,
                inTextCitation: [
                  {
                    type: "Parenthetical",
                    format: "(Name of Creator LAST NAME YEAR)",
                  },
                  {
                    type: "Narrative",
                    format: "Name of Creator LAST NAME (YEAR)",
                  },
                ],
                example: `KUMAR, N., [2017]. Interdisciplinary Digital Preservation Tools and Technologies. USA: IGI Global.`,
                narrativeExample: `KUMAR (2017)`,
                parentheticalExample: `(KUMAR 2017)`,
              },
              {
                title: "2. e-Book",
                referenceFormat: `SURNAME, First Name., [Year]. Title. Edition. Place: Publisher. Available from: URL.`,
                inTextCitation: [
                  {
                    type: "Parenthetical",
                    format: "(Name of Creator LAST NAME YEAR)",
                  },
                  {
                    type: "Narrative",
                    format: "Name of Creator LAST NAME (YEAR)",
                  },
                ],
                example: `SPEIRS, T., WILSON, B., LECKIE, [2021]. Higher Chemistry: Comprehensive textbook for the CfE (Leckie Student Book). London: Harper Collins UK, 1st. Available from: http://books.google.co.in/books?id=QbkjEAAAQBAJ&dq=Higher+Chemistry:+Comprehensive+textbook+for+the+CfE&hl=&source=gbs_api.`,
                narrativeExample: `SPEIRS, WILSON, LECKIE (2021)`,
                parentheticalExample: `(SPEIRS, WILSON, LECKIE 2021)`,
              },
              {
                title: "3.  Book Chapter",
                referenceFormat: `SURNAME, First Name., [Year]. Chapter Title. In: Editor, ed. Book Title. Place: Publisher, Vol. No./Series. Page Range. DOI. Available from: URL.`,
                inTextCitation: [
                  {
                    type: "Parenthetical",
                    format:
                      "(Name of Creator LAST NAME YEAR, Page Range)",
                  },
                  {
                    type: "Narrative",
                    format:
                      "Name of Creator LAST NAME (YEAR, Page Range)",
                  },
                ],
                example: `KUMAR, N., CASAROSA, V., [2017]. Expressing Needs of Digital Audio-Visual Applications in Different Communities of Practice for Long-Term Preservation. In: N. KUMAR, ed. <i>Interdisciplinary Digital Preservation Tools and Technologies</i>. New York: IGI Global, pp. 54-78. DOI 10.4018/978-1-5225-1653-8.ch004.`,
                narrativeExample: `KUMAR & CASAROSA (2017, p. 54-78)`,
                parentheticalExample: `(KUMAR & CASAROSA 2017, p. 54-78)`,
              },
              {
                title: "4. Journal",
                referenceFormat: `SURNAME, First Name, [Year]. Title. In: Journal Name. Vol. (Number or Issue), Page Range.`,
                inTextCitation: [
                  {
                    type: "Parenthetical",
                    format: "(Title of the Journal YEAR)",
                  },
                  { type: "Narrative", format: "Title of the Journal (YEAR)" },
                ],
                example: `MADHUSUDHAN, M., PANDEY, P., SINGH, B., [2025]. A systematic literature review on academic writing tools. In: World Digital Libraries: An International Journal (WDL). 18(2). pp. 8–13.`,
                narrativeExample: `MADHUSUDHAN, PANDEY, SINGH (2025)`,
                parentheticalExample: `(MADHUSUDHAN, PANDEY, SINGH 2025)`,
              },
              {
                title: "5. e-Journal",
                referenceFormat: `SURNAME, First Name, [Year]. Title. In: Journal Name. Vol. (Number or Issue), Page Range. DOI. Available from: URL.`,
                inTextCitation: [
                  {
                    type: "Parenthetical",
                    format: "(Name of Creator LAST NAME YEAR)",
                  },
                  {
                    type: "Narrative",
                    format: "Name of Creator LAST NAME (YEAR)",
                  },
                ],
                example: `KUMAR, N., MADHUSUDHAN, M., [2024]. Referencing revisited: A Comparative Look at MLA, APA and IS:IDBR. In: Annals of Library and Information Studies. CSIR-National Institute of Science Communication and Policy Research (NIScPR), 71. pp. 341–348. DOI 10.56042/alis.v71i3.10353. Available from: https://or.niscpr.res.in/index.php/ALIS/article/view/10353/3447.`,
                narrativeExample: `KUMAR & MADHUSUDHAN (2024, p. 341–348)`,
                parentheticalExample: `(KUMAR & MADHUSUDHAN 2024, p. 341–348)`,
              },
              {
                title: "6. Websites",
                referenceFormat: `SURNAME, First Name. Page title. In: Website title. Edition. Date of Publication (Year) [viewed Date of citation]. Available from: URL.`,
                inTextCitation: [
                  {
                    type: "Parenthetical",
                    format:
                      "(Name of Creator LAST NAME OR Page Title OR Website Title YEAR)",
                  },
                  {
                    type: "Narrative",
                    format:
                      "Name of Creator LAST NAME OR Page Title OR Website Title (YEAR)",
                  },
                ],
                example: `DLIS. In: Delhi University. Web site. [2026]. [viewed 2026-04-09]. Available from: www.dlis.du.ac.in.`,
                narrativeExample: `DLIS (2026)`,
                parentheticalExample: `(DLIS 2026)`,
              },
              {
                title: "7. Patents",
                referenceFormat: `SURNAME, First Name. Patent application country. Title. Date. Patent number.`,
                inTextCitation: [
                  {
                    type: "Parenthetical",
                    format: "(Name of Creator LAST NAME)",
                  },
                  { type: "Narrative", format: "Name of Creator LAST NAME" },
                ],
                example: `MISRA, HO, BHARAGAVA, SK, India. Testing water for its purity. 25/05/2001. Patent Number 184946.`,
                narrativeExample: `MISRA, BHARAGAVA (2026)`,
                parentheticalExample: `(MISRA, BHARAGAVA 2026)`,
              },
            ].map((item, index) => (
              <div
                key={index}
                className="bg-white rounded-lg shadow-md p-6 transition-transform transform hover:scale-105"
              >
                <h2 className="text-2xl font-bold mb-2">{item.title}</h2>
                <div className="mt-4">
                  <h3 className="text-lg font-semibold">Reference Format</h3>
                  <p className="mt-2 pl-4 border-l-4 border-gray-300 text-gray-700">
                    {item.referenceFormat}
                  </p>
                </div>
                <div className="mt-4">
                  <h3 className="text-lg font-semibold">
                    In-text Citation Format
                  </h3>
                  {item.inTextCitation.map((citation, idx) => (
                    <p key={idx} className="mt-1">
                      <span className="font-semibold">{citation.type}:</span>{" "}
                      {citation.format}
                    </p>
                  ))}
                </div>
                <div className="mt-4">
                  <h3 className="text-lg font-semibold">Example</h3>
                  <p className="mt-2 pl-4 border-l-4 border-gray-300 text-gray-700">
                    {item.example}
                  </p>
                </div>
                <div className="mt-4">
                  <p className="text-lg font-semibold">
                    Narrative: <span className="font-normal text-gray-700">{item.narrativeExample}</span>
                  </p>
                </div>
                <div className="mt-4">
                  <p className="text-lg font-semibold">
                    Parenthetical: <span className="font-normal text-gray-700">{item.parentheticalExample}</span>
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
        <div className="mt-12 py-8 border-t border-gray-300">
          <h2 className="text-center text-lg font-medium text-gray-700">
            For any query, contact —{" "}
            <span className="font-semibold">Mr. Naresh Kumar</span>{" "}
            <a
              href="mailto:nareshkumar@cuh.ac.in"
              className="text-blue-600 underline"
            >
              nkumar@libinfosci.du
            </a>{" "}
            or <span className="font-semibold">Dr. Margam Madhusudhan</span>{" "}
            <a
              href="mailto:mmadhusudhan@libinfosci.du.ac.in"
              className="text-blue-600 underline"
            >
              mmadhusudhan@libinfosci.du.ac.in
            </a>
            .
          </h2>
        </div>
      </div>
    </>
  );
};

export default Guide;
