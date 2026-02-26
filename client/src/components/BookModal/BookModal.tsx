import type { Modal } from "../../types/modal"
import { createPortal } from "react-dom"
import './BookModal.css'
import { useState, useEffect } from "react";

export default function BookModal(props: Modal) {

  const [currentIndex, setCurrentIndex] = useState(0);

  const randomBook = Math.floor(Math.random() * props.books.length);
  const currentBook = props.books[currentIndex];

  useEffect(() => {
    setCurrentIndex(randomBook)
  }, [props.country]);


  const handleNext = () => {
    console.log('books length: ', props.books.length);
    console.log('current index: ', currentIndex);
    console.log('currentBook:', currentBook)

    setCurrentIndex(prev => (prev + 1) % props.books.length)
  }

  if (!props.open) return null;

  return createPortal(
    <div className="modal-overlay" onClick={props.onClose}>
      <div className="modal-content" onClick={(e => e.stopPropagation())}>
        <div className="modal-head">
          <h1>{props.country}</h1>
          <button type="button" id="close-btn" onClick={props.onClose}>
            X
          </button>
        </div>
        <div className="modal-body">
          {
            currentBook && (
              <>
                <img src={currentBook.thumbnail} className="book-cover" />
                <div className="book-content">
                  <p id="book-title">{currentBook.title}</p>
                  <p>{currentBook.author}</p>
                  <p>{currentBook.publishedDate}</p>
                  <p id="book-description">{currentBook.description}</p>
                </div>
              </>
            )
          }
        </div>
        <div className="btn-container">
          <button type="button" id="tbr-btn">
            Add to My Reading List
          </button>
          <button type="button" id="next-btn" onClick={handleNext}>
            Next
          </button>
        </div>
      </div>
    </div>,
    document.body
  );
}
