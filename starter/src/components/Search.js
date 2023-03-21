import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import * as BooksAPI from '../api/BooksAPI';
import Book from '../components/Book';
import { PropTypes } from 'prop-types';

const Search = ({ bookList, updateBookCategory }) => {
  const [queryString, setQueryString] = useState('');
  const [searchBooks, setSearchBooks] = useState([]);

  const handleQueryString = (e) => {
    let query = e.target.value.toLowerCase();

    if (query !== '') {
      BooksAPI.search(query, 100).then((res) => {
        if (!res.error) {
          setSearchBooks(res);
        }
        setQueryString(query.trim());
      });
    } else {
      setQueryString('');
      setSearchBooks([]);
    }
  };

  const bookSearchList = queryString === '' ? [] : searchBooks;

  //   const newBookList = queryString === '' ? [] : searchBooks;

  return (
    <div className="search-books">
      <div className="search-books-bar">
        <Link to="/">
          <button className="close-search">Close</button>
        </Link>
        <div className="search-books-input-wrapper">
          <input
            type="text"
            placeholder="Search by title, author, or ISBN"
            value={queryString}
            onChange={(e) => handleQueryString(e)}
          />
        </div>
      </div>
      <div className="search-books-results">
        <ol className="books-grid">
          {bookSearchList.map((book, index) => (
            <li key={index}>
              <Book book={book} bookList={bookList} updateBookCategory={updateBookCategory} />
            </li>
          ))}
        </ol>
      </div>
    </div>
  );
};

Search.propTypes = {
  bookList: PropTypes.array.isRequired,
  updateBookCategory: PropTypes.func.isRequired,
};

export default Search;
