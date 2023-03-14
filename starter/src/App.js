import './App.css';
import { useState } from 'react';
import Header from './components/Header';
import BookList from './components/BookList';

function App() {
  const [showSearchPage, setShowSearchpage] = useState(false);
  const [bookList, setBookList] = useState([
    {
      id: 1,
      title: 'To Kill a Mockingbird',
      category: 'currentlyReading',
      author: 'Harper Lee',
      imageURL:
        'http://books.google.com/books/content?id=PGR2AwAAQBAJ&printsec=frontcover&img=1&zoom=1&imgtk=AFLRE73-GnPVEyb7MOCxDzOYF1PTQRuf6nCss9LMNOSWBpxBrz8Pm2_mFtWMMg_Y1dx92HT7cUoQBeSWjs3oEztBVhUeDFQX6-tWlWz1-feexS0mlJPjotcwFqAg6hBYDXuK_bkyHD-y&source=gbs_api',
    },
    {
      id: 2,
      title: 'To Kill a Mockingbird',
      category: 'wantToRead',
      author: 'Harper Lee',
      imageURL:
        'http://books.google.com/books/content?id=PGR2AwAAQBAJ&printsec=frontcover&img=1&zoom=1&imgtk=AFLRE73-GnPVEyb7MOCxDzOYF1PTQRuf6nCss9LMNOSWBpxBrz8Pm2_mFtWMMg_Y1dx92HT7cUoQBeSWjs3oEztBVhUeDFQX6-tWlWz1-feexS0mlJPjotcwFqAg6hBYDXuK_bkyHD-y&source=gbs_api',
    },
    {
      id: 3,
      title: 'To Kill a Mockingbird',
      category: 'wantToRead',
      author: 'Harper Lee',
      imageURL:
        'http://books.google.com/books/content?id=PGR2AwAAQBAJ&printsec=frontcover&img=1&zoom=1&imgtk=AFLRE73-GnPVEyb7MOCxDzOYF1PTQRuf6nCss9LMNOSWBpxBrz8Pm2_mFtWMMg_Y1dx92HT7cUoQBeSWjs3oEztBVhUeDFQX6-tWlWz1-feexS0mlJPjotcwFqAg6hBYDXuK_bkyHD-y&source=gbs_api',
    },
    {
      id: 4,
      title: 'To Kill a Mockingbird',
      category: 'read',
      author: 'Harper Lee',
      imageURL:
        'http://books.google.com/books/content?id=PGR2AwAAQBAJ&printsec=frontcover&img=1&zoom=1&imgtk=AFLRE73-GnPVEyb7MOCxDzOYF1PTQRuf6nCss9LMNOSWBpxBrz8Pm2_mFtWMMg_Y1dx92HT7cUoQBeSWjs3oEztBVhUeDFQX6-tWlWz1-feexS0mlJPjotcwFqAg6hBYDXuK_bkyHD-y&source=gbs_api',
    },
  ]);

  const updateBookCategory = (selectedBook, selectedCategory) => {
    const newBookList = bookList.map((book) => {
      if (book.id === selectedBook.id) {
        selectedBook.category = selectedCategory;
        return selectedBook;
      }
      return book;
    });

    setBookList(newBookList);
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
