import React, { useState, useEffect } from 'react';
import { Routes, Route, Link } from 'react-router-dom';
import '../style/headerestilo.css';
import { useNavigate } from 'react-router-dom';

export const Header = () => {
    const [usuarioImg, setUsuarioImg] = useState('/img/usuario.png');
    const [modalOpen, setModalOpen] = useState(false);
    const [nombre, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [nombreUsuario, setNombreUsuario] = useState('');
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const isAdmin = localStorage.getItem('isAdmin') === 'true';
    const navigate = useNavigate();

    useEffect(() => {
        const token = localStorage.getItem('token');
        setIsLoggedIn(!!token);
        if (token) {
            const nombreGuardado = localStorage.getItem('nombre');
            setNombreUsuario(nombreGuardado);
        }
    }, []);

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

    const logout = () => {
        localStorage.clear();
        navigate('/');
        window.location.reload();
    };

    const loginUsuario = (e) => {
        e.preventDefault();
        const url = 'http://localhost/proyectofinal/back/public/api/login';
        cerrarModal();
        fetch(url, datoslogin)
            .then((resultado) => {
                if (!resultado.ok) {
                    throw new Error('Usuario y contraseña incorrectos');
                }
                return resultado.json();
            })
            .then((respuesta) => {
                setNombreUsuario(respuesta.nombre);
                localStorage.setItem('token', respuesta.token);
                localStorage.setItem('isAdmin', respuesta.isAdmin);
                localStorage.setItem('nombre', respuesta.nombre);
                setIsLoggedIn(true); // Usuario ha iniciado sesión
                console.log('Token guardado en el localStorage:', respuesta.token);
                console.log('Nombre del usuario:', respuesta.nombre);
            })
            .catch((err) => {
                console.log(err.message);
                alert(err.message);
            });
    };

    const datoslogin = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
    };

    const registroUsuario = (e) => {
        e.preventDefault();
        const url = 'http://localhost/proyectofinal/back/public/api/register';
        cerrarModal();
        fetch(url, datosregistro)
            .then((resultado) => resultado.json())
            .then((respuesta) => {
                setNombreUsuario(respuesta.nombre);
                localStorage.setItem('token', respuesta.token);
                setIsLoggedIn(true); // Usuario ha iniciado sesión
                console.log('Token guardado en el localStorage:', respuesta.token);
                console.log('Nombre del usuario:', respuesta.nombre);
            })
            .catch((err) => console.log(err));
    };

    const datosregistro = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ nombre, email, password }),
    };

    return (
        <header className='divheader'>
            <a href='/' className="logoheader" data-text="Awesome">
                <span className="actual-text">&nbsp;TAPACOS</span>
                <span aria-hidden="true" className="hover-text">&nbsp;TAPACOS&nbsp;</span>
            </a>

            <select className="selectheader" onChange={() => cambiarTexto()}>
                <option disabled selected value="">Selecciona la ciudad</option>
                <option className='opcion' value="opcion1">TAPACOS CÓRDOBA</option>
                <option className='opcion' value="opcion2">TAPACOS SEVILLA</option>
                <option className='opcion' value="opcion2">TAPACOS MÁLAGA</option>
            </select>

            <Link className="enlacecartelera" to='/Cartelera'>Cartelera</Link>

            {isLoggedIn ? (
                <div className="usuariologin dropdown">
                    <button class="dropbtn"><h2>{nombreUsuario.charAt(0).toUpperCase()}</h2></button>
                    <div class="dropdown-content">
                        <a href="#">Mi perfil</a>
                        <a href="#">Mis entradas</a>
                        {isAdmin && <Link to='/ModoAdmin'>Modo Admin</Link>}
                        <a onClick={logout}>Cerrar sesión</a>
                    </div>
                </div>
            ) : (
                <button onClick={abrirModalInicio} className='linkusuario' >
                    <img className='usuario' src={usuarioImg} onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave} alt="Usuario" />
                </button>
            )}

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
                                    <form className="flip-card__form" onSubmit={(e) => loginUsuario(e)}>
                                        <input className="flip-card__input" name="email" placeholder="Email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
                                        <input className="flip-card__input" name="password" placeholder="Contraseña" type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
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
