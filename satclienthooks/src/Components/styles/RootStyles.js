import styled from 'styled-components';

const RootStyles = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  nav > * {
    margin-bottom: 1rem;
  }

  a {
    color: white;
    transition: 500ms all;
    text-decoration: none;
  }

  a:hover {
    transform: translateY(-10%);
    color: white;
    border-radius: 2px;
    /* border-bottom: 2px solid rgba(0, 0, 0, 0.5); */
    /* box-shadow: 5px rgba(0, 0, 0, 0.5); */
  }

  a:visited {
    color: white;
  }
`;

export default RootStyles;
