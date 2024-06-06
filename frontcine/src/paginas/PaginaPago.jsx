import React, { useEffect, useState } from 'react';
import { Link, useParams, useNavigate, useLocation } from 'react-router-dom';

const hamburguesa = '/img/hamburguesa.png';
const hotdog = '/img/hotdog.png';
const cubo1 = '/img/cubo1.png';
const tapaquitos = '/img/tapaquitos.png';


import '../style/paginaPago.css';

export const PaginaPago = () => {

    const location = useLocation();
    const { id, seleccionados } = location.state || {};
    const [email, setEmail] = useState('');
    const [tarjeta, setTarjeta] = useState('');
    const [aceptar, setAceptar] = useState(false);
    const token = localStorage.getItem('token');
    const navigate = useNavigate();

    const handlePago = async () => {
        if (!token) {
            alert("Debe iniciar sesión para completar la compra");
            return;
        }

        if (!email || !tarjeta || !aceptar) {
            alert("Por favor complete todos los campos y acepte los términos");
            return;
        }

        try {
            const userIdResponse = await fetch('http://localhost/proyectofinal/back/public/api/getId', {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });
            const userIdData = await userIdResponse.json();
            const fetchedUserId = userIdData.id;

            const response = await fetch('http://localhost/proyectofinal/back/public/api/reservarAsientos', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify({ idPelicula: id, asientosSeleccionados: seleccionados, usuarioId: fetchedUserId }),
            });
            const responseData = await response.json();
            if (response.ok) {
                alert(responseData.mensaje);
                navigate('/confirmacion', { state: { mensaje: responseData.mensaje } });
            } else {
                alert(responseData.error || 'Ocurrió un error al procesar el pago');
            }
        } catch (error) {
            console.error('Error procesando el pago:', error);
            alert('Ocurrió un error al procesar el pago');
        }
    };

    return (
        <div className='fondo'>
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
                                    <button className="detalles-pelicula-boton2 mb-6">AÑADIR</button>
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
                                    <button className="detalles-pelicula-boton2 mb-6">AÑADIR</button>
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
                                        Palomitero de edición limitada de Tapacos Autocinemas + palomitas medianas + 2 refrescos.                                </p>
                                    <button className="detalles-pelicula-boton2 mb-6">AÑADIR</button>
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
                                        Palomitas pequeañs + Refrescos de 0,5 l. Con tu pre-compra no tendrás un coste adicional por servicio de entrega a coche.
                                    </p>
                                    <button className="detalles-pelicula-boton2 mb-6">AÑADIR</button>
                                </div>
                            </div>
                        </div>

                    </div>
                </div>

                <div className="bloquedrchacomida">
                    <div className='preguntacomida'>
                        <h1>Productos</h1>
                    </div>
                    <div className="flex5">
                        <div className='detallescomida'>
                            <p className="precioactualcomida">PRECIO ACTUAL 10,00€</p>
                            <p className='descripcioncomida'>
                                ¡Precio exclusivo WEB! A elegir entre nuestras hamburguesas (Rita burger, Classic burger, Crispy chicken o Veggie burger) con patatas y bebidas incluida.
                            </p>
                            <button className="detalles-pelicula-boton2 mb-6">AÑADIR</button>
                        </div>
                    </div>

                </div>

            </div>

        </div>

    )
}
