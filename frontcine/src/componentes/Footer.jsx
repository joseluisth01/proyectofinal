import React from 'react'
import '../style/footerstyle.css';

export const Footer = () => {
  return (
    <div className='divfooter'>
      <div className="bloque1footer">
        <div className="nuestroscines">
          <h3>NUESTROS CINES</h3>
          <p className='linkfooter'>Tapacos Córdoba</p>
          <p className='linkfooter'>Tapacos Sevilla</p>
          <p className='linkfooter'>Tapacos Málaga</p>
          <p className='linkfooter'>Proximamente...</p>
        </div>
        <div className='infotapacos'>
          <h3>TAPACOS CINEMAS</h3>
          <p className='linkfooter'>Cartelera</p>
          <p className='linkfooter'>Ofertas</p>
          <p className='linkfooter'>VOSE</p>
          <p className='linkfooter'>Tarjeta Socio Tapacos</p>
        </div>
        <div className='acercadenosotros'>
          <h3>ACERCA DE NOSOTROS</h3>
          <p className='linkfooter'>Contacto</p>
          <p className='linkfooter'>Quienes somos</p>
          <p className='linkfooter'>Preguntas frecuentes</p>
          <p className='linkfooter'>Política de devoluciones</p>
        </div>
      </div>
      <div class="avisoslegales_footer">
            <p className='linkavisoslegales'>Aviso Legal</p>
            <p>|</p>
            <p className='linkavisoslegales'>Política de Privacidad</p>
            <p>|</p>
            <p className='linkavisoslegales'>Política de Cookies</p>
        </div>
      <div className="partners">
        <p>Copyright © 2024 TAPACO CINEMAS. Todos los derechos reservados.</p>
      </div>
    </div>
  )
}
