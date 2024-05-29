import React, { useEffect, useState } from 'react';
import { Header } from '../componentes/Header';

export const Entradas = () => {
    const [reservas, setReservas] = useState([]);
    const token = localStorage.getItem('token');

    useEffect(() => {
        const fetchReservas = async () => {
            if (!token) {
                alert("Debe iniciar sesión para ver sus reservas");
                return;
            }

            try {
                const response = await fetch('http://localhost/proyectofinal/back/public/api/getId', {
                    method: 'POST',
                    headers: {
                        'Authorization': `Bearer ${token}`
                    }
                });
                const data = await response.json();
                if (response.ok) {
                    const usuarioId = data.id;

                    const reservasResponse = await fetch(`http://localhost/proyectofinal/back/public/api/reservas/${usuarioId}`, {
                        headers: {
                            'Authorization': `Bearer ${token}`
                        }
                    });
                    if (reservasResponse.ok) {
                        const reservasData = await reservasResponse.json();
                        setReservas(reservasData.reservas);
                    } else {
                        console.error('Error fetching reservas:', reservasResponse.statusText);
                        alert('Ocurrió un error al recuperar sus reservas');
                    }
                } else {
                    alert("Debe iniciar sesión para ver sus reservas");
                }
            } catch (error) {
                console.error('Error fetching reservas:', error);
                alert('Ocurrió un error al recuperar sus reservas');
            }
        };

        fetchReservas();
    }, [token]);

    return (
        <div>
            <Header />
            <div>
                <h1>Mis Entradas</h1>
                {reservas.length > 0 ? (
                    <ul>
                        {reservas.map((reserva) => (
                            <li key={reserva.id}>
                                Película: {reserva.pelicula_nombre}, Asiento: {reserva.asiento_numero}, Fecha: {new Date(reserva.fecha).toLocaleDateString()}
                            </li>
                        ))}
                    </ul>
                ) : (
                    <p>No tiene entradas reservadas</p>
                )}
            </div>
        </div>
    );
};
export default Entradas;

