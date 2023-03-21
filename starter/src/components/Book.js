import React from 'react';
import { PropTypes } from 'prop-types';
import * as BooksAPI from '../api/BooksAPI';

const Book = ({ book, bookList, updateBookCategory }) => {
  const changeBookCategory = (category) => {
    BooksAPI.update(book, category);
    updateBookCategory(book, category);
  };

  return (
    <div className="book">
      <div className="book-top">
        <div
          className="book-cover"
          style={{
            width: 128,
            height: 193,
            backgroundImage: `url(${book.imageLinks?.thumbnail})`,
          }}
        ></div>
        <div className="book-shelf-changer">
          <select
            value={book?.shelf || bookList.find((b) => b.id === book.id)?.shelf || 'none'}
            onChange={(e) => changeBookCategory(e.target.value)}
          >
            <option value="disabled" disabled>
              Move to...
            </option>
            <option value="currentlyReading">Currently Reading</option>
            <option value="wantToRead">Want to Read</option>
            <option value="read">Read</option>
            <option value="none">None</option>
          </select>
        </div>
      </div>
      <div className="book-title">{book.title}</div>
      <div className="book-authors">{book.authors}</div>
    </div>
  );
};

Book.propTypes = {
  book: PropTypes.object.isRequired,
  bookList: PropTypes.array.isRequired,
  updateBookCategory: PropTypes.func.isRequired,
};

export default Book;
