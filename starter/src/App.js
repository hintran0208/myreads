import { useEffect, useState } from 'react';
import { Link, Route, Routes } from 'react-router-dom';
import { useDebounce } from 'use-debounce';
import './styles/App.css';
import * as BooksAPI from './api/BooksAPI';
import Book from './components/Book';
import BookList from './components/BookList';

function App() {
  const [bookList, setBookList] = useState([]);
  const [queryString, setQueryString] = useState('');
  const [searchBooks, setSearchBooks] = useState([]);
  const [mergedBooks, setMergedBooks] = useState([]);
  const [mapOfIdToBooks, setMapOfIdToBooks] = useState(new Map());
  const [query] = useDebounce(queryString, 200);

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
        const searchBookData = await BooksAPI.search(query);
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

    if (query) fetchSearchBook();

    return () => {
      isActive = false;
      setSearchBooks([]);
      console.log('UNMOUNT DATA FROM', query);
    };
  }, [query]);

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

    if (!mapOfIdToBooks.has(selectedBook.id)) {
      selectedBook.shelf = selectedCategory;
      newBookList.push(selectedBook);
    }

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
      <Routes>
        <Route
          path="/search"
          element={
            <div className="search-books">
              <div className="search-books-bar">
                <Link to="/">
                  <button className="close-search">Close</button>
                </Link>
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
          }
        ></Route>

        <Route
          path="/"
          element={
            <div className="list-books">
              <div className="list-books-title">
                <h1>MyReads</h1>
              </div>
              <div className="list-books-content">
                <BookList bookList={bookList} updateBookCategory={updateBookCategory} />
              </div>
              <div className="open-search">
                <Link to="/search">
                  <button>Add a book</button>
                </Link>
              </div>
            </div>
          }
        ></Route>
      </Routes>
    </div>
  );
}

export default App;
