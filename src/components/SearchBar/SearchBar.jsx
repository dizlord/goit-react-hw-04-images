import { useState, useEffect, useRef } from 'react';
import { HiOutlineSearch } from 'react-icons/hi';
import PropTypes from 'prop-types';

const SearchBar = ({ onSubmit }) => {
  const [query, setQuery] = useState('');

  const headerRef = useRef();

  useEffect(() => { 
    const { height: pageHeaderHeight } = headerRef.current.getBoundingClientRect();
    document.body.style.paddingTop = `${pageHeaderHeight + 5}px`;
  },[]);

  const handleChange = e => {
    setQuery(e.target.value);
  };

  const handleSubmit = e => {
    e.preventDefault();

    onSubmit(query);
  };

  return (
    <header ref={headerRef} className="Searchbar">
      <form className="SearchForm" onSubmit={handleSubmit}>
        <button type="submit" className="SearchForm-button">
          <HiOutlineSearch />
        </button>

        <input
          className="SearchForm-input"
          type="text"
          autoComplete="off"
          autoFocus
          placeholder="Search images and photos"
          name="query"
          value={query}
          onChange={handleChange}
        />
      </form>
    </header>
  );
};

SearchBar.propTypes = {
  onSubmit: PropTypes.func.isRequired,
};

export default SearchBar;
