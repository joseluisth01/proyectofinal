import React, { useState, useEffect } from 'react';
import { Header } from '../componentes/Header';
import '../style/misentradasstyle.css';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const MisEntradas = () => {
    const [entradas, setEntradas] = useState([]);
    const [error, setError] = useState(null);
    const [posterUrls, setPosterUrls] = useState({});
    const [showModal, setShowModal] = useState(false);
    const [reservaToCancel, setReservaToCancel] = useState(null);

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

                const posters = {};
                for (const entrada of entradasData.reservas) {
                    const idPelicula = entrada.idPelicula;

                    const peliculaResponse = await fetch(`http://localhost/proyectofinal/back/public/api/pelicula/${idPelicula}`, {
                        headers: {
                            'Authorization': `Bearer ${token}`
                        }
                    });

                    if (!peliculaResponse.ok) {
                        throw new Error('Error al recuperar la película');
                    }

                    const peliculaData = await peliculaResponse.json();
                    const tmdbId = peliculaData.pelicula.idPelicula;

                    const tmdbResponse = await fetch(`https://api.themoviedb.org/3/movie/${tmdbId}?api_key=9b6ecd3e72ca170064c048d4ea07a095`);
                    if (tmdbResponse.ok) {
                        const tmdbData = await tmdbResponse.json();
                        posters[idPelicula] = `https://image.tmdb.org/t/p/w500${tmdbData.poster_path}`;
                    }
                }
                setPosterUrls(posters);
            } catch (error) {
                console.error('Error fetching data:', error);
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
            toast.error(result.mensaje);
            setEntradas(entradas.filter(entrada => entrada.id !== idReserva));
        } catch (error) {
            console.error('Error cancelando la reserva:', error);
            toast.error('Ocurrió un error al cancelar la reserva');
        }
    };

    const openModal = (entrada) => {
        setReservaToCancel(entrada);
        setShowModal(true);
    };

    const closeModal = () => {
        setReservaToCancel(null);
        setShowModal(false);
    };

    const confirmCancel = () => {
        if (reservaToCancel) {
            handleCancelarReserva(reservaToCancel.id);
        }
        closeModal();
    };

    if (!token) {
        return <p className="mis-entradas-error">Debe iniciar sesión para ver sus entradas.</p>;
    }

    return (
        <div className="fondo">
            <div className="mis-entradas-container">
                <h1 className="mis-entradas-title">Mis Entradas</h1>

                {error && <p className="mis-entradas-error">{error}</p>}

                <div className="mis-entradas-content">
                    {entradas.length === 0 ? (
                        <div className="mis-entradas-no-entradas-container">
                            <p className="mis-entradas-no-entradas">No tienes ninguna reserva realizada</p>
                        </div>
                    ) : (
                        <ul className="mis-entradas-list">
                            {entradas.map((entrada) => (
                                <li key={entrada.id} className="mis-entradas-item">
                                    <div className="mis-entradas-item-container">
                                        <button className="mis-entradas-cancel-button" onClick={() => openModal(entrada)}>
                                            <i className="fas fa-trash"></i>
                                        </button>
                                        <div className="flex10">
                                            <div className="ladoizq">
                                                {posterUrls[entrada.idPelicula] && (
                                                    <img
                                                        className="movie-poster2"
                                                        src={posterUrls[entrada.idPelicula]}
                                                        alt={`Poster de ${entrada.pelicula.nombrePelicula}`}
                                                    />
                                                )}
                                            </div>
                                            <div className="ladodrech">
                                                <p className="mis-entradas-pelicula">{entrada.pelicula.nombrePelicula}</p>
                                                <div className="flex2 espacio">
                                                    <div className="datoizq2">
                                                        <p className="mis-entradas-asiento">Parcela:</p>
                                                    </div>
                                                    <p className="datodrcha2">{entrada.asiento_numero}</p>
                                                </div>
                                                <div className="flex2">
                                                    <div className="datoizq2">
                                                        <p className="mis-entradas-hora">Hora:</p>
                                                    </div>
                                                    <p className="datodrcha2">{entrada.pelicula.hora}</p>
                                                </div>
                                                <div className="flex2">
                                                    <div className="datoizq2">
                                                        <p className="mis-entradas-fecha">Fecha:</p>
                                                    </div>
                                                    <p className="datodrcha2"> {entrada.fecha}</p>
                                                </div>
                                            </div>
                                        </div>

                                    </div>
                                </li>
                            ))}
                        </ul>
                    )}
                </div>
            </div>

            {showModal && reservaToCancel && (
                <div className="mis-entradas-modal">
                    <div className="mis-entradas-modal-content">
                        <h2 className='mis-entradas-pelicula'>Confirmar Cancelación</h2>
                        <p>¿Seguro que quiere cancelar su reserva para la película {reservaToCancel.pelicula.nombrePelicula} del día {reservaToCancel.fecha} a las {reservaToCancel.pelicula.hora}?</p>
                        <button onClick={confirmCancel}>Sí</button>
                        <button onClick={closeModal}>No</button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default MisEntradas;
