import React, { useEffect, useState } from 'react';
import { Link, useParams, useNavigate, useLocation } from 'react-router-dom';

const hamburguesa = '/img/hamburguesa.png';

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
            {/*             <div className='divpaginapago'>
                <div className="pago-container">
                    <h1>Información de Pago</h1>
                    <div className="form-group">
                        <label>Email:</label>
                        <input type="email" placeholder="Correo electrónico" value={email} onChange={(e) => setEmail(e.target.value)} />
                    </div>
                    <div className="form-group">
                        <label>Número de Tarjeta de Crédito:</label>
                        <input type="text" placeholder="#### #### #### ####" value={tarjeta} onChange={(e) => setTarjeta(e.target.value)} />
                    </div>
                    <div className="form-group">
                        <label>Fecha de Caducidad:</label>
                        <input type="text" placeholder="MM/AA" />
                    </div>
                    <div className="form-group">
                        <label>CVV:</label>
                        <input type="text" placeholder="CVV" />
                    </div>
                    <div className="form-group">
                        <input type="checkbox" checked={aceptar} onChange={(e) => setAceptar(e.target.checked)} />
                        <label>Acepto los términos y condiciones</label>
                    </div>
                    <button onClick={handlePago}>Pagar</button>
                </div>

            </div> */}
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
                                <p class="precioactualcomida">PRECIO ACTUAL 10,00€</p>
                                <p class="precioanteriorcomida">Precio anterior 13,00€</p>
                                <p className='descripcioncomida'>
                                ¡Precio exclusivo WEB! A elegir entre nuestras hamburguesas (Rita burger, Classic burger, Crispy chicken o Veggie burger) con patatas y bebidas incluida.
                                </p>
                                <button className="detalles-pelicula-boton mb-6">AÑADIR</button>
                            </div>
                        </div>
                    </div>

                    <div className="comida1">
                        <div className="flex3">
                            <div className='imgcomida'>
                                <img src={hamburguesa} alt='Garfield Promoción' className='comida-img' />
                            </div>
                            <div className='detallescomida'>
                                <h2 className='nombrecomida'>Menú Burger</h2>
                                <p class="precioactualcomida">PRECIO ACTUAL 10,00€</p>
                                <p class="precioanteriorcomida">Precio anterior 13,00€</p>
                                <p className='descripcioncomida'>
                                ¡Precio exclusivo WEB! A elegir entre nuestras hamburguesas (Rita burger, Classic burger, Crispy chicken o Veggie burger) con patatas y bebidas incluida. Opción sin gluten disponible.
                                </p>
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        </div>

    )
}
