import React from 'react';
import WebsitesForm from '../Components/Websites/websites';
import CitContainer from '../Components/Container';

const Websites = ()=> {
  return (
    <CitContainer title="Websites" titleStyle={{ textAlign: "center" }}>
       <WebsitesForm/>        
    </CitContainer>
  );
}

export default Websites;