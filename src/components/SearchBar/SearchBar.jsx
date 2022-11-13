import { Component } from 'react';
import { HiOutlineSearch } from "react-icons/hi";
import PropTypes from 'prop-types';

class SearchBar extends Component {
  state = {
    query: '',
  };

  componentDidMount = () => {
    const { height: pageHeaderHeight } = document.querySelector('.Searchbar')
      .getBoundingClientRect();
    document.body.style.paddingTop = `${pageHeaderHeight + 5}px`;
  }

  handleChange = (e) => {
    const query = e.target.value;
    this.setState({query});
  };

  handleSubmit = (e) => {
    e.preventDefault();

    this.props.onSubmit(this.state.query);
  }

  render() {
    return (
      <header className="Searchbar">
        <form className="SearchForm" onSubmit={this.handleSubmit}>
          <button type="submit" className="SearchForm-button">
            {/* <span className="SearchForm-button-label">Search</span> */}
            <HiOutlineSearch />
          </button>

          <input
            className="SearchForm-input"
            type="text"
            autoComplete="off"
            autoFocus
            placeholder="Search images and photos"
            name='query'
            value={this.state.query}
            onChange={this.handleChange}
          />
        </form>
      </header>
    );
  }
}

SearchBar.propTypes = {
  onSubmit: PropTypes.func.isRequired,
}

export default SearchBar;
