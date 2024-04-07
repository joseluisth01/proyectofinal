import React from 'react'
import '../style/footerstyle.css';

export const Footer = () => {
  return (
    <div className='divfooter'>
        <div className="nuestroscines">
            <h3>NUESTROS CINES</h3>
            <p>Tapacos Córdoba</p>
            <p>Tapacos Sevilla</p>
            <p>Tapacos Málaga</p>
            <p>Proximamente...</p>
        </div>
        <div className='infotapacos'>
            <h3>TAPACOS CINEMAS</h3>
            <p>Sesiones</p>
            <p>Ofertas</p>
            <p>Versiones VOSE</p>
            <p>Tarjeta Tapacos</p>
            <p>Proximamente</p>
        </div>
        <div className='acercadenosotros'>
            <h3>ACERCA DE NOSOTROS</h3>
            <p>Contacto</p>
            <p>Preguntas frecuentes</p>
            <p>Política de devoluciones</p>
            <p>Política de privacidad</p>
            <p>Política de Cookies</p>
        </div>
    </div>
  )
}
