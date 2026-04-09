import React from 'react';
import ContributionForm from '../Components/ContributionWithinBook/ContributionForm';
import CitContainer from '../Components/Container';

const ContributionWithinBook = () => {
  return (
    <CitContainer title="Book Chapter" titleStyle={{ textAlign: "center" }}>
      <ContributionForm />
    </CitContainer>
  );
}

export default ContributionWithinBook;