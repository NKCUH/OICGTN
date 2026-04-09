import React from 'react';
import SerialContributionForm from '../Components/SerialContribution/SerialContribution';
import CitContainer from '../Components/Container';

const SerialContributions = ()=> {
  return (
    <CitContainer title="Journal" titleStyle={{ textAlign: "center" }}>
       <SerialContributionForm/>        
    </CitContainer>
  );
}

export default SerialContributions;