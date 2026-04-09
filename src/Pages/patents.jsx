import React from 'react';
import PatentsForm from '../Components/Patents/Patents';
import CitContainer from '../Components/Container';

const Patents = ()=> {
  return (
    <CitContainer title="Patents" titleStyle={{ textAlign: "center" }}>
       <PatentsForm/>        
    </CitContainer>
  );
}

export default Patents;