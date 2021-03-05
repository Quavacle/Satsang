import React, { useContext, useState } from 'react';
import { createInstance } from '../../helpers/_crudHelper';
import { AlertContext } from '../../providers/alertProvider';
import RequestModal from '../Modals/RequestModal';
import { ButtonStyles } from '../styles/ButtonStyles';
import BookCardStyles from '../styles/BookCardStyles';
import trimLength from '../../helpers/trimLength';
import RemoveBook from '../RemoveBook';

const BookCard = (props) => {
  const [openRequest, setOpenRequest] = useState(false);
  const { addMessage } = useContext(AlertContext);
  const {
    id,
    title,
    subtitle,
    authors,
    categories,
    description,
    imageLinks,
  } = props.book;
  const user = props.user || null;

  const mapAuth = () => {
    return authors.map((authieboy, index) => <li key={index}>{authieboy}</li>);
  };

  const mapCat = () => {
    return categories.map((cat, index) => <li key={index}>{cat}</li>);
  };

  const handleAdd = () => {
    createInstance(props.book);
    addMessage('Book added!', props.book.title);
  };

  const handleRequest = () => {
    setOpenRequest(!openRequest);
  };
  let trimmedDes = description ? trimLength(description) : null;
  return (
    <>
      {openRequest ? (
        <RequestModal
          setOpenRequest={setOpenRequest}
          allBooks={props.instances}
        />
      ) : null}
      <BookCardStyles key={id}>
        <div className='header'>
          <h1>{title}</h1>
          <img src={imageLinks?.thumbnail} alt={title} />
          <sub>{subtitle}</sub>
          <ul>{authors ? mapAuth() : null}</ul>
          <ul>{categories ? mapCat() : null}</ul>
        </div>
        <div className='body'>
          <span>{user?.username}</span>
          {props.brief ? null : <p> &nbsp;&nbsp;{trimmedDes}</p>}
        </div>
        <div className='inputs'>
          {props.search ? (
            <ButtonStyles onClick={handleAdd}>Add to Collection!</ButtonStyles>
          ) : null}
          {props.request ? (
            <ButtonStyles onClick={handleRequest}>
              Request this book
            </ButtonStyles>
          ) : null}
          {props.remove && <RemoveBook id={id} />}
        </div>
      </BookCardStyles>
    </>
  );
};

export default BookCard;
