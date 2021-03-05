import React, { useState, useContext } from 'react';
import { AlertContext } from '../providers/alertProvider';
import { requestInstance } from '../helpers/_exchangeHelper';
import styled from 'styled-components';

const UserInfo = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  a {
    transition: all 0.5s;
    color: red;
  }
  a:hover {
    text-decoration: underline;
    color: black;
  }
`;

export default function Request({ book }) {
  const [instance, setInstance] = useState(null);
  const { addMessage } = useContext(AlertContext);

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
      {book.length} cop{book.length === 1 ? 'y' : 'ies'} total
      <form>
        <fieldset>
          <select
            name='selectUser'
            id='selectUser'
            placeHolder='Select a user'
            onChange={handleSelection}
          >
            <option disabled hidden selected>
              Choose User
            </option>
            {book.map((inst) => {
              return (
                <option key={inst._id} value={inst._id}>
                  {inst.user.username}
                </option>
              );
            })}
          </select>
        </fieldset>
      </form>
      <button type='button' onClick={handleSubmit}>
        Request Book
      </button>
    </UserInfo>
  );
}
