import { useState } from 'react';
import './App.css';
import { Routes, Route } from 'react-router-dom';
import { Header } from './componentes/Header';
import { Footer } from './componentes/Footer';
import { Main } from './componentes/Main';
import { ModoAdmin } from './paginas/ModoAdmin';
import { Cartelera } from './paginas/Cartelera';
import { Estrenos } from './paginas/Estrenos';
import { DetallesPelicula } from './paginas/DetallesPelicula';
import { PaginaCompra } from './paginas/PaginaCompra';
import { Perfil } from './paginas/Perfil';
import MisEntradas from './paginas/MisEntradas';
import { PaginaPago } from './paginas/PaginaPago';

function App() {
  return (
    <>
      <Header />
      <Routes>
        <Route path='/' element={<Main />} />
        <Route path='/ModoAdmin' element={<ModoAdmin />} />
        <Route path='/Cartelera' element={<Cartelera />} />
        <Route path='/Estrenos' element={<Estrenos />} />
        <Route path='/Perfil' element={<Perfil />} />
        <Route path='/Entradas' element={<MisEntradas />} />
        <Route path='/DetallesPelicula/:idPelicula' element={<DetallesPelicula />} />
        <Route path='/PaginaCompra/:id' element={<PaginaCompra />} />
        <Route path='/PaginaPago' element={<PaginaPago/>} />
      </Routes>
      <Footer />
    </>
  );
}

export default App;
