import React, { useEffect, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const hamburguesa = '/img/hamburguesa.png';
const hotdog = '/img/hotdog.png';
const cubo1 = '/img/cubo1.png';
const tapaquitos = '/img/tapaquitos.png';

import '../style/paginaPago.css';
import ScrollToTop from '../componentes/ScrollToTop';

export const PaginaPago = () => {
    const location = useLocation();
    const { id, seleccionados = [] } = location.state || {};  // Proporciona un valor predeterminado

    const [email, setEmail] = useState('');
    const [tarjeta, setTarjeta] = useState('');
    const [aceptar, setAceptar] = useState(false);
    const [totalEntradas, setTotalEntradas] = useState(0); // Estado para el total de las entradas
    const [productos, setProductos] = useState([]); // Estado para los productos añadidos
    const [showModal, setShowModal] = useState(false); // Estado para mostrar el modal
    const [nombre, setNombre] = useState('');
    const [apellidos, setApellidos] = useState('');
    const [matricula, setMatricula] = useState('');
    const [fechaCaducidad, setFechaCaducidad] = useState('');
    const [cvv, setCvv] = useState('');
    const token = localStorage.getItem('token');
    const isLoggedIn = !!token;
    const navigate = useNavigate();

    useEffect(() => {
        const total = seleccionados.length * 10;
        setTotalEntradas(total);
    }, [seleccionados]);

    useEffect(() => {
        if (showModal) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'auto';
        }
    }, [showModal]);

    const handlePago = async () => {
        window.scrollTo(0, 0);
        setShowModal(true);
    };

    const handleAddProducto = (nombre, precio) => {
        setProductos((prevProductos) => [...prevProductos, { nombre, precio }]);
        <ScrollToTop />
    };

    const cerrarModal = () => {
        setShowModal(false);
    };

    const handleReservar = async () => {
        try {
            const userIdResponse = await fetch('https://proyecto6.medacarena.com.es/back/public/api/getId', {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });
            const userIdData = await userIdResponse.json();
            const fetchedUserId = userIdData.id;

            const response = await fetch('https://proyecto6.medacarena.com.es/back/public/api/reservarAsientos', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify({ 
                    idPelicula: id, 
                    asientosSeleccionados: seleccionados, 
                    usuarioId: fetchedUserId,
                    nombre: nombre,
                    apellidos: apellidos,
                    email: email,
                    matricula: matricula,
                    tarjeta: tarjeta,
                    fechaCaducidad: fechaCaducidad,
                    cvv: cvv,
                    productos: productos
                }),
            });
            const responseData = await response.json();
            
            if (response.ok) {
                cerrarModal();
                toast.success('Reserva realizada correctamente');
                if (isLoggedIn) {
                    navigate('https://proyecto6.medacarena.com.es/Entradas', { state: { message: 'Reserva realizada correctamente' } });
                } else {
                    navigate('https://proyecto6.medacarena.com.es/', { state: { message: 'Reserva realizada correctamente' } });
                }
            } else {
                toast.warn(responseData.error || 'Ocurrió un error al reservar los asientos');
                cerrarModal();
            }
        } catch (error) {
            toast.error('Error al realizar la reserva. Inténtelo de nuevo más tarde.');
            cerrarModal();
        }
    };

    const isFormValid = () => {
        return (
            nombre.trim() !== '' &&
            apellidos.trim() !== '' &&
            email.trim() !== '' &&
            matricula.trim() !== '' &&
            tarjeta.trim() !== '' &&
            fechaCaducidad.trim() !== '' &&
            cvv.trim() !== ''
        );
    };

    const totalProductos = productos.reduce((acc, producto) => acc + producto.precio, 0);
    const total = totalEntradas + totalProductos + 1; // Suma el gasto de gestión

    return (
        <div className='fondo'>
            <div className={`overlay ${showModal ? 'active' : ''}`}></div>
            <div className="flex4">
                <div className='bloqueizq_comida'>
                    <div className='preguntacomida'>
                        <h1>¿Quieres añadir alguno de estos productos a tu compra?</h1>
                    </div>
                    <div className='comidas'>
                        <div className="comida1">
                            <div className="flex3">
                                <div className='imgcomida'>
                                    <img src={hamburguesa} alt='Garfield Promoción' className='comida-img' />
                                </div>
                                <div className='detallescomida'>
                                    <h2 className='nombrecomida'>Menú Burger</h2>
                                    <p className="precioactualcomida">PRECIO ACTUAL 10,00€</p>
                                    <p className="precioanteriorcomida">Precio anterior 13,00€</p>
                                    <p className='descripcioncomida'>
                                        ¡Precio exclusivo WEB! A elegir entre nuestras hamburguesas (Rita burger, Classic burger, Crispy chicken o Veggie burger) con patatas y bebidas incluida.
                                    </p>
                                    <button className="detalles-pelicula-boton2 mb-6" onClick={() => handleAddProducto('Menú Burger', 10)}>AÑADIR</button>
                                </div>
                            </div>
                        </div>

                        <div className="comida1">
                            <div className="flex3">
                                <div className='imgcomida'>
                                    <img src={hotdog} alt='Garfield Promoción' className='comida-img' />
                                </div>
                                <div className='detallescomida'>
                                    <h2 className='nombrecomida'>Hot Dog</h2>
                                    <p className="precioactualcomida">PRECIO ACTUAL 8,00€</p>
                                    <p className="precioanteriorcomida">Precio anterior 10,00€</p>
                                    <p className='descripcioncomida'>
                                        ¡Precio exclusivo WEB! A elegir entre uno de nuestros hot dogs, bebidas incluida. Opción sin gluten disponible
                                    </p>
                                    <button className="detalles-pelicula-boton2 mb-6" onClick={() => handleAddProducto('Hot Dog', 8)}>AÑADIR</button>
                                </div>
                            </div>
                        </div>

                        <div className="comida1">
                            <div className="flex3">
                                <div className='imgcomida'>
                                    <img src={cubo1} alt='Garfield Promoción' className='comida-img' />
                                </div>
                                <div className='detallescomida'>
                                    <h2 className='nombrecomida'>Combo Tapacos</h2>
                                    <p className="precioactualcomida">PRECIO ACTUAL 8,00€</p>
                                    <p className="precioanteriorcomida">Precio anterior 10,00€</p>
                                    <p className='descripcioncomida'>
                                        Palomitero de edición limitada de Tapacos Autocinemas + palomitas medianas + 2 refrescos.
                                    </p>
                                    <button className="detalles-pelicula-boton2 mb-6" onClick={() => handleAddProducto('Combo Tapacos', 8)}>AÑADIR</button>
                                </div>
                            </div>
                        </div>

                        <div className="comida1">
                            <div className="flex3">
                                <div className='imgcomida'>
                                    <img src={tapaquitos} alt='Garfield Promoción' className='comida-img' />
                                </div>
                                <div className='detallescomida'>
                                    <h2 className='nombrecomida'>Combo Tapaquitos</h2>
                                    <p className="precioactualcomida">PRECIO ACTUAL 5,00€</p>
                                    <p className="precioanteriorcomida">Precio anterior 7,00€</p>
                                    <p className='descripcioncomida'>
                                        Palomitas pequeñas + Refrescos de 0,5 l. Con tu pre-compra no tendrás un coste adicional por servicio de entrega a coche.
                                    </p>
                                    <button className="detalles-pelicula-boton2 mb-6" onClick={() => handleAddProducto('Combo Tapaquitos', 5)}>AÑADIR</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="bloquedrchacomida">
                    <div className="interior">
                        <div className='preguntacomida'>
                            <h1>Productos</h1>
                        </div>
                        <div className="flex5">
                            <div className="">
                                <div className="">
                                    <div className='flex'>
                                        <p>Entradas: {totalEntradas}€</p>
                                    </div>
                                </div>
                            </div>
                            {productos.map((producto, index) => (
                                <div key={index} className='flex'>
                                    <p>{producto.nombre}: {producto.precio}€</p>
                                </div>
                            ))}
                            <div className='flex'>
                                <p>Gastos de gestión: 1€</p>
                            </div>
                            <hr className='hrlistas'/>
                            <p className='descripcioncomida'>
                                TOTAL: {total}€
                            </p>
                        </div>
                    </div>
                    <button className="detalles-pelicula-boton mb-6" onClick={handlePago}>CONTINUAR</button>
                </div>
            </div>
            {showModal && (
                <div className="modal">
                    <div className="login-box">
                        <button className="close-btn" onClick={cerrarModal}>X</button>
                        <form>
                            <div className="user-box">
                                <input className='input2' type="text" required value={nombre} onChange={(e) => setNombre(e.target.value)} />
                                <label>Nombre</label>
                            </div>
                            <div className="user-box">
                                <input className='input2' type="text" required value={apellidos} onChange={(e) => setApellidos(e.target.value)} />
                                <label>Apellidos</label>
                            </div>
                            <div className="user-box">
                                <input className='input2' type="email" required value={email} onChange={(e) => setEmail(e.target.value)} />
                                <label>Correo</label>
                            </div>
                            <div className="user-box">
                                <input className='input2' type="text" required value={matricula} onChange={(e) => setMatricula(e.target.value)} />
                                <label>Matrícula</label>
                            </div>
                            <div className="user-box">
                                <input className='input2' type="text" required value={tarjeta} onChange={(e) => setTarjeta(e.target.value)} />
                                <label>Num de Tarjeta</label>
                            </div>
                            <div className="flex">
                                <div className="user-box mr-3">
                                    <input className='input2' type="text" required value={fechaCaducidad} onChange={(e) => setFechaCaducidad(e.target.value)} />
                                    <label>Fecha de Caducidad</label>
                                </div>
                                <div className="user-box">
                                    <input className='input2' type="text" required value={cvv} onChange={(e) => setCvv(e.target.value)} />
                                    <label>CVV</label>
                                </div>
                            </div>
                            <div className="user-box">
                                <div className="flex">
                                    <input type="checkbox" className="ui-checkbox" />
                                    <p className="sisi">Recordar tarjeta</p>
                                </div>
                            </div>
                            <center>
                                <a href="#" onClick={handleReservar} className={`comprar-link ${isFormValid() ? '' : 'disabled-link'}`}>
                                    COMPRAR
                                    <span></span>
                                </a>
                            </center>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
};

export default PaginaPago;
