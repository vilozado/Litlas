
import { useBookContext } from "../../context/useBookContext"
import type { SavedBook } from "../../types/book";
import './SidebarItem.css'

interface sidebarProps {
  book: SavedBook
}

// ! TODO: create type for tracking status (read, to be read)
export default function SidebarItem({ book }: sidebarProps) {

  const { updateBookStatus } = useBookContext();

  return (
    <>
      <li className="sidebar-item">
        <div className="sidebar-cover">
          <img src={book.thumbnail} alt={book.title} className="sidebar-cover" />
          <div className="btns-overlay">
            <button onClick={() => updateBookStatus(book.id, 'read')}>
              Read
            </button>
          </div>
        </div>
        <div className="sidebar-info">
          <p className="sidebar-title">{book.title}</p>
          <p className="sidebar-author">{book.author}</p>
        </div>
      </li>
    </>
  )
}
