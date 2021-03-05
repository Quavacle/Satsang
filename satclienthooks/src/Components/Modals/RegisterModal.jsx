import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import * as helper from '../../helpers/_userHelper';
import RegisterForm from '../Forms/RegisterForm';
import { ButtonStyles } from '../styles/ButtonStyles';
import ModalStyles from '../styles/ModalStyles';

const RegisterModal = ({ setOpenRegister }) => {
  const [form, setForm] = useState({
    username: '',
    email: '',
    password: '',
  });

  const history = useHistory();

  const handleChange = (e) => {
    const target = e.target.name;
    const value = e.target.value;
    setForm({ ...form, [target]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    helper.register(form).then((res) => {
      console.log(res);
      history.push('/dashboard');
    });
  };

  return (
    <ModalStyles>
      <div class='header'>
        <h1>Register</h1>
        <ButtonStyles onClick={() => setOpenRegister(false)}>
          &times;
        </ButtonStyles>
      </div>
      <RegisterForm handleChange={handleChange} handleSubmit={handleSubmit} />
    </ModalStyles>
  );
};

export default RegisterModal;
