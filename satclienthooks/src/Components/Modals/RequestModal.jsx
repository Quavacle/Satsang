import React, { useState, useContext } from 'react';
import { AlertContext } from '../../providers/alertProvider';
import { requestInstance } from '../../helpers/_exchangeHelper';
import styled from 'styled-components';
import { ButtonStyles } from '../styles/ButtonStyles';
import { AuthContext } from '../../providers/authProvider';

const UserInfo = styled.div`
  position: fixed;
  top: 50%;
  left: 50%;
  min-width: 35%;
  max-width: 50%;
  min-height: 50%;
  transform: translate(-50%, -50%);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-evenly;
  border-radius: 4px;
  border: 2px solid #4d8abc;
  background-color: rgba(240, 240, 240, 0.92);
  box-shadow: 2px 4px 4px #efefef;

  h1 {
    margin: 1rem;
  }
  select {
    font-size: 16px;
    width: 100%;
    height: 25px;
  }
  form {
    width: 75%;
    padding: 1rem;
    display: flex;
    flex-direction: column;
    justify-content: center;
  }
  fieldset {
    border: none;
    display: flex;
    flex-direction: column;
    justify-content: space-evenly;
    align-items: center;
    padding: 2rem;
    width: 75%;
    border-radius: 4px;
  }

  .exit {
    font-size: 18px;
    position: absolute;
    top: 10px;
    right: 10px;
    width: 50px;
    text-align: center;
    margin: auto;
  }
  div {
    text-align: center;
  }
`;

export default function RequestModal({ setOpenRequest, allBooks }) {
  const [instance, setInstance] = useState(null);
  const { addMessage } = useContext(AlertContext);
  const { user } = useContext(AuthContext);

  function handleSelection(e) {
    e.preventDefault();
    setInstance(e.target.value);
  }

  function handleSubmit() {
    requestInstance(instance);
    addMessage('Book requested!');
  }
  return (
    <UserInfo>
      <div>
        Request a copy of:
        <h1>{allBooks[0].book.title}</h1>
        {allBooks.length} cop{allBooks.length === 1 ? 'y' : 'ies'} total
      </div>
      <fieldset>
        <form>
          <select
            name='selectUser'
            id='selectUser'
            placeHolder='Select a user'
            onChange={handleSelection}
          >
            <option disabled hidden selected>
              Choose User
            </option>
            {allBooks.map((inst) => {
              if (user._id === inst.user._id) return null;
              return (
                <option key={inst._id} value={inst._id}>
                  {inst.user.username}
                </option>
              );
            })}
          </select>
          <ButtonStyles
            className='request-button'
            type='button'
            onClick={handleSubmit}
          >
            Request Book
          </ButtonStyles>
        </form>
      </fieldset>
      <ButtonStyles className='exit' onClick={() => setOpenRequest(false)}>
        &times;
      </ButtonStyles>
    </UserInfo>
  );
}
