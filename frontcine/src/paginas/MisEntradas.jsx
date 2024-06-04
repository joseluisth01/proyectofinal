import React, { useState, useEffect } from 'react';
import { Header } from '../componentes/Header';
import '../style/misentradasstyle.css';

const MisEntradas = () => {
    const [entradas, setEntradas] = useState([]);
    const [error, setError] = useState(null);
    const token = localStorage.getItem('token');

    useEffect(() => {
        const fetchEntradas = async () => {
            if (!token) {
                setError("Debe iniciar sesión para ver sus entradas");
                return;
            }

            try {
                const entradasResponse = await fetch(`http://localhost/proyectofinal/back/public/api/reservasPorUsuario`, {
                    headers: {
                        'Authorization': `Bearer ${token}`
                    }
                });

                if (!entradasResponse.ok) {
                    throw new Error('Error al recuperar las entradas');
                }

                const entradasData = await entradasResponse.json();
                setEntradas(entradasData.reservas);
            } catch (error) {
                console.error('Error fetching entradas:', error);
                setError('Ocurrió un error al recuperar sus entradas. Por favor, inténtelo de nuevo más tarde.');
            }
        };

        fetchEntradas();
    }, [token]);

    const handleCancelarReserva = async (idReserva) => {
        try {
            const response = await fetch(`http://localhost/proyectofinal/back/public/api/cancelarReserva/${idReserva}`, {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                }
            });

            if (!response.ok) {
                throw new Error('Error al cancelar la reserva');
            }

            const result = await response.json();
            alert(result.mensaje);
            setEntradas(entradas.filter(entrada => entrada.id !== idReserva)); // Actualizar la lista de entradas
        } catch (error) {
            console.error('Error cancelando la reserva:', error);
            alert('Ocurrió un error al cancelar la reserva');
        }
    };

    if (!token) {
        return <p className="mis-entradas-error">Debe iniciar sesión para ver sus entradas.</p>;
    }

    if (error) {
        return <p className="mis-entradas-error">{error}</p>;
    }

    if (entradas.length === 0) {
        return <p className="mis-entradas-no-entradas">No tiene entradas reservadas.</p>;
    }

    return (
        <div className="fondo">
            <div className="mis-entradas-container">
                <h1 className="mis-entradas-title">Mis Entradas</h1>

                <div className="mis-entradas-content">
                    <ul className="mis-entradas-list">
                        {entradas.map((entrada) => (
                            <li key={entrada.id} className="mis-entradas-item">
                                <div className="mis-entradas-item-container">
                                    <p className="mis-entradas-pelicula">Película: {entrada.pelicula.nombrePelicula}</p>
                                    <p className="mis-entradas-asiento">Nº de parcela: {entrada.asiento_numero}</p>
                                    <p className="mis-entradas-hora">Hora: {entrada.pelicula.hora}</p>
                                    <p className="mis-entradas-fecha">Fecha: {entrada.fecha}</p>
                                    <button className="mis-entradas-cancel-button" onClick={() => handleCancelarReserva(entrada.id)}>Cancelar Reserva</button>
                                </div>
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
        </div>
    );
};

export default MisEntradas;
