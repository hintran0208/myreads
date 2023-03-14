import React from 'react';
import BookShelf from './BookShelf';

const BookList = ({ bookList }) => {
  const currentlyReading = bookList.filter((book) => book.category === 'currentlyReading');
  const wantToRead = bookList.filter((book) => book.category === 'wantToRead');
  const read = bookList.filter((book) => book.category === 'read');

  return (
    <>
      <BookShelf title="Currently Reading" books={currentlyReading} />
      <BookShelf title="Want To Read" books={wantToRead} />
      <BookShelf title="Read" books={read} />
    </>
  );
};

export default BookList;
