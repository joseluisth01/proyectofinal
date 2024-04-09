import React, { useState } from 'react';
import { Routes, Route, Link } from 'react-router-dom';
import '../style/headerestilo.css';

export const Header = () => {
    const [usuarioImg, setUsuarioImg] = useState('/img/usuario.png');
    const [modalOpen, setModalOpen] = useState(false);
    const [nombre, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const usuarioHover = '/img/usuarioverde.png';

    const handleMouseEnter = () => {
        setUsuarioImg(usuarioHover);
    };

    const handleMouseLeave = () => {
        setUsuarioImg('/img/usuario.png');
    };

    const abrirModalInicio = () => {
        setModalOpen(!modalOpen);
    };

    const cerrarModal = () => {
        setModalOpen(false);
    };

    // FETCH REGISTRO USUARIO
    const datosregistro = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ nombre, email, password }),
    };
    const registroUsuario = (e) => {
        e.preventDefault();
        const url = 'http://localhost/proyectofinal/back/public/api/register';
        cerrarModal();
        fetch(url, datosregistro)
            .then((resultado) => resultado.json())
            .then((respuesta) => {
                localStorage.setItem('token', respuesta.token);
                console.log('Token guardado en el localStorage:', respuesta.token);
            })
            .catch((err) => console.log(err));
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
            <button onClick={abrirModalInicio} className='linkusuario' >
                <img className='usuario' src={usuarioImg} onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave} alt="Usuario" />
            </button>

            {modalOpen && (
                <div className="wrapper fondo">
                    <div className="card-switch">
                        <label className="switch">
                            <input type="checkbox" className="toggle" />
                            <span className="slider"></span>
                            <span className="card-side"></span>
                            <div className="flip-card__inner">
                                <div className="flip-card__front">
                                    <button className="close-btn" onClick={cerrarModal}>X</button>
                                    <div className="title">INICIAR SESIÓN</div>
                                    <form className="flip-card__form" action="">
                                        <input className="flip-card__input" name="email" placeholder="Email" type="email" />
                                        <input className="flip-card__input" name="password" placeholder="Contraseña" type="password" />
                                        <button className="flip-card__btn">OK!</button>
                                    </form>
                                </div>
                                <div className="flip-card__back">
                                    <button className="close-btn" onClick={cerrarModal}>X</button>
                                    <div className="title">REGISTRARSE</div>
                                    <form className="flip-card__form" onSubmit={(e) => registroUsuario(e)}>
                                        <input className="flip-card__input" name='name' placeholder="Nombre" type="name" value={nombre} onChange={(e) => setName(e.target.value)} />
                                        <input className="flip-card__input" name="email" placeholder="Email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
                                        <input className="flip-card__input" name="password" placeholder="Contraseña" type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
                                        <button className="flip-card__btn">OK!</button>
                                    </form>
                                </div>
                            </div>
                        </label>
                    </div>
                </div>
            )}

        </header>
    );
};
