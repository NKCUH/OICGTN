import React from 'react';
import SerialForm from '../Components/Serial/SerialForm';
import CitContainer from '../Components/Container';

const ESerial = ()=> {
  return (
    <CitContainer title="E-Journal">
       <SerialForm type={"E"}/>        
    </CitContainer>
  );
}

export default ESerial;