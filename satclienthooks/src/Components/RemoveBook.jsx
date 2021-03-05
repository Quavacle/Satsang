import React, { useContext } from 'react';
import { useHistory } from 'react-router-dom';
import { deleteInstance } from '../helpers/_crudHelper';
import { AlertContext } from '../providers/alertProvider';
import { ButtonStyles } from './styles/ButtonStyles';

export default function RemoveBook({ id, index, removeEntry }) {
  const { addMessage } = useContext(AlertContext);
  const history = useHistory();

  const removeBook = () => {
    deleteInstance(id);
    addMessage('Book Deleted');
    removeEntry(index);
  };

  return <ButtonStyles onClick={removeBook}>Remove</ButtonStyles>;
}
