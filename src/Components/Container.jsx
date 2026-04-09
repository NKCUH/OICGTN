import React from "react";
import "./Container.css";

const CitContainer = (props) => {
  const { title, titleStyle, children } = props;

  return (
    <>
      <div className="cit-container">
        <span className="page-title" style={titleStyle}>
          {title}
        </span>
      <div className="cit-form container">
         {children}
      </div>
      </div>
    </>
  );
};

export default CitContainer;
