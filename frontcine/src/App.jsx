import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import { Header } from './componentes/Header'
import { Footer } from './componentes/Footer'
import { Main } from './componentes/Main'
import { ModoAdmin } from './paginas/ModoAdmin';
import { Cartelera } from './paginas/Cartelera';
import { Estrenos } from './paginas/Estrenos';

function App() {
  
  return (
    <>
      

      <Routes>
        <Route path='/' element={<Main/>}/>
        <Route path='/ModoAdmin' element={<ModoAdmin/>} />
        <Route path='/Cartelera' element={<Cartelera/>} />
        <Route path='/Estrenos' element={<Estrenos/>} />
      </Routes>

      <Footer/>
    </>
  )
}

export default App
