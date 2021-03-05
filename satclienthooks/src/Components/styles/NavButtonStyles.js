import styled from 'styled-components';

const NavButtonStyles = styled.button`
  font-family: 'Poppins', sans-serif;
  font-size: 16px;
  transition: 500ms all;
  border: none;
  color: white;
  background-color: ${(props) => props.theme.primary};

  :hover {
    transform: translateY(-10%);
    color: white;
    border-radius: 2px;
  }

  @media (max-width: 480px) {
    font-size: 0.7rem;
  }
`;

export default NavButtonStyles;
