import React, { useContext, useState } from 'react';
import { createInstance } from '../helpers/_crudHelper';
import { AlertContext } from '../providers/alertProvider';
import RequestModal from './Modals/RequestModal';
import { ButtonStyles } from './styles/ButtonStyles';
import BookBriefStyles from './styles/BookBriefStyles';

const BookBrief = (props) => {
  const [openRequest, setOpenRequest] = useState(false);
  const { addMessage } = useContext(AlertContext);
  const { id, title, authors, imageLinks } = props.book;

  const mapAuth = () => {
    return authors.map((authieboy, index) => <li key={index}>{authieboy}</li>);
  };

  const handleAdd = () => {
    createInstance(props.book);
    addMessage('Book added!', props.book.title);
  };

  const handleRequest = () => {
    setOpenRequest(!openRequest);
  };

  return (
    <>
      {openRequest ? (
        <RequestModal
          setOpenRequest={setOpenRequest}
          allBooks={props.instances}
        />
      ) : null}
      <BookBriefStyles key={id}>
        <div className='header'>
          <h1>{title}</h1>
          {imageLinks && <img src={imageLinks?.thumbnail} alt={title} />}
          <ul>{authors ? mapAuth() : null}</ul>
        </div>
        <div className='inputs'>
          {props.search && (
            <ButtonStyles onClick={handleAdd}>Add to Collection!</ButtonStyles>
          )}
          {props.request && (
            <ButtonStyles onClick={handleRequest}>
              Request this book
            </ButtonStyles>
          )}
        </div>
      </BookBriefStyles>
    </>
  );
};

export default BookBrief;
