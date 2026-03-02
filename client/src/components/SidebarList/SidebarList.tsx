import './SidebarList.css';
import { useBookContext } from '../../context/useBookContext';
import SidebarItem from '../SidebarItem/SidebarItem';

export default function SidebarList() {
  const { readingList } = useBookContext();

  return (
    <div className='sidebar'>
      {readingList.length === 0 ? (
        <div className='sidebar-placeholder'>
          <p>Your reading list is empty.</p>
          <p>Add a book to display it here.</p>
        </div>

      ) : (
        <>
          {/* <select className='sidebar-filter'>
          </select> */}
          <ul className="sidebar-list">
            {readingList.map((book) => (
              <SidebarItem key={book.id} book={book} />
            ))}
          </ul>
        </>
      )
      }
    </div>
  )
}
