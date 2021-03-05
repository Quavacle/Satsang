import React from 'react';
import BookCard from './BookCard/BookCard';

const Results = (results) => {
  if (results.results) {
    return results.results.map((book) => <BookCard book={book} search />);
  } else {
    return null;
  }
};
export default Results;
