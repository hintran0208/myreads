import React from 'react';

const Book = ({ book, updateBookCategory }) => {
  const { title, shelf, authors, imageLinks } = book;

  const changeBookCategory = (e) => {
    if (updateBookCategory) updateBookCategory(book, e.target.value);
  };

  return (
    <div className="book">
      <div className="book-top">
        <div
          className="book-cover"
          style={{
            width: 128,
            height: 193,
            backgroundImage: `url(${imageLinks.thumbnail})`,
          }}
        ></div>
        <div className="book-shelf-changer">
          <select defaultValue={shelf ? shelf : 'none'} onChange={changeBookCategory}>
            <option value="move" disabled>
              Move to...
            </option>
            <option value="currentlyReading">Currently Reading</option>
            <option value="wantToRead">Want to Read</option>
            <option value="read">Read</option>
            <option value="none">None</option>
          </select>
        </div>
      </div>
      <div className="book-title">{title}</div>
      <div className="book-authors">{authors}</div>
    </div>
  );
};

export default Book;
