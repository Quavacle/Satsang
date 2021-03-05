import React from 'react';
import { ButtonStyles } from '../styles/ButtonStyles';
import FormStyles from '../styles/FormStyles';

const LoginForm = ({ handleChange, handleSubmit }) => {
  return (
    <FormStyles className='login'>
      <div className='input-group'>
        <label>Email</label>
        <input
          required
          type='text'
          name='email'
          placeholder='Enter your email'
          onChange={handleChange}
        />
      </div>
      <div className='input-group'>
        <label>Password</label>
        <input
          required
          type='password'
          name='password'
          placeholder='Create a password'
          onChange={handleChange}
        />
      </div>
      <div className='button-group'>
        <ButtonStyles onClick={handleSubmit} className='submit'>
          Login!
        </ButtonStyles>
      </div>
    </FormStyles>
  );
};

export default LoginForm;
