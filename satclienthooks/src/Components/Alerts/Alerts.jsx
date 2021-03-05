import React, { useContext, useEffect } from 'react';
import styled from 'styled-components';
import { AlertContext } from '../../providers/alertProvider';

const AlertStyles = styled.div`
  text-align: center;
  z-index: 250;
  min-width: 250px;
  margin-left: -125px;
  background-color: #333;
  color: #fff;
  text-align: center;
  border-radius: 2px;
  padding: 16px;
  position: fixed;
  left: 50%;
  bottom: 30px;
`;

function Alert() {
  const { message, removeMessage } = useContext(AlertContext);

  useEffect(() => {
    setTimeout(() => removeMessage(), 3000);
  });

  return (
    <div>
      {message ? (
        <AlertStyles>
          <h1>{message.message}</h1>
          <h2>{message.status}</h2>
        </AlertStyles>
      ) : null}
    </div>
  );
}

export default Alert;
