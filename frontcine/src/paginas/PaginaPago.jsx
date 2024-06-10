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
    const [tarjetas, setTarjetas] = useState([]);
    const [aceptar, setAceptar] = useState(false);
    const [totalEntradas, setTotalEntradas] = useState(0); // Estado para el total de las entradas
    const [productos, setProductos] = useState([]); // Estado para los productos añadidos
    const [showModal, setShowModal] = useState(false); // Estado para mostrar el modal
    const [nombre, setNombre] = useState('');
    const [apellidos, setApellidos] = useState('');
    const [matricula, setMatricula] = useState('');
    const [fechaCaducidad, setFechaCaducidad] = useState('');
    const [cvv, setCvv] = useState('');
    const [selectedTarjeta, setSelectedTarjeta] = useState('');
    const [errors, setErrors] = useState({});
    const [userId, setUserID] = useState('');
    const [recordar, setRecordar] = useState(false);
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

    useEffect(() => {
        if (isLoggedIn) {
            fetch('https://proyecto6.medacarena.com.es/back/public/api/getUser', {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            })
                .then(response => response.json())
                .then(data => {
                    setNombre(data.nombre || '');
                    setApellidos(data.apellidos || '');
                    setEmail(data.email || '');
                    setMatricula(data.matricula || '');
                    setUserID(data.id || '');
                })
                .catch(error => {
                    console.error('Error fetching user data:', error);
                });
        }
    }, [isLoggedIn, token]);

    useEffect(() => {
        if (userId) {
            fetch(`https://proyecto6.medacarena.com.es/back/public/api/tarjetas/${userId}`, {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            })
                .then(response => response.json())
                .then(data => setTarjetas(data.tarjetas || []))
                .catch(error => {
                    console.error('Error fetching tarjetas:', error);
                });
        }
    }, [userId, token]);

    const recordarTarjeta = () => {

        const datosRecordarTarjeta = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ 
                id_usuario: userId,
                numero: tarjeta, 
                fecha_caducidad: fechaCaducidad, 
                cvv: cvv, 
            }),
        };

        console.log('Enviando datos de la tarjeta:', datosRecordarTarjeta.body);  // Añadido para depuración

        const url = 'https://proyecto6.medacarena.com.es/back/public/api/recordarTarjeta';
        fetch(url, datosRecordarTarjeta)
            .then((resultado) => {
                if (!resultado.ok) {
                    throw new Error('Error en la respuesta del servidor');
                }
                return resultado.json();
            })
            .then((respuesta) => {
                if (respuesta.success) {
                    toast.success('Tarjeta recordada correctamente');
                } else {
                    toast.error('Error al recordar la tarjeta');
                }
            })
            .catch((err) => {
                console.log('Error:', err);
                toast.error('Error al registrar tarjeta');
            });
    };

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

    const handleReservar = async (e) => {
        e.preventDefault();
        if (!isFormValid()) {
            return;
        }

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
                if (recordar) {
                    recordarTarjeta();
                }
                cerrarModal();
                toast.success('Reserva realizada correctamente');
                if (isLoggedIn) {
                    navigate('/Entradas', { state: { message: 'Reserva realizada correctamente' } });
                } else {
                    navigate('/', { state: { message: 'Reserva realizada correctamente' } });
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
        const newErrors = {};

        if (email.trim() === '' || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
            newErrors.email = 'Correo no válido';
        }

        if (matricula.trim() === '') {
            newErrors.matricula = 'Matrícula no puede estar vacía';
        }

        if (tarjeta.trim() === '' || !/^\d{16}$/.test(tarjeta)) {
            newErrors.tarjeta = 'Número de tarjeta no válido';
        }

        if (fechaCaducidad.trim() === '' || !/^(0[1-9]|1[0-2])\/\d{2}$/.test(fechaCaducidad)) {
            newErrors.fechaCaducidad = 'Fecha de caducidad no válida';
        }

        if (cvv.trim() === '' || !/^\d{3,4}$/.test(cvv)) {
            newErrors.cvv = 'CVV no válido';
        }

        setErrors(newErrors);

        return Object.keys(newErrors).length === 0;
    };

    const handleBlur = (field) => {
        const newErrors = { ...errors };

        switch (field) {
            case 'email':
                if (email.trim() === '' || !/^[^\s@]+\@[^\s@]+\.[^\s@]+$/.test(email)) {
                    newErrors.email = 'Correo no válido';
                } else {
                    delete newErrors.email;
                }
                break;
            case 'matricula':
                if (matricula.trim() === '') {
                    newErrors.matricula = 'Matrícula no puede estar vacía';
                } else {
                    delete newErrors.matricula;
                }
                break;
            case 'tarjeta':
                if (tarjeta.trim() === '' || !/^\d{16}$/.test(tarjeta)) {
                    newErrors.tarjeta = 'Número de tarjeta no válido';
                } else {
                    delete newErrors.tarjeta;
                }
                break;
            case 'fechaCaducidad':
                if (fechaCaducidad.trim() === '' || !/^(0[1-9]|1[0-2])\/\d{2}$/.test(fechaCaducidad)) {
                    newErrors.fechaCaducidad = 'Fecha de caducidad no válida';
                } else {
                    delete newErrors.fechaCaducidad;
                }
                break;
            case 'cvv':
                if (cvv.trim() === '' || !/^\d{3,4}$/.test(cvv)) {
                    newErrors.cvv = 'CVV no válido';
                } else {
                    delete newErrors.cvv;
                }
                break;
            default:
                break;
        }

        setErrors(newErrors);
    };

    const handleCardSelection = (e) => {
        const selectedNumber = e.target.value;
        setSelectedTarjeta(selectedNumber);
        if (selectedNumber === '') {
            setTarjeta('');
            setFechaCaducidad('');
            setCvv('');
        } else {
            const selectedCard = tarjetas.find(t => t.numero === selectedNumber);
            if (selectedCard) {
                setTarjeta(selectedCard.numero);
                const [year, month] = selectedCard.fecha_caducidad.split('-');
                setFechaCaducidad(`${month}/${year.slice(-2)}`);
                setCvv(selectedCard.cvv); // Ensure this value is also stored in the API and returned
            }
        }
    };

    const totalProductos = productos.reduce((acc, producto) => acc + producto.precio, 0);
    const total = totalEntradas + totalProductos + 1;

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
                                        <p><b>Entradas:</b> {totalEntradas}€</p>
                                    </div>
                                </div>
                            </div>
                            {productos.map((producto, index) => (
                                <div key={index} className='flex'>
                                    <p><b>{producto.nombre}:</b> {producto.precio}€</p>
                                </div>
                            ))}
                            <div className='flex'>
                                <p><b>Gastos de gestión:</b> 1€</p>
                            </div>
                            <hr className='hrlistas2' />
                            <p className='descripcioncomida'>
                                <b>TOTAL:</b> {total}€
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
                                <input className='input2' type="text" required value={nombre} onChange={(e) => setNombre(e.target.value)} onBlur={() => handleBlur('nombre')} />
                                <label>Nombre</label>
                                {errors.nombre && <small className="error-message">{errors.nombre}</small>}
                            </div>
                            <div className="user-box">
                                <input className='input2' type="email" required value={email} onChange={(e) => setEmail(e.target.value)} onBlur={() => handleBlur('email')} />
                                <label>Correo</label>
                                {errors.email && <small className="error-message">{errors.email}</small>}
                            </div>
                            <div className="user-box">
                                <input className='input2' type="text" required value={matricula} onChange={(e) => setMatricula(e.target.value)} onBlur={() => handleBlur('matricula')} />
                                <label>Matrícula</label>
                                {errors.matricula && <small className="error-message">{errors.matricula}</small>}
                            </div>

                            {isLoggedIn && (
                                <div className="user-box">
                                    <label>Tarjeta</label><br /><br />
                                    <select className='input2select' required value={selectedTarjeta} onChange={handleCardSelection}>
                                        <option value="">Insertar tarjeta nueva</option>
                                        {tarjetas.map((tarjeta, index) => (
                                            <option key={index} value={tarjeta.numero}>
                                                {tarjeta.numero} (Expira: {tarjeta.fecha_caducidad})
                                            </option>
                                        ))}
                                    </select>
                                </div>
                            )}

                            <div className="user-box">
                                <input className='input2' type="text" required value={tarjeta} onChange={(e) => setTarjeta(e.target.value)} onBlur={() => handleBlur('tarjeta')} />
                                <label>Num de Tarjeta</label>
                                {errors.tarjeta && <small className="error-message">{errors.tarjeta}</small>}
                            </div>
                            <div className="flex20">
                                <div className="user-box mr-3">
                                    <input className='input2' type="text" required value={fechaCaducidad} onChange={(e) => setFechaCaducidad(e.target.value)} onBlur={() => handleBlur('fechaCaducidad')} />
                                    <label>Fecha de Caducidad</label>
                                    {errors.fechaCaducidad && <small className="error-message">{errors.fechaCaducidad}</small>}
                                </div>
                                <div className="user-box">
                                    <input className='input2' type="text" required value={cvv} onChange={(e) => setCvv(e.target.value)} onBlur={() => handleBlur('cvv')} />
                                    <label>CVV</label>
                                    {errors.cvv && <small className="error-message">{errors.cvv}</small>}
                                </div>
                            </div>
                            {isLoggedIn && selectedTarjeta === '' && (
                                <div className="user-box">
                                    <div className="flex">
                                        <input 
                                            type="checkbox" 
                                            className="ui-checkbox" 
                                            checked={recordar}
                                            onChange={() => setRecordar(!recordar)}
                                        />
                                        <p className="sisi">Recordar tarjeta</p>
                                    </div>
                                </div>
                            )}
                            <center>
                                <a href="#" onClick={handleReservar} className={`comprar-link ${Object.keys(errors).length > 0 ? 'disabled-link' : ''}`}>
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
