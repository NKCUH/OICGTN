import React from "react";

const Guide = () => {
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
                  {
                    type: "Parenthetical",
                    format: "(Name of Creator LAST NAME YEAR)",
                  },
                  {
                    type: "Narrative",
                    format: "Name of Creator LAST NAME (YEAR)",
                  },
                ],
              },
              {
                title: "2. e-Book",
                referenceFormat: `SURNAME, First Name., [Year]. Title of the item [sefont-semibold Designation]. Subsidiary Titles. Edition. Translated from Title by TRANSLATOR. Revised by AUTHOR. Place: Publisher, Date of Publication, [Date of update/revision]. [viewed Date of citation]. Series title and number. Standard Identifier. [Available from: Availability and access].`,
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
              },
              {
                title: "3. Contribution within a Book",
                referenceFormat: `SURNAME, First Name., [Year]. Title of the contribution. In: NAME OF CREATOR(S) OF THE HOST ITEM, ed. Title of the host item. [Medium Designation]. Edition. Place: Publisher, Date of Publication, Numeration (of volume). Range of page number(s) of the contribution. [Date of update/revision]. [viewed Date of citation]. Series title and number. Standard Identifier. [Available from: Availability and access]. At:[Location].`,
                inTextCitation: [
                  {
                    type: "Parenthetical",
                    format:
                      "(Name of Creator LAST NAME YEAR, Range of page number(s) of the contribution)",
                  },
                  {
                    type: "Narrative",
                    format:
                      "Name of Creator LAST NAME (YEAR, Range of page number(s) of the contribution)",
                  },
                ],
              },
              {
                title: "4. Journal",
                referenceFormat: `SURNAME, First Name, [Year]. Title of the contribution. Additional General Information. In: Title of the host serial. [Medium Designation]. Subsidiary Titles. Edition. Place: Publisher, Date of Publication. Numeration (of volume), Range of page number(s) of the contribution, [viewed Date of citation]. Standard Identifier. [Available from: Availability and access]. At: [Location].`,
                inTextCitation: [
                  {
                    type: "Parenthetical",
                    format: "(Title of the Journal YEAR)",
                  },
                  { type: "Narrative", format: "Title of the Journal (YEAR)" },
                ],
              },
              {
                title: "5. Contribution within Journal",
                referenceFormat: `SURNAME, First Name, [Year]. Title of the contribution. Additional General Information. In: Title of the host serial. [Medium Designation]. Subsidiary Titles. Edition. Place: Publisher, Date of Publication. Numeration (of volume), Range of page number(s) of the contribution, [viewed Date of citation]. Standard Identifier. [Available from: Availability and access]. At: [Location].`,
                inTextCitation: [
                  {
                    type: "Parenthetical",
                    format:
                      "(Name of Creator LAST NAME YEAR, Range of page number(s) of the contribution)",
                  },
                  {
                    type: "Narrative",
                    format:
                      "Name of Creator LAST NAME (YEAR, Range of page number(s) of the contribution)",
                  },
                ],
              },
              {
                title: "6. e-Journal",
                referenceFormat: `SURNAME, First Name, [Year]. Title of the contribution. Additional General Information. In: Title of the host serial. [Medium Designation]. Subsidiary Titles. Edition. Place: Publisher, Date of Publication. Numeration (of volume), Range of page number(s) of the contribution, [viewed Date of citation]. Standard Identifier. [Available from: Availability and access].`,
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
              },
              {
                title: "7. e-Research Article in Journal",
                referenceFormat: `SURNAME, First Name, [Year]. Title of the contribution. Additional General Information. In: Title of the host serial. [Medium Designation]. Subsidiary Titles. Edition. Place: Publisher, Date of Publication. Numeration (of volume), Range of page number(s) of the contribution, [viewed Date of citation]. Standard Identifier. [Available from: Availability and access].`,
                inTextCitation: [
                  {
                    type: "Parenthetical",
                    format:
                      "(Name of Creator LAST NAME YEAR, Range of page number(s) of the contribution)",
                  },
                  {
                    type: "Narrative",
                    format:
                      "Name of Creator LAST NAME (YEAR, Range of page number(s) of the contribution)",
                  },
                ],
              },
              {
                title: "8. Websites",
                referenceFormat: `SURNAME, First Name. Standard Identifiers of creators' public identities. Page title. In: Web site title. Edition. Format and resource type. System requirements. Subsidiary Creator. Place: Publisher, Date of Publication Numeration (of volume), [Date of update/revision]. [viewed Date of citation]. Standard Identifier. [Available from: Availability and access]. Relationships.`,
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
              },
              {
                title: "9. Electronic Message",
                referenceFormat: `SURNAME, First Name, [Year]. Title of the message. Title of the host message system. [Medium Designation]. Date message was sent; Time message was sent [viewed Date of citation]. [Available from: Availability and access]. Other Information.`,
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
              },
              {
                title: "10. Patents",
                referenceFormat: `SURNAME, First Name. Patent application country. Standard Identifiers of creators' public identities. Title of the information resource. Series title. Subsidiary creator. Date of application. Date of issuance. Patent number. [Available from: Persistent Identifiers]. Item attributes. [viewed Date of citation]. [Location]. Relationships.`,
                inTextCitation: [
                  {
                    type: "Parenthetical",
                    format: "(Name of Creator LAST NAME)",
                  },
                  { type: "Narrative", format: "Name of Creator LAST NAME" },
                ],
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
              </div>
            ))}
          </div>
        </div>
        <div className="mt-12 py-8 border-t border-gray-300">
          <h2 className="text-center text-lg font-medium text-gray-700">
            For any query, contact —{" "}
            <span className="font-semibold">Naresh Kumar</span>{" "}
            <a
              href="mailto:nareshkumar@cuh.ac.in"
              className="text-blue-600 underline"
            >
              nareshkumar@cuh.ac.in
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
