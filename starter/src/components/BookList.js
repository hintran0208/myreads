import React from 'react';
import BookShelf from './BookShelf';

const BookList = ({ bookList, updateBookCategory }) => {
  const currentlyReading = bookList.filter((book) => book.category === 'currentlyReading');
  const wantToRead = bookList.filter((book) => book.category === 'wantToRead');
  const read = bookList.filter((book) => book.category === 'read');

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
