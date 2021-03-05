import styled from 'styled-components';

const ContainerStyles = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  font-size: 1rem;
  grid-gap: 4rem;
  margin: 2rem;
`;

const ShellStyles = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  text-align: center;
  width: 100vw;
  h1 {
    margin-top: 1rem;
    padding-top: 1rem;
  }
`;

const SearchContainerStyles = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(950px, 1fr));
  font-size: 1rem;
  grid-gap: 4rem;
  margin: 2rem;

  @media (max-width: 480px) {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    * {
      width: 100% !important;
    }
  }

  @media (min-width: 481px) and (max-width: 950px) {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    * {
      width: 100% !important;
    }
  }
`;

export { ShellStyles, ContainerStyles, SearchContainerStyles };
