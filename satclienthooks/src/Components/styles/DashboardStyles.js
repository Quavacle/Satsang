import styled from 'styled-components';

const ListHeaderStyles = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  border-bottom: 2px solid rgba(25, 25, 25, 0.75);
  width: 90vw;
  margin-bottom: 5px;
`;

const ListBodyStyles = styled.div`
  > *:hover {
    box-shadow: 2px 2px rgba(124, 124, 124, 0.5);
    transform: translateY(-5%);
    background-color: rgba(124, 124, 124, 0.226);
  }
`;

export { ListHeaderStyles, ListBodyStyles };
