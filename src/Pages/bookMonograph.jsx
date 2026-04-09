import React from 'react';
import BooksForm from '../Components/BookMonograph/BooksForm';
import CitContainer from '../Components/Container';

const BookMonograph = ()=> {
  return (
    <CitContainer title="Book" titleStyle={{ textAlign: "center" }}>
       <BooksForm/>        
    </CitContainer>
  );
}

export default BookMonograph;