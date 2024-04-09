import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import { Header } from './componentes/Header'
import { Footer } from './componentes/Footer'
import { Main } from './componentes/Main'
import { ModoAdmin } from './paginas/ModoAdmin';

function App() {
  
  return (
    <>
      <Header/>

      <Routes>
        <Route path='/' element={<Main/>}/>
        <Route path='/ModoAdmin' element={<ModoAdmin/>} />
      </Routes>

      <Footer/>
    </>
  )
}

export default App
