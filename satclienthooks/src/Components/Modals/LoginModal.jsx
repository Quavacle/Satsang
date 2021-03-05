import React, { useState, useContext } from 'react';
import { useHistory } from 'react-router-dom';
import * as helper from '../../helpers/_userHelper';
import { AlertContext } from '../../providers/alertProvider';
import { AuthContext } from '../../providers/authProvider';
import LoginForm from '../Forms/LoginForm';
import { ButtonStyles } from '../styles/ButtonStyles';
import ModalStyles from '../styles/ModalStyles';

const LoginModal = ({ setOpenLogin }) => {
  let { addMessage } = useContext(AlertContext);
  let { changeUser } = useContext(AuthContext);
  const [form, setForm] = useState({
    email: '',
    password: '',
  });

  let history = useHistory();

  const handleChange = (e) => {
    const target = e.target.name;
    const value = e.target.value;
    setForm({ ...form, [target]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    helper
      .login(form)
      .then((res) => {
        addMessage('Logged In!');
        changeUser(res);
        history.push('/dashboard');
        setOpenLogin(false);
      })
      .catch((err) => {
        console.log(err);
        addMessage('Error Logging In! :(');
        history.push('/index');
      });
  };

  return (
    <ModalStyles>
      <div class='header'>
        <h1>Login</h1>
        <ButtonStyles onClick={() => setOpenLogin(false)}>&times;</ButtonStyles>
      </div>
      <LoginForm handleChange={handleChange} handleSubmit={handleSubmit} />
    </ModalStyles>
  );
};

export default LoginModal;
