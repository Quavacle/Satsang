import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Axios from 'axios';
import BookCard from '../Components/BookCard/BookCard';
const server = process.env.REACT_APP_LOCAL_DB;

const Detail = ({ match }) => {
  const [book, setBook] = useState(null);
  useEffect(() => {
    Axios.get(server + '/instances/' + match.params.id, {})
      .then((res) => {
        console.log(res);
        const data = res.data;
        console.log(data);
        setBook(res.data.book);
      })
      .catch((err) => console.log(err));
  }, [match.params.id]);
  console.log(book);
  return (
    <div className='detail-container'>
      {book && <BookCard book={book} imageLinks={book.cover} />}
      <Link to='/dashboard'>Back to Dash</Link>
    </div>
  );
};

export default Detail;
