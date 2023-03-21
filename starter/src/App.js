import { useEffect, useState } from 'react';
import { Route, Routes } from 'react-router-dom';
import * as BooksAPI from './api/BooksAPI';
import BookList from './components/BookList';
import Search from './components/Search';
import './styles/App.css';
import Error from './components/Error';

function App() {
  const [bookList, setBookList] = useState([]);

  const shelves = [
    { id: 1, shelfName: 'currentlyReading', shelfDisplayName: 'Current Reading' },
    { id: 2, shelfName: 'wantToRead', shelfDisplayName: 'Want to Read' },
    { id: 3, shelfName: 'read', shelfDisplayName: 'Read' },
  ];

  useEffect(() => {
    const fetchBook = async () => {
      try {
        const books = await BooksAPI.getAll();
        setBookList(books);
      } catch (error) {
        console.log('Failed to get all books', error);
      }
    };
    fetchBook();
  }, []);

  const updateBookCategory = (book, category) => {
    BooksAPI.update(book.id, category).then(() => {
      book.shelf = category;
      setBookList(bookList.filter((b) => b.id !== book.id).concat(book));
    });
  };

  return (
    <div className="app">
      <Routes>
        <Route
          path="/search"
          element={<Search bookList={bookList} updateBookCategory={updateBookCategory} />}
        />

        <Route
          path="/"
          element={
            <div className="list-books">
              <BookList
                shelves={shelves}
                bookList={bookList}
                updateBookCategory={updateBookCategory}
              />
            </div>
          }
        />

        <Route path="*" element={<Error />} />
      </Routes>
    </div>
  );
}

export default App;
