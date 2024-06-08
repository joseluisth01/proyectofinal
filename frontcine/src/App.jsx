import './App.css';
import { Routes, Route } from 'react-router-dom';
import { Header } from './componentes/Header';
import { Footer } from './componentes/Footer';
import { Main } from './componentes/Main';
import { ModoAdmin } from './paginas/ModoAdmin';
import { Cartelera } from './paginas/Cartelera';
import { Estrenos } from './paginas/Estrenos';
import { DetallesPelicula } from './paginas/DetallesPelicula';
import PaginaCompra from './paginas/PaginaCompra'; // Asegúrate de que esta ruta es correcta
import { Perfil } from './paginas/Perfil';
import MisEntradas from './paginas/MisEntradas';
import { PaginaPago } from './paginas/PaginaPago';
import AvisoLegal from './paginas/AvisoLegal';
import PoliticaCookies from './paginas/PoliticaCookies';
import PoliticaPrivacidad from './paginas/PoliticaPrivacidad';
import ScrollToTop from './componentes/ScrollToTop';

import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function App() {
  return (
    <>
      <Header />
      <ScrollToTop />
      <ToastContainer />
      <Routes>
        <Route path='/' element={<Main />} />
        <Route path='/ModoAdmin' element={<ModoAdmin />} />
        <Route path='/Cartelera' element={<Cartelera />} />
        <Route path='/Estrenos' element={<Estrenos />} />
        <Route path='/Perfil' element={<Perfil />} />
        <Route path='/Entradas' element={<MisEntradas />} />
        <Route path='/DetallesPelicula/:idPelicula' element={<DetallesPelicula />} />
        <Route path='/PaginaCompra/:id' element={<PaginaCompra />} />
        <Route path='/PaginaPago' element={<PaginaPago />} />
        <Route path='/AvisoLegal' element={<AvisoLegal />} />
        <Route path='/PoliticaCookies' element={<PoliticaCookies />} />
        <Route path='/PoliticaPrivacidad' element={<PoliticaPrivacidad />} />
      </Routes>
      <Footer />
    </>
  );
}

export default App;
