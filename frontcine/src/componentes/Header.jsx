import React, { useState } from 'react';
import '../style/headerestilo.css';


export const Header = () => {
    const [usuarioImg, setUsuarioImg] = useState('/img/usuario.png');
    const usuarioHover = '/img/usuarioverde.png';

    const handleMouseEnter = () => {
        setUsuarioImg(usuarioHover);
    };

    const handleMouseLeave = () => {
        setUsuarioImg('/img/usuario.png');
    };

    return (
        <header className='divheader'>
            <button className="logoheader" data-text="Awesome">
                <span className="actual-text">&nbsp;TAPACOS&nbsp;</span>
                <span aria-hidden="true" className="hover-text">&nbsp;TAPACOS&nbsp;</span>
            </button>

            <select className="selectheader" onChange={() => cambiarTexto()}>
                <option disabled selected value="">Selecciona la ciudad</option>
                <option className='opcion' value="opcion1">TAPACOS CÓRDOBA</option>
                <option className='opcion' value="opcion2">TAPACOS SEVILLA</option>
                <option className='opcion' value="opcion2">TAPACOS MÁLAGA</option>
            </select>

            <img 
                className='usuario' 
                src={usuarioImg} 
                onMouseEnter={handleMouseEnter} 
                onMouseLeave={handleMouseLeave} 
                alt="Usuario" 
            />
        </header>
    )
}
