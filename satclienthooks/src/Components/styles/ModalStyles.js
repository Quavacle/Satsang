import styled from 'styled-components';

const ModalStyles = styled.div`
  z-index: 20;
  position: absolute;
  top: 10%;
  left: 10%;
  width: 75vw;
  height: 50vh;
  background-color: ${(props) => props.theme.primary};
  color: white;
  border-radius: 4px;
  border: 2px solid ${(props) => props.theme.accent};
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  .header {
    display: flex;
    justify-content: space-around;
    align-items: baseline;
    button {
      position: absolute;
      top: 10px;
      right: 10px;
  }

  
  @media (max-width: 480px) {
    display: flex;
    * {
      flex: 1;
    }
    .header {
      button {
        width: 20px;
        display: absolute;
        top: 2px;
        right: 2px;
      }
    }
    form {
    }
    .register {
      display: flex;
      background-color: red;
      flex: 1;

    }
  }
`;

export default ModalStyles;
