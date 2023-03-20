import React from 'react';
import BookShelf from './BookShelf';
import { PropTypes } from 'prop-types';

const BookList = ({ bookList, updateBookCategory }) => {
  const currentlyReading = bookList.filter((book) => book.shelf === 'currentlyReading');
  const wantToRead = bookList.filter((book) => book.shelf === 'wantToRead');
  const read = bookList.filter((book) => book.shelf === 'read');

  return (
    <>
      <BookShelf
        shelf="Currently Reading"
        books={currentlyReading}
        updateBookCategory={updateBookCategory}
      />
      <BookShelf shelf="Want To Read" books={wantToRead} updateBookCategory={updateBookCategory} />
      <BookShelf shelf="Read" books={read} updateBookCategory={updateBookCategory} />
    </>
  );
};

BookShelf.propTypes = {
  bookList: PropTypes.array.isRequired,
  updateBookCategory: PropTypes.func.isRequired,
};

export default BookList;
