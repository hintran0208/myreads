import React from 'react';
import Book from './Book';
import { PropTypes } from 'prop-types';

const BookShelf = ({ books, shelf, updateBookCategory }) => {
  return (
    <div className="bookshelf">
      <h2 className="bookshelf-title">{shelf}</h2>
      <div className="bookshelf-books">
        <ol className="books-grid">
          {books.map((book, index) => (
            <li key={index}>
              <Book book={book} updateBookCategory={updateBookCategory} />
            </li>
          ))}
        </ol>
      </div>
    </div>
  );
};

BookShelf.propTypes = {
  books: PropTypes.array.isRequired,
  shelf: PropTypes.string.isRequired,
  updateBookCategory: PropTypes.func.isRequired,
};

export default BookShelf;
