import './App.css'
import { useEffect, useState } from 'react';
import Nav from './components/Nav/Nav';
import Map from './components/Map/Map';
import Hero from './components/Hero/Hero';

function App() {
  return (
    <>
      <Nav />
      <Hero />
      <Map />
    </>
  )
}

export default App
