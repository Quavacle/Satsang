import styled from 'styled-components';

const FormStyles = styled.form`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  .input-group {
    width: 100%;
    flex: 1;
    margin: 10px;
    display: flex;
    justify-content: space-evenly;
    label {
      align-self: flex-start;
      width: 50%;
    }
  }

  @media (max-width: 480px) {
    font-size: 1rem;
    .input-group {
      display: flex;
    }
  }
`;
export default FormStyles;
