import './Nav.css';

export default function Nav({ onMyListClick }) {
  return (
    <>
      <nav className='navbar'>
        <h1 className='title'>L I T L A S</h1>
        <button onClick={onMyListClick} className='my-list-btn'>My List</button>
      </nav>
    </>
  )
}