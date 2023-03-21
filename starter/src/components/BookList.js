import { PropTypes } from 'prop-types';
import React from 'react';
import BookShelf from './BookShelf';
import { Link } from 'react-router-dom';

const BookList = ({ shelves, bookList, updateBookCategory }) => {
  return (
    <>
      <div className="list-books-title">
        <h1>MyReads</h1>
      </div>

      <div className="list-books-content">
        {shelves.map((shelf) => (
          <BookShelf
            key={shelf.id}
            shelfName={shelf.shelfName}
            shelfDisplayName={shelf.shelfDisplayName}
            bookList={bookList}
            updateBookCategory={updateBookCategory}
          />
        ))}
      </div>

      <div className="open-search">
        <Link to="/search">
          <button>Add a book</button>
        </Link>
      </div>
    </>
  );
};

BookShelf.propTypes = {
  shelves: PropTypes.array,
  bookList: PropTypes.array.isRequired,
  updateBookCategory: PropTypes.func.isRequired,
};

export default BookList;
