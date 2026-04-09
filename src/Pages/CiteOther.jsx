import React, { useState } from "react";
import WebsitesForm from "../Components/Websites/websites";
import ElectronicForm from "../Components/ElectronicMessage/ElectronicMessage";
import PatentsForm from "../Components/Patents/Patents";

const CiteOther = () => {
  const [selectedForm, setSelectedForm] = useState("websites");

  const renderForm = () => {
    switch (selectedForm) {
      case "websites":
        return <WebsitesForm />;
      case "electronic":
        return <ElectronicForm />;
      case "patents":
        return <PatentsForm />;
      default:
        return null;
    }
  };

  return (
    <div className="w-full min-h-screen bg-gray-50 p-4">
      <div className="mx-auto flex w-full max-w-5xl flex-wrap items-center justify-center gap-3 mb-8">
        <button
          onClick={() => setSelectedForm("websites")}
          className={`px-4 py-2 font-semibold rounded-lg transition duration-300 ${
            selectedForm === "websites"
              ? "bg-purple-600 text-white"
              : "bg-purple-500 text-white hover:bg-purple-600"
          }`}
        >
          Websites
        </button>
        <span className="text-gray-400 text-xl hidden sm:inline">|</span>
        <button
          onClick={() => setSelectedForm("electronic")}
          className={`px-4 py-2 font-semibold rounded-lg transition duration-300 ${
            selectedForm === "electronic"
              ? "bg-purple-600 text-white"
              : "bg-purple-500 text-white hover:bg-purple-600"
          }`}
        >
          Electronic Messages
        </button>
        <span className="text-gray-400 text-xl hidden sm:inline">|</span>
        <button
          onClick={() => setSelectedForm("patents")}
          className={`px-4 py-2 font-semibold rounded-lg transition duration-300 ${
            selectedForm === "patents"
              ? "bg-purple-600 text-white"
              : "bg-purple-500 text-white hover:bg-purple-600"
          }`}
        >
          Patents
        </button>
      </div>
      <div className="mx-auto w-full max-w-6xl" key={selectedForm}>
        {renderForm()}
      </div>
    </div>
  );
};

export default CiteOther;
