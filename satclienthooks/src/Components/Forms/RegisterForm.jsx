import React from 'react';
import { ButtonStyles } from '../styles/ButtonStyles';
import FormStyles from '../styles/FormStyles';

const RegisterForm = ({ handleChange, handleSubmit }) => {
  return (
    <FormStyles className='register'>
      <div className='input-group'>
        <label>Username</label>
        <input
          type='text'
          name='username'
          placeholder='Choose a username'
          onChange={handleChange}
        />
      </div>
      <div className='input-group'>
        <label>Email</label>
        <input
          type='text'
          name='email'
          placeholder='Enter your email'
          onChange={handleChange}
        />
      </div>
      <div className='input-group'>
        <label>Password</label>
        <input
          type='password'
          name='password'
          placeholder='Create a password'
          onChange={handleChange}
        />
      </div>
      <div className='button-group'>
        <ButtonStyles onClick={handleSubmit} className='submit'>
          Register!
        </ButtonStyles>
      </div>
    </FormStyles>
  );
};

export default RegisterForm;
