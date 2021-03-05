import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import AcceptReturn from '../AcceptReturn';
import RemoveBook from '../RemoveBook';
import ReturnBook from '../ReturnBook';
import { ListStyles } from '../styles/ListStyles';

const DashList = (props) => {
  return props.books.map((book, index) => {
    return (
      <ListStyles key={book._id}>
        <Link to={'/detail/' + book._id}>{book.book.title}</Link>
        {props.type === 'borrowed' && <ReturnBook id={book._id} />}
        {props.type === 'owned' && (
          <RemoveBook
            id={book._id}
            index={index}
            removeEntry={props.removeEntry}
            owned
          />
        )}
        {props.type === 'pendingReturn' && <AcceptReturn id={book._id} />}
      </ListStyles>
    );
  });
};

export default DashList;
