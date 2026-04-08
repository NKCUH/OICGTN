import React from "react";
import "./Container.css";

const CitContainer = (props) => {

  return (
    <>
      <div className="cit-container">
        <span className="page-title">
          {props.title}
        </span>
      <div className="cit-form container">
         {props.children}
      </div>
      </div>
    </>
  );
};

export default CitContainer;
