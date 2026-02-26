import './App.css'
import Nav from './components/Nav/Nav';
import Map from './components/Map/Map';
import SidebarList from './components/SidebarList/SidebarList';
import { useState } from 'react';

function App() {
  const [showSidebar, setShowsideBar] = useState(false);

  return (
    <>
      <Nav onMyListClick={() => setShowsideBar(toggle => !toggle)} />
      <div className='app-content'>
        <Map />
        {showSidebar && <SidebarList />}
      </div>
    </>
  )
}

export default App
