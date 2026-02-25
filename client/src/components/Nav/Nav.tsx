import './Nav.css';

export default function Nav() {
  return (
    <>
      <nav className='navbar'>
        <p className='title'>LITLAS</p>
        <a href='/login' className='login-link'>Log In</a>
      </nav>
    </>
  )
}