import './BookModal.css'
import { createPortal } from "react-dom"
import { useState, useEffect } from "react";
import { useBookContext } from "../../context/useBookContext";

interface Modal {
  open: boolean,
  onClose: () => void,
}

export default function BookModal({ open, onClose }: Modal) {

  const { selectedBooks, selectedCountry, addToReadingList } = useBookContext();
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    if (open && selectedBooks.length) {
      setCurrentIndex(Math.floor(Math.random() * selectedBooks.length)); //how could I deal with cascading rerenders?
    }
  }, [open, selectedBooks.length]);

  const currentBook = selectedBooks[currentIndex];

  const handleNext = () => {
    if (!selectedBooks.length) return;
    setCurrentIndex(prev => (prev + 1) % selectedBooks.length)
  }

  if (!open) return null;

  return createPortal(
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e => e.stopPropagation())}>
        <div className="modal-head">
          <h1>{selectedCountry}</h1>
          <button type="button" id="close-btn" onClick={onClose}>
            X
          </button>
        </div>
        <div className="modal-body">
          {
            currentBook && (
              <div key={currentBook.id} className='book-transition'>
                <img src={currentBook.thumbnail} className="book-cover" />
                <div className="book-content">
                  <p id="book-title">{currentBook.title}</p>
                  <p className="author">{currentBook.author}</p>
                  <p className="publish-date">{currentBook.publishedDate}</p>
                  <p id="book-description">
                    <span className='genre'>{currentBook.categories?.map(category => (
                      <span key={category}>{category}</span>
                    ))}</span>
                    {currentBook.description}
                  </p>
                </div>
              </div>
            )
          }
        </div>
        <div className="btn-container">
          <button className="add-btn" onClick={() => currentBook && addToReadingList(currentBook)}>
            ★ Save
          </button>
          <button className="next-btn" onClick={handleNext}>
            Next
          </button>
        </div>
      </div>
    </div>,
    document.body
  );
}
