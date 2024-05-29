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
            if (response.ok) {
                alert("La reserva ha sido eliminada correctamente");
                // Actualizar la lista de reservas después de eliminar
                const updatedReservas = reservas.filter(reserva => reserva.id !== reservaId);
                setReservas(updatedReservas);
            } else {
                console.error('Error deleting reserva:', response.statusText);
                alert('Ocurrió un error al borrar la reserva');
            }
        } catch (error) {
            console.error('Error deleting reserva:', error);
            alert('Ocurrió un error al borrar la reserva');
        }
    };

    return (
        <div>
            <Header />
            <div>
                <h1>Mis Entradas</h1>
                {reservas.length > 0 ? (
                    <ul>
                        {reservas.map((reserva) => (
                            <li key={reserva.id}>
                                Película: {reserva.pelicula.nombrePelicula}, Hora: {reserva.pelicula.hora}, Asiento: {reserva.asiento_numero}, Fecha: {reserva.fecha}
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


