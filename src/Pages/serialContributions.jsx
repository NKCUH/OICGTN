import React from 'react';
import SerialContributionForm from '../Components/SerialContribution/SerialContribution';
import CitContainer from '../Components/Container';

const SerialContributions = ()=> {
  return (
    <CitContainer title="Journal Contributions">
       <SerialContributionForm/>        
    </CitContainer>
  );
}

export default SerialContributions;