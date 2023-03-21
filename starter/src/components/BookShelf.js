import React from 'react';
import Book from './Book';
import { PropTypes } from 'prop-types';

const BookShelf = ({ shelfName, shelfDisplayName, bookList, updateBookCategory }) => {
  const filteredShelf = bookList.filter((book) => book.shelf === shelfName);

  return (
    <div className="bookshelf">
      <h2 className="bookshelf-title">{shelfDisplayName}</h2>
      <div className="bookshelf-books">
        <ol className="books-grid">
          {filteredShelf.map((book) => (
            <li key={book.id}>
              <Book book={book} bookList={bookList} updateBookCategory={updateBookCategory} />
            </li>
          ))}
        </ol>
      </div>
    </div>
  );
};

BookShelf.propTypes = {
  shelfName: PropTypes.string.isRequired,
  shelfDisplayName: PropTypes.string.isRequired,
  bookList: PropTypes.array.isRequired,
  updateBookCategory: PropTypes.func.isRequired,
};

export default BookShelf;
