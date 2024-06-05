import '../style/footerstyle.css';
import React, { useState, useEffect } from 'react';
import { Routes, Route, Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

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
          <Link to='/Cartelera' className='linkfooter'>Cartelera</Link>
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
            <Link to='/Cartelera' className='linkavisoslegales'>Aviso Legal</Link>
            <p>|</p>
            <Link to='/Cartelera' className='linkavisoslegales'>Política de Privacidad</Link>
            <p>|</p>
            <Link to='/Cartelera' className='linkavisoslegales'>Política de Cookies</Link>
        </div>
      <div className="partners">
        <Link to='/Cartelera'>Copyright © 2024 TAPACO CINEMAS. Todos los derechos reservados.</Link>
      </div>
    </div>
  )
}
