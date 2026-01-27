import React from "react";

const Faq = () => {
  return (
    <div className="w-full h-full rounded-lg bg-blue-50 flex items-center flex-col p-6 shadow-lg">
      <h1 className="mt-4 text-4xl font-extrabold text-center mb-8 text-blue-800">
        FAQs
      </h1>
      <div className="max-w-7xl mx-auto md:px-4 py-8">
        <div className="space-y-8">
          {[
            {
              question: "What is Online Citation Tool?",
              answer: "Online Bibliographic Citation Tool is one which generates the citation of a particular source in a specific reference style."
            },
            {
              question: "Who should use it?",
              answer: "The Online Citation Tool may be used by the academic community who desire to generate references in a particular reference style."
            },
            {
              question: "Citations of which reference style does it generate?",
              answer: "It generates citations in the Indian Bibliographic Reference Style."
            },
            {
              question: "It generates citations for which resources?",
              answer: "It generates citations for sources like print books, book chapters, e-books, print journals, research papers, e-journals, websites, patents, and messages, etc."
            },
            {
              question: "How does this Citation Tool work?",
              answer: (
                <>
                  Follow these steps to generate the citation:
                  <ul className="mt-2 pl-6 list-disc">
                    <li>Step 1: Choose the source you want to cite by clicking on it.</li>
                    <li>Step 2: A form will open up; fill in the details and submit the form to generate a citation in the Indian Bibliographic Reference Style.</li>
                    <li>Step 3: Copy the result and paste it into your Word file for use.</li>
                  </ul>
                </>
              )
            },
            {
              question: "What features does it offer?",
              answer: "It offers the ability to copy and paste the citation directly into MS Word."
            },
            {
              question: "How long does it save my references?",
              answer: "It generates the citation once you submit the form. However, the citation will disappear when you switch to another source. Make sure to copy and paste it into a Word file immediately."
            },
          ].map((item, index) => (
            <div key={index} className="bg-white rounded-lg shadow-md p-6 transition-transform transform hover:scale-105">
              <span className="font-semibold text-lg">{item.question}</span>
              <p className="mt-2">
                <span className="font-semibold">Ans:</span> {item.answer}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Faq;