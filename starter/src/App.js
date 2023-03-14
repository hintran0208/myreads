import './App.css';
import { useState, useEffect } from 'react';
import Header from './components/Header';
import BookList from './components/BookList';
import * as BooksAPI from './BooksAPI';

function App() {
  const [showSearchPage, setShowSearchpage] = useState(false);
  const [bookList, setBookList] = useState([]);

  useEffect(() => {
    const fetchBook = async () => {
      try {
        const response = await BooksAPI.getAll();
        setBookList(response);
      } catch (error) {
        console.log('Failed to get all books', error);
      }
    };
    fetchBook();
  }, []);

  const updateBookCategory = (selectedBook, selectedCategory) => {
    const newBookList = bookList.map((book) => {
      if (book.id === selectedBook.id) {
        selectedBook.category = selectedCategory;
        return selectedBook;
      }
      return book;
    });

    setBookList(newBookList);
    BooksAPI.update(selectedBook, selectedCategory);
  };

  return (
    <div className="app">
      {showSearchPage ? (
        <div className="search-books">
          <div className="search-books-bar">
            <a className="close-search" onClick={() => setShowSearchpage(!showSearchPage)}>
              Close
            </a>
            <div className="search-books-input-wrapper">
              <input type="text" placeholder="Search by title, author, or ISBN" />
            </div>
          </div>
          <div className="search-books-results">
            <ol className="books-grid"></ol>
          </div>
        </div>
      ) : (
        <div className="list-books">
          <Header />
          <div className="list-books-content">
            <BookList bookList={bookList} updateBookCategory={updateBookCategory} />
          </div>
          <div className="open-search">
            <a onClick={() => setShowSearchpage(!showSearchPage)}>Add a book</a>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
