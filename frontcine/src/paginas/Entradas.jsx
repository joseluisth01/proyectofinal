import React, { useEffect, useState } from 'react';
import { Header } from '../componentes/Header';
import { useNavigate } from 'react-router-dom';

export const Entradas = () => {
    const [reservas, setReservas] = useState([]);
    const token = localStorage.getItem('token');
    const navigate = useNavigate();

    useEffect(() => {
        const fetchReservas = async () => {
            if (!token) {
                alert("Debe iniciar sesión para ver sus reservas");
                navigate('/login'); // Redirigir a la página de inicio de sesión si no está autenticado
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

                const reservasResponse = await fetch(`http://localhost/proyectofinal/back/public/api/reservas/${usuarioId}`, {
                    headers: {
                        'Authorization': `Bearer ${token}`
                    }
                });

                if (!reservasResponse.ok) {
                    throw new Error('Error al recuperar las reservas');
                }

                const reservasData = await reservasResponse.json();
                setReservas(reservasData.reservas);
            } catch (error) {
                console.error('Error fetching reservas:', error);
                alert('Ocurrió un error al recuperar sus reservas');
            }
        };

        fetchReservas();
    }, [token, navigate]);

    const handleDeleteReserva = async (reservaId) => {
        if (!window.confirm("¿Estás seguro de que quieres borrar esta reserva?")) {
            return;
        }

        try {
            const response = await fetch(`http://localhost/proyectofinal/back/public/api/reservas/${reservaId}`, {
                method: 'DELETE',
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });

            if (!response.ok) {
                throw new Error('Error al borrar la reserva');
            }

            alert("La reserva ha sido eliminada correctamente");
            // Actualizar la lista de reservas después de eliminar
            const updatedReservas = reservas.filter(reserva => reserva.id !== reservaId);
            setReservas(updatedReservas);
        } catch (error) {
            console.error('Error deleting reserva:', error);
            alert('Ocurrió un error al borrar la reserva');
        }
    };

    return (
        <div>
            <div>
                <h1>Mis Entradas</h1>
                {reservas.length > 0 ? (
                    <ul>
                        {reservas.map((reserva) => (
                            <li key={reserva.id}>
                                <p>Película: {reserva.pelicula.nombrePelicula}</p>
                                <p>Hora: {reserva.pelicula.hora}</p>
                                <p>Asiento: {reserva.asiento_numero}</p>
                                <p>Fecha: {reserva.fecha}</p>
                                <button onClick={() => handleDeleteReserva(reserva.id)}>Borrar Reserva</button>
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
