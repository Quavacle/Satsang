import styled from 'styled-components';

const InputStyles = styled.input`
  height: 3rem;
  font-size: 2rem;
  min-width: 65vw;
  margin: 1rem;
  border-radius: 10px;
  box-shadow: 0;
  border: 0;

  @media (max-width: 480px) {
    height: 2.5rem;
    font-size: 1rem;
  }
`;

export default InputStyles;
