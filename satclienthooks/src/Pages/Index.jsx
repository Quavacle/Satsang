import React from 'react';
import styled from 'styled-components';
import books from '../images/books-stack.svg';
import group from '../images/group.svg';
import arrows from '../images/arrows.svg';

const HeroStyles = styled.div`
  /* border: 4px solid ${(props) => props.theme.accent}; */
  border-radius: 5px;
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
  align-items: center;
  height: 75vh;
  width: 75vw;
  color: white;
  margin-top: 2rem;
  background-color: #022e40b8;
  h1 {
    color: ${(props) => props.theme.accent};
    /* text-shadow: 8px 8px ${(props) => props.theme.secondary}; */
    text-decoration: underline;
    text-decoration-color: white;
    font-size: 4rem;
    margin: 1rem;
    width: 45vw;
    text-align: center;
  }
  .icons {
    width: 100%;
    display: flex;
    justify-content: space-evenly;
    align-items: baseline;
  }
  .header {
    padding: 5rem;
    border-top: 2px solid grey;
    border-left: 2px solid grey;
    box-shadow: 5px 5px 10px grey;
    border-radius: 4px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
  }

  @media (max-width: 480px) {
    width: 100vw;
    border-radius: 0;
    font-size: 1rem;
    h1 {
      width: auto;
    }
    .header {
      border: none;
      box-shadow: none;
    }
    em {
      width: auto;
    }
    * > * {
      width: 20px;
    }
    .icons {
      font-size: 0.7rem;
      width: 100%;
      display: flex;
    }

    span {
      width: 90px;
    }
  }
`;

const IconGroupStyles = styled.div`
  text-align: center;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
`;

const SvgStyles = styled.img`
  filter: invert(100%) sepia(5%) saturate(2%) hue-rotate(265deg)
    brightness(109%) contrast(101%);
`;

const Index = () => {
  return (
    <HeroStyles>
      <div className='header'>
        <h1>Satsang</h1>
        <em>Book Sharing For All</em>
      </div>
      <div className='icons'>
        <IconGroupStyles className='books'>
          <span>Add books with a single click</span>
          <SvgStyles use={books} src={books} />
        </IconGroupStyles>
        <IconGroupStyles classNames='group'>
          <span>Keep track of your books</span>
          <SvgStyles src={group} />
        </IconGroupStyles>
        <IconGroupStyles classNames='group'>
          <span>Lend and return books easily</span>
          <SvgStyles src={arrows} />
        </IconGroupStyles>
      </div>
    </HeroStyles>
  );
};

export default Index;
