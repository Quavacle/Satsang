import React, { useState, history } from 'react';
import * as helper from '../helpers/_userHelper';

import RegisterForm from '../Components/Forms/RegisterForm';
const server = process.env.REACT_APP_LOCAL_DB;

// @@ TODO- Add client-side validation, split in to smaller components
// @@ TODO- Styling

const Register = () => {
  const [form, setForm] = useState({
    name: '',
    username: '',
    email: '',
    password: '',
  });

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
    <div className='registration form'>
      <div class='header'>Register</div>
      <RegisterForm handleChange={handleChange} handleSubmit={handleSubmit} />
    </div>
  );
};

export default Register;
