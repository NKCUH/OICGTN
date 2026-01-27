import React from 'react';
import BooksForm from '../Components/BookMonograph/BooksForm';
import CitContainer from '../Components/Container';

const EBookMonograph = ()=> {
  return (
    <CitContainer title="E-Book and Monograph">
       <BooksForm type={"e"}/>        
    </CitContainer>
  );
}

export default EBookMonograph;