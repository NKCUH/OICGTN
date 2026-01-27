import React from "react";
import "./Container.css";

const CitContainer = (props) => {

  return (
    <>
      <div className="cit-container">
      <center>
        <span className="page-title">
          {props.title}
        </span>
      </center>
      <div className="cit-form container">
         {props.children}
      </div>
      </div>
    </>
  );
};

export default CitContainer;
