import styled from 'styled-components';

const BookCardStyles = styled.div`
  display: grid;
  grid-template-columns: repeat(6, 150px);
  grid-template-rows: repeat(6, 45px);
  flex-direction: column;
  align-items: center;
  width: min-content;
  height: max-content;
  border-radius: 10px;
  margin: 1rem;
  padding: 10px;
  box-shadow: 5px 5px 5px rgba(78, 74, 74, 0.7);
  background-color: ${(props) => props.theme.tertiary};

  .header {
    grid-column-start: 1;
    grid-column-end: 3;
    grid-row-start: 1;
    grid-row-end: 8;
    flex: 2;
    display: flex;
    flex-direction: column;
    color: white;
    width: 100%;
    min-height: 100%;
    text-align: center;
    justify-content: space-around;
    border-radius: 4px;
    color: ${(props) => props.theme.tertiary};
    background-color: ${(props) => props.theme.primary};
  }

  .header > * {
    padding: 1rem;
  }

  .body {
    width: 100%;
    grid-column-start: 3;
    grid-column-end: 8;
    grid-row-start: 5;
    grid-row-end: 7;
  }

  .inputs {
    margin-top: 10px;
    grid-column-start: 7;
    grid-column-end: 7;
    grid-row-start: 7;
    grid-row-end: 8;
  }

  ul,
  li {
    list-style-type: none;
    list-style-position: inside;
    margin: 0;
    padding: 0;
    text-align: center;
  }

  sub {
    text-align: center;
  }

  img {
    max-width: 65%;
    max-height: 15%;
    width: auto;
    margin: auto;
  }

  @media (max-width: 480px) {
    .body {
      display: none;
    }
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    img {
      height: 100%;
      max-height: 100%;
      max-width: 100%;
    }

    .inputs {
      button {
        margin-left: 0px;
      }
    }
  }
`;

export default BookCardStyles;
