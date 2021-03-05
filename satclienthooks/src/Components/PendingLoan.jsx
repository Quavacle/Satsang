import React, { useContext } from 'react';
import styled from 'styled-components';
import { acceptRequest } from '../helpers/_exchangeHelper';
import { AlertContext } from '../providers/alertProvider';
import { ButtonStyles } from './styles/ButtonStyles';
import { ListBodyStyles, ListHeaderStyles } from './styles/DashboardStyles';
import { ListStyles } from './styles/ListStyles';

const PendingStyles = styled.div`
  display: flex;
  flex-direction: column;
  background-color: ${(props) => props.theme.secondary};

  * {
    display: flex;
    justify-content: center;
    align-items: center;
  }
`;
export default function PendingLoan({ books }) {
  console.log('PENDING HERE HELLO');
  console.log(books);
  const { addMessage } = useContext(AlertContext);

  function handleAccept(e) {
    const user = e.attributes['data-user'].value;
    const id = e.attributes['data-id'].value;

    acceptRequest(id, user);
    addMessage('Loan Accepted');
  }
  return books.map((request, index) => {
    if (request.requested_by.length === 0) {
      return null;
    }
    return (
      <div key={index}>
        <ListStyles>
          {request.book.title} requested by
          {request.requested_by.map((user) => (
            <>
              <p>{user.username}</p>
              <ButtonStyles
                data-user={user._id}
                data-id={request._id}
                onClick={(e) => handleAccept(e.target)}
              >
                Accept Loan
              </ButtonStyles>
            </>
          ))}
        </ListStyles>
      </div>
    );
  });
}
