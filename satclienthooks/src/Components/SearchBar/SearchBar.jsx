import React, { useEffect } from 'react';
import styled from 'styled-components';
import * as helpers from '../../helpers/_searchHelper';
import { ButtonStyles } from '../styles/ButtonStyles';
import InputStyles from '../styles/InputStyles';
import './searchbar.css';

const SearchContainerStyles = styled.div`
  display: flex;
  justify-content: center;
  align-items: space-evenly;
`;

const SearchBar = ({ current, setCurrent, setResult, handleSearch }) => {
  useEffect(() => {
    const handleEnter = (e) => {
      if (e.key === 'Enter') {
        console.log(current);
        handleSearch();
      }
    };
    window.addEventListener('keyup', handleEnter);

    return () => {
      window.removeEventListener('keyup', handleEnter);
    };
  }, [current]);

  const handleChange = (e) => {
    setCurrent(e.target.value);
  };

  return (
    <SearchContainerStyles>
      <InputStyles type='text' onChange={handleChange} />
      <ButtonStyles onClick={handleSearch}>Submit</ButtonStyles>
    </SearchContainerStyles>
  );
};

export default SearchBar;
