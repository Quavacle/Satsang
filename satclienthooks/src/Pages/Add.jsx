import React, { useState } from 'react';
import SearchBar from '../Components/SearchBar/SearchBar';
import Results from '../Components/Results';
import { ButtonStyles } from '../Components/styles/ButtonStyles';
import * as helpers from '../helpers/_searchHelper';
import HeaderStyles from '../Components/styles/HeaderStyles';
import {
  ContainerStyles,
  ShellStyles,
  SearchContainerStyles,
} from '../Components/styles/ContainerStyles';

const Add = () => {
  //@@ TODO Add auth provider
  const [result, setResult] = useState(null);
  const [page, setPage] = useState(0);
  const [displayPage, setDisplayPage] = useState(1);
  const [current, setCurrent] = React.useState(null);

  const handlePageIncrease = () => {
    page === 0 ? setPage(10) : setPage(page + 10);
    setDisplayPage(displayPage + 1);
    handleSearch();
    const topAnchor = document.getElementById('page-top');
    topAnchor.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  const handlePageDecrease = () => {
    if (page !== 0) {
      setPage(page - 10);
      setDisplayPage(displayPage - 1);
      handleSearch();
    }
  };

  const handleSearch = () => {
    console.log('Search hit');
    console.log(page);
    helpers
      .search(current, page)
      .then((res) => setResult(res))
      .catch((err) => console.log(err));
  };

  return (
    <ShellStyles>
      <HeaderStyles id='page-top'>Add to your Collection</HeaderStyles>
      <SearchBar
        setResult={setResult}
        current={current}
        setCurrent={setCurrent}
        handleSearch={handleSearch}
      />
      <SearchContainerStyles>
        <Results results={result} />
      </SearchContainerStyles>
      {result && (
        <div>
          <ButtonStyles
            aria-disabled={displayPage <= 0}
            onClick={handlePageDecrease}
          >
            Prev
          </ButtonStyles>
          Page {displayPage}
          <ButtonStyles onClick={handlePageIncrease}>Next</ButtonStyles>
        </div>
      )}
    </ShellStyles>
  );
};

export default Add;
