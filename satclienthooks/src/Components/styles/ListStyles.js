import styled from 'styled-components';

const ListStyles = styled.div`
  display: flex;
  color: white;
  justify-content: space-between;
  align-items: center;
  transition: all 500ms;
  background-color: transparent;
  height: 3rem;
  :hover {
    background-color: rgba(0, 0, 0, 0.25);
  }
  button {
    z-index: 20;
  }
`;

const ListContainerStyles = styled.div`
  * > * {
    background-color: ${(props) => props.theme.secondary};
    display: flex;
    justify-content: space-evenly;
    align-items: center;
    margin: 10px 10px;
    padding: 5px 5px 5px 5px;
    flex-wrap: wrap;
    border-bottom: 2px solid rgba(25, 25, 25, 0.75);
    border-right: 2px solid rgba(25, 25, 25, 0.75);
    border-top: 1px solid rgba(25, 25, 25, 0.438);
    border-left: 1px solid rgba(25, 25, 25, 0.438);
    border-radius: 4px;
    box-shadow: 4px 5px rgba(25, 25, 25, 0.438);
  }
`;

export { ListContainerStyles, ListStyles };
