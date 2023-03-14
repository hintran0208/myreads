import React from 'react';
import BookShelf from './BookShelf';

const BookList = ({ bookList, updateBookCategory }) => {
  const currentlyReading = bookList.filter((book) => book.shelf === 'currentlyReading');
  const wantToRead = bookList.filter((book) => book.shelf === 'wantToRead');
  const read = bookList.filter((book) => book.shelf === 'read');

  return (
    <>
      <BookShelf
        title="Currently Reading"
        books={currentlyReading}
        updateBookCategory={updateBookCategory}
      />
      <BookShelf title="Want To Read" books={wantToRead} updateBookCategory={updateBookCategory} />
      <BookShelf title="Read" books={read} updateBookCategory={updateBookCategory} />
    </>
  );
};

export default BookList;
