import './Nav.css';
import logo from '../../assets/logo.png'

interface NavProps {
  onMyListClick: () => void
}

export default function Nav({ onMyListClick }: NavProps) {
  return (
    <>
      <nav className='navbar'>
        <img src={logo} className='logo'></img>
        <div className='nav-left'>
          <button onClick={onMyListClick} className='nav-links'>Reading List</button>
        </div>
      </nav>
    </>
  )
}