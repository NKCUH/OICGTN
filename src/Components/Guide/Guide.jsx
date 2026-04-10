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
                referenceFormat: `SURNAME, First Name., [Year]. Title [sefont-semibold Designation]. Edition. Translated from Title by TRANSLATOR. Revised by AUTHOR. Place: Publisher.`,
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
                example: `ALAGH, Yoginder K., SRIDHARAN, Eswaran, KALAM, A P J Abdul, RAJAN, Y S, [2023]. India 2020 [Online]. 1st. United Nations, 2023-04-21, [viewed 23-01-2026]. ISBN 9789351184560. Available from: https://www.flipkart.com/india-2020/p/itmeb2c4ef9cc47b.`,
                narrativeExample: `Yoginder K. AlaghEswaran SridharanA P J Abdul KalamY S Rajan (2023)`,
                parentheticalExample: `(Yoginder K. Alagh Eswaran Sridharan A P J Abdul Kalam Y S Rajan 2023)`,
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
                example: `KUMAR, Naresh, CASAROSA, Vittore, [2017]. Expressing Needs of Digital Audio-Visual Applications in Different Communities of Practice for Long-Term Preservation. In: Naresh Kumar and Tariq Ashraf, ed. Interdisciplinary Digital Preservation Tools and Technologies. [Print]. New York: IGI Global, 2017, ISBN 10.4018/978-1-5225-1653-8.ch004.`,
                narrativeExample: `Naresh KumarVittore Casarosa (2017)`,
                parentheticalExample: `(Naresh Kumar(Vittore Casarosa 2017)`,
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
                example: `Annals of Library and Information Studies. [Print]. [2005]. CSIR-National Institute of Science Communication and Policy Research (NIScPR), 54, 2. [viewed 2026-01-28]. ISSN UOM:39015081496690. Available from: http://books.google.co.in/books?id=SNjgAAAAMAAJ&dq=Annals+of+Library+and+Information+Studies&hl=&source=gbs_api`,
                narrativeExample: `Annals of Library and Information Studies (2005)`,
                parentheticalExample: `(Annals of Library and Information Studies 2005)`,
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
                example: `DUAN, Xiaoyan, CHEN, Shiyi, TIAN, Feiyan, CHU, Ganghui, DUAN, xiaoyan, CHU, ganghui, TIAN, Feiyang, [2025]. Bimetallic ScAg-MOFs as peroxide-mimicking enzymes combined with NIR spectroscopy for rapid prediction of uric acid. In: Crossref. Informa UK Limited, 2025-11-02. 15, 6. pp. 915-926, [viewed 23-01-2026]. Available from: https://doi.org/10.1080/22297928.2025.2567998.`,
                narrativeExample: `Xiaoyan DuanShiyi ChenFeiyan TianGanghui ChuXiaoyan DuanGanghui ChuFeiyang Tian (2025, 915-926)`,
                parentheticalExample: `(Xiaoyan Duan Shiyi Chen Feiyan Tian Ganghui Chu Xiaoyan Duan Ganghui Chu Feiyang Tian 2025, 915-926)`,
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
                example: `Annals of Library and Information Studies. [Online]. [2005]. CSIR-National Institute of Science Communication and Policy Research (NIScPR), 54, 2. [viewed 2026-01-28]. ISSN UOM:39015081496690. Available from: http://books.google.co.in/books?id=SNjgAAAAMAAJ&dq=Annals+of+Library+and+Information+Studies&hl=&source=gbs_api.`,
                narrativeExample: `Annals of Library and Information Studies (2005)`,
                parentheticalExample: `(Annals of Library and Information Studies 2005)`,
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
                example: `DUAN, Xiaoyan, CHEN, Shiyi, TIAN, Feiyan, CHU, Ganghui, DUAN, xiaoyan, CHU, ganghui, TIAN, Feiyang, [2025]. Bimetallic ScAg-MOFs as peroxide-mimicking enzymes combined with NIR spectroscopy for rapid prediction of uric acid. In: Crossref. Informa UK Limited, 2025-11-02. 15, 6. pp. 915-926, [viewed 23-01-2026]. Available from: https://doi.org/10.1080/22297928.2025.2567998.`,
                narrativeExample: `Xiaoyan DuanShiyi ChenFeiyan TianGanghui ChuXiaoyan DuanGanghui ChuFeiyang Tian (2025, 915-926)`,
                parentheticalExample: `(Xiaoyan Duan Shiyi Chen Feiyan Tian Ganghui Chu Xiaoyan Duan Ganghui Chu Feiyang Tian 2025, 915-926)`,
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
                example: `Doctoral theses, University of Delhi. In: University of Delhi. DU. 2010 [viewed 2026-03-11]. Available from: www.du.ac.in.`,
                narrativeExample: `Doctoral theses, University of Delhi (2010)`,
                parentheticalExample: `(Doctoral theses, University of Delhi 2010)`,
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
                example: `KUMAR, Vinay, [2026]. Refread Remote Access Software is accessible now. WhatsApp. [Online]. 20.02.2026; 10:00 viewed [10-03-2026].`,
                narrativeExample: `Vinay Kumar (2026)`,
                parentheticalExample: `(Vinay Kumar 2026)`,
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
                example: `MISRA, HO, BHARAGAVA, SK, India. Testing Water For Its Purity. 25/05/2001 . 184946. Available from: [https://iitr.res.in/En/patent_grand.aspx]. [viewed 10-03-2026].`,
                narrativeExample: `HO MisraSK Bharagava`,
                parentheticalExample: `(HO Misra & SK Bharagava)`,
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
