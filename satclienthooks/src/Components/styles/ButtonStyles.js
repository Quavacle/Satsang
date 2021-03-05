import styled from 'styled-components';

const ButtonStyles = styled.button`
  transition: all 500ms;
  padding: 1em;
  margin: 1em;
  border-radius: 4px;
  border: 2px solid black;
  box-shadow: 2px 2px 2px grey;

  color: ${(props) => props.theme.primary};
  background-color: ${(props) => props.theme.accent};

  :hover {
    transform: translateY(-10%);
    background-color: ${(props) => props.theme.secondary};
    color: ${(props) => props.theme.tertiary};
  }

  :active {
    box-shadow: 0;
    background-color: #4dbcb7;
  }

  .false {
    transform: rotateZ(180deg);
  }

  img {
    width: 2rem;
    transition: all 500ms;
  }

  [aria-disabled='true'] {
    color: grey;
    background-color: darkgray;
  }

  @media (max-width: 480px) {
    height: 1.7rem;
    display: flex;
    align-items: center;
    justify-content: center;
    /* width: 30px;
    height: 30px; */

    * {
      text-align: center;
      margin: auto;
      padding-top: 0;
    }
    img {
      margin: auto;
      width: 1.2rem;
      z-index: 20;
      padding-top: -10px;
      margin-top: -10px;
    }
  }
`;

export { ButtonStyles };
