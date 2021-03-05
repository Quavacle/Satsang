import React, { useContext } from 'react';
import { useHistory } from 'react-router-dom';
import { deleteInstance } from '../helpers/_crudHelper';
import { returnBook } from '../helpers/_exchangeHelper';
import { AlertContext } from '../providers/alertProvider';
import { ButtonStyles } from './styles/ButtonStyles';

export default function ReturnBook({ id }) {
  const { addMessage } = useContext(AlertContext);
  const history = useHistory();

  const handleReturn = () => {
    returnBook(id);
    addMessage('Book Returned, Awaiting Confirmation');
    history.push('/dashboard');
  };

  return <ButtonStyles onClick={handleReturn}>Return</ButtonStyles>;
}
