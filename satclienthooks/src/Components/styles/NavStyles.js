import styled from 'styled-components';

const NavStyles = styled.nav`
  width: 100vw;
  display: flex;
  justify-content: space-around;
  box-shadow: 5px 5px 20px rgba(0, 0, 0, 0.5);
  align-items: center;
  background-color: ${(props) => props.theme.primary};
  border-bottom: 2px solid ${(props) => props.theme.accent};
  color: ${(props) => props.theme.tertiary};
  padding-top: 1rem;

  a {
    color: black;
  }

  @media (max-width: 480px) {
    font-size: 0.7rem;
    display: flex;
    flex-wrap: wrap;
    span {
      display: none;
    }
    .logo {
      display: none;
    }
  }
`;

export default NavStyles;
