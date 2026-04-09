import React from 'react';
import ElectronicForm from '../Components/ElectronicMessage/ElectronicMessage';
import CitContainer from '../Components/Container';

const ElectronicMessages = ()=> {
  return (
    <CitContainer title="Electronic Messages" titleStyle={{ textAlign: "center" }}>
       <ElectronicForm/>        
    </CitContainer>
  );
}

export default ElectronicMessages;