import React, { useContext } from 'react';
import { useHistory } from 'react-router-dom';
import { acceptReturn } from '../helpers/_exchangeHelper';
import { AlertContext } from '../providers/alertProvider';
import { ButtonStyles } from './styles/ButtonStyles';

export default function AcceptReturn({ id }) {
  const { addMessage } = useContext(AlertContext);
  const history = useHistory();

  const handleAccept = () => {
    acceptReturn(id);
    addMessage('Return Accepted');
    history.push('/dashboard');
  };

  return <ButtonStyles onClick={handleAccept}>Accept Return</ButtonStyles>;
}
