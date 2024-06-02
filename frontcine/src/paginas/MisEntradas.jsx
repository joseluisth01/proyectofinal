import React, { useState, useEffect } from 'react';
import { Header } from '../componentes/Header';

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
                const response = await fetch('http://localhost/proyectofinal/back/public/api/getId', {
                    method: 'POST',
                    headers: {
                        'Authorization': `Bearer ${token}`
                    }
                });

                if (!response.ok) {
                    throw new Error('No se pudo obtener el ID del usuario');
                }

                const data = await response.json();
                const usuarioId = data.id;

                const entradasResponse = await fetch(`http://localhost/proyectofinal/back/public/api/reservas/${usuarioId}`, {
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

    if (!token) {
        return <p>Debe iniciar sesión para ver sus entradas.</p>;
    }

    if (error) {
        return <p>{error}</p>;
    }

    if (entradas.length === 0) {
        return <p>No tiene entradas reservadas.</p>;
    }

    return (
        <div>
            <Header />
            <div>
                <h1>Mis Entradas</h1>
                <ul>
                    {entradas.map((entrada) => (
                        <li key={entrada.id}>
                            <p>Película: {entrada.pelicula.nombrePelicula}</p>
                            <p>Hora: {entrada.pelicula.hora}</p>
                            <p>Asiento: {entrada.asiento_numero}</p>
                            <p>Fecha: {entrada.fecha}</p>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
};

export default MisEntradas;
