import Axios from 'axios';
import React, { useState, useContext } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { AuthContext } from '../../providers/authProvider';
import LoginModal from '../Modals/LoginModal';
import RegisterModal from '../Modals/RegisterModal';
import NavButtonStyles from '../styles/NavButtonStyles';
import NavStyles from '../styles/NavStyles';

const Nav = () => {
  const [openLogin, setOpenLogin] = useState(false);
  const [openRegister, setOpenRegister] = useState(false);
  const history = useHistory();
  const user = useContext(AuthContext);
  const { changeUser } = useContext(AuthContext);

  const token = localStorage.getItem('token');

  if (token && user.user === null) {
    Axios.get('http://localhost:3000/users/auth', {
      headers: { authorization: token },
    })
      .then((res) => changeUser(res?.data))
      .catch((err) => console.error(err));
  }

  const handleLogin = () => {
    setOpenLogin(!openLogin);
  };

  const handleRegister = () => {
    setOpenRegister(!openRegister);
  };

  const handleLogout = () => {
    changeUser(null);
    localStorage.removeItem('token');
    history.push('/');
  };

  return (
    <div>
      {openLogin ? <LoginModal setOpenLogin={setOpenLogin} /> : null}
      {openRegister ? (
        <RegisterModal setOpenRegister={setOpenRegister} />
      ) : null}
      <NavStyles>
        <Link to='/' className='logo'>
          Satsang
        </Link>
        {user.user === null ? (
          <>
            <NavButtonStyles className='open-modal' onClick={handleRegister}>
              Register
            </NavButtonStyles>
            <NavButtonStyles className='open-modal' onClick={handleLogin}>
              Login
            </NavButtonStyles>
          </>
        ) : (
          <>
            <Link to='/search'>Find + Request</Link>
            <Link to='/dashboard'>Dashboard</Link>
            <Link to='/add'>Add to Collection</Link>
            <span>Logged in as {user.user.name}</span>
            <NavButtonStyles onClick={handleLogout}>Log Out</NavButtonStyles>
          </>
        )}
      </NavStyles>
    </div>
  );
};

export default Nav;
