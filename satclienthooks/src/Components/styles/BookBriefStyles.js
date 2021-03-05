import styled from 'styled-components';

const BookBriefStyles = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  border: solid 2px rgba(185, 176, 176, 0.7);
  border-radius: 10px;
  margin: 5px 5px 5px 5px;
  padding: 10px;
  box-shadow: 5px 5px 5px rgba(78, 74, 74, 0.7);
  width: 100%;
  background-color: ${(props) => props.theme.tertiary};

  .header {
    font-size: 1vw;
    display: flex;
    flex-direction: column;
    width: 100%;
    height: 75%;
    text-align: center;
    align-items: center;
    justify-content: space-around;
    border-radius: 10px;
    color: ${(props) => props.theme.tertiary};
    background-color: ${(props) => props.theme.primary};
  }

  .header > * {
    padding: 1rem;
  }

  .inputs {
  }

  li {
    list-style-type: none;
    list-style-position: inside;

    text-align: center;
  }

  sub {
    text-align: center;
  }

  img {
    width: auto;
    margin: auto;
  }

  @media (max-width: 480px) {
    font-size: 1rem;

    .header {
      font-size: 1rem;
    }
  }
`;

export default BookBriefStyles;
