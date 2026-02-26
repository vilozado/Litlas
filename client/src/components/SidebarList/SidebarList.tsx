import './SidebarList.css';
import { useBookContext } from '../../context/bookContext';

export default function SidebarList() {
  const { readingList } = useBookContext();

  return (
    <div className='sidebar'>
      <h2>My List</h2>

      {readingList.length === 0 ? (
        <p>Books you save will appear here.</p>
      ) : (
        <ul className="sidebar-list">
          {readingList.map((book) => (
            <li key={book.id} className="sidebar-item">
              <img src={book.thumbnail} alt={book.title} className="sidebar-cover" />
              <div className="sidebar-info">
                <p className="sidebar-title">{book.title}</p>
                <p className="sidebar-author">{book.author}</p>
              </div>
            </li>
          ))}
        </ul>
      )
      }


    </div>
  )
}
