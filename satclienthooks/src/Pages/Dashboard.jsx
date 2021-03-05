import React, { useState, useEffect } from 'react';
import { getDashboard } from '../helpers/_crudHelper';
import DashList from '../Components/Lists/DashList';
import { ButtonStyles } from '../Components/styles/ButtonStyles';
import {
  ListBodyStyles,
  ListHeaderStyles,
} from '../Components/styles/DashboardStyles';
import styled from 'styled-components';
import PendingLoan from '../Components/PendingLoan';
import arrow from '../images/up-arrow.svg';
import HeaderStyles from '../Components/styles/HeaderStyles';

const DashHeader = styled.h2`
  color: ${(props) => props.theme.accent};
`;

const CountStyles = styled.span`
  color: red;
  padding: 1rem;
  width: 25px;
  height: 25px;
  border-radius: 50%;
`;

const Dashboard = () => {
  const [dash, setDash] = useState({
    borrowed: [],
    requested: [],
    owned: [],
    loaned: [],
    pendingReturn: [],
    pendingLoan: [],
  });

  const [showMenu, setShowMenu] = useState({
    borrowed: false,
    requested: false,
    owned: false,
    loaned: false,
    pendingLoan: false,
    pendingReturn: false,
  });

  useEffect(() => {
    getDashboard()
      .then((res) => {
        const data = res.results;
        console.log(data);
        setDash(data);
      })
      .catch((err) => console.log(err));
  }, []);

  const handleShowMenu = (menu) => {
    const newMenu = { ...showMenu };
    newMenu[menu] = !newMenu[menu];
    setShowMenu(newMenu);
  };

  const removeEntry = (index) => {
    console.log(index);
    const newOwned = dash.owned;
    dash.owned.splice(index, 1);
    setDash({ ...dash, owned: newOwned });
  };

  const loanedBooks = dash.owned.filter((book) => book.borrowed_by?.length > 0);
  const pendingReturn = dash.owned.filter(
    (book) => book.pending_return === true
  );

  return (
    <div className='dashboard'>
      <HeaderStyles>Dashboard</HeaderStyles>
      {/* Borrowed Books ------ ----------------------------------------------*/}
      <ListHeaderStyles>
        <DashHeader>
          Borrowed Books
          <CountStyles>{dash.borrowed.length}</CountStyles>
        </DashHeader>
        <ButtonStyles onClick={() => handleShowMenu('borrowed')}>
          <img
            src={arrow}
            alt=''
            className={JSON.stringify(showMenu.borrowed)}
          />
        </ButtonStyles>
      </ListHeaderStyles>
      <ListBodyStyles>
        {showMenu.borrowed && dash ? (
          <DashList books={dash.borrowed} type='borrowed' />
        ) : null}
      </ListBodyStyles>
      {/* Borrowed Books ------ ----------------------------------------------*/}
      <ListHeaderStyles>
        <DashHeader>
          Requested Book
          <CountStyles>{dash.requested.length}</CountStyles>
        </DashHeader>
        <ButtonStyles onClick={() => handleShowMenu('requested')}>
          <img
            src={arrow}
            alt=''
            className={JSON.stringify(showMenu.requested)}
          />
        </ButtonStyles>
      </ListHeaderStyles>
      <ListBodyStyles>
        {showMenu.requested && dash ? (
          <DashList type='Requested' books={dash.requested} />
        ) : null}
      </ListBodyStyles>
      {/* Borrowed Books ------ ----------------------------------------------*/}
      <ListHeaderStyles>
        <DashHeader>
          Your Books <CountStyles>{dash.owned.length}</CountStyles>{' '}
        </DashHeader>
        <ButtonStyles onClick={() => handleShowMenu('owned')}>
          <img src={arrow} alt='' className={JSON.stringify(showMenu.owned)} />
        </ButtonStyles>
      </ListHeaderStyles>
      <ListBodyStyles>
        {showMenu.owned && dash ? (
          <DashList
            type={'Owned'}
            books={dash.owned}
            type='owned'
            removeEntry={removeEntry}
          />
        ) : null}
      </ListBodyStyles>
      {/* Borrowed Books ------ ----------------------------------------------*/}
      <ListHeaderStyles>
        <DashHeader>Pending Loans</DashHeader>
        <ButtonStyles onClick={() => handleShowMenu('pendingLoan')}>
          <img
            src={arrow}
            alt=''
            className={JSON.stringify(showMenu.pendingLoan)}
          />
        </ButtonStyles>
      </ListHeaderStyles>
      <ListBodyStyles>
        {showMenu.pendingLoan && dash ? (
          <PendingLoan type={'pendingLoan'} books={dash.owned} />
        ) : null}
      </ListBodyStyles>
      {/* Borrowed Books ------ ----------------------------------------------*/}
      <ListHeaderStyles>
        <DashHeader>
          Loaned Books <CountStyles>{loanedBooks.length}</CountStyles>
        </DashHeader>
        <ButtonStyles onClick={() => handleShowMenu('loaned')}>
          <img src={arrow} alt='' className={JSON.stringify(showMenu.loaned)} />
        </ButtonStyles>
      </ListHeaderStyles>
      <ListBodyStyles>
        {showMenu.loaned && dash ? (
          <DashList type={'pendingLoan'} books={loanedBooks} />
        ) : null}
      </ListBodyStyles>
      {/* Borrowed Books ------ ----------------------------------------------*/}
      <ListHeaderStyles>
        <DashHeader>Pending Return</DashHeader>
        <ButtonStyles onClick={() => handleShowMenu('pendingReturn')}>
          <img
            src={arrow}
            alt=''
            className={JSON.stringify(showMenu.pendingReturn)}
          />
        </ButtonStyles>
      </ListHeaderStyles>
      <ListBodyStyles>
        {showMenu.pendingReturn && dash ? (
          <DashList type={'pendingReturn'} books={pendingReturn} />
        ) : null}
      </ListBodyStyles>
    </div>
  );
};

export default Dashboard;
