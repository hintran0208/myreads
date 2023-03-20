import './App.css';
import { useState, useEffect } from 'react';
import Header from './components/Header';
import BookList from './components/BookList';
import * as BooksAPI from './BooksAPI';
import Book from './components/Book';

function App() {
  const [showSearchPage, setShowSearchpage] = useState(false);
  const [bookList, setBookList] = useState([]);
  const [queryString, setQueryString] = useState('');
  const [searchBooks, setSearchBooks] = useState([]);
  const [mergedBooks, setMergedBooks] = useState([]);
  const [mapOfIdToBooks, setMapOfIdToBooks] = useState(new Map());

  useEffect(() => {
    const fetchBook = async () => {
      try {
        const bookData = await BooksAPI.getAll();
        setBookList(bookData);
        setMapOfIdToBooks(createMapOfBooks(bookData));
      } catch (error) {
        console.log('Failed to get all books', error);
      }
    };
    fetchBook();
  }, []);

  useEffect(() => {
    let isActive = true;

    const fetchSearchBook = async () => {
      try {
        const searchBookData = await BooksAPI.search(queryString);
        if (searchBookData.error) {
          setSearchBooks([]);
        } else {
          if (isActive) {
            console.log(searchBookData);
            setSearchBooks(searchBookData);
          }
        }
      } catch (error) {
        console.log('Failed to get search books', error);
      }
    };

    if (queryString) fetchSearchBook();

    return () => {
      isActive = false;
      setSearchBooks([]);
      console.log('UNMOUNT DATA FROM', queryString);
    };
  }, [queryString]);

  useEffect(() => {
    const combined = searchBooks.map((book) => {
      if (mapOfIdToBooks.has(book.id)) {
        return mapOfIdToBooks.get(book.id);
      } else {
        return book;
      }
    });
    setMergedBooks(combined);
  }, [searchBooks]);

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

  const createMapOfBooks = (books) => {
    const map = new Map();
    books.map((book) => map.set(book.id, book));
    return map;
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
              <input
                type="text"
                placeholder="Search by title, author, or ISBN"
                value={queryString}
                onChange={(e) => setQueryString(e.target.value)}
              />
            </div>
          </div>
          <div className="search-books-results">
            <ol className="books-grid">
              {mergedBooks.map((book, index) => (
                <li key={index}>
                  <Book book={book} updateBookCategory={updateBookCategory} />
                </li>
              ))}
            </ol>
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
