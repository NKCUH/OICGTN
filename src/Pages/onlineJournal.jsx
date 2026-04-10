import React from "react";
import SerialContributionForm from "../Components/SerialContribution/SerialContribution";
import CitContainer from "../Components/Container";

const OnlineJournal = () => {
  return (
    <CitContainer title="Online Journal" titleStyle={{ textAlign: "center" }}>
      <SerialContributionForm type="online" />
    </CitContainer>
  );
};

export default OnlineJournal;
