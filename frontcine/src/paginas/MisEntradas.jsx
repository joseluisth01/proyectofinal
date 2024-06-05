import React, { useState, useEffect } from 'react';
import { Header } from '../componentes/Header';
import '../style/misentradasstyle.css';

const MisEntradas = () => {
    const [entradas, setEntradas] = useState([]);
    const [error, setError] = useState(null);
    const [posterUrls, setPosterUrls] = useState({}); // Nuevo estado para almacenar los pósters
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

                // Obtener los pósters de las películas
                const posters = {};
                for (const entrada of entradasData.reservas) {
                    const idPelicula = entrada.idPelicula;

                    // Obtener la idPelicula correcta desde la API local
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

                    // Hacer una solicitud adicional para obtener los detalles de la película desde TMDb
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
            alert(result.mensaje);
            setEntradas(entradas.filter(entrada => entrada.id !== idReserva));
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
                                    <button className="mis-entradas-cancel-button" onClick={() => handleCancelarReserva(entrada.id)}>
                                        <i className="fas fa-trash"></i>
                                    </button>
                                    <p className="mis-entradas-pelicula">{entrada.pelicula.nombrePelicula}</p>
                                    <div className="flex">
                                        <div className="ladoizq">
                                            {posterUrls[entrada.idPelicula] && (
                                                <img
                                                    className="movie-poster"
                                                    src={posterUrls[entrada.idPelicula]}
                                                    alt={`Poster de ${entrada.pelicula.nombrePelicula}`}
                                                />
                                            )}
                                        </div>
                                        <div className="ladodrech">
                                            <div className="flex2 espacio">
                                                <div className="datoizq2">
                                                    <p className="mis-entradas-asiento">Nº de parcela:</p>
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
                </div>
            </div>
        </div>
    );
};

export default MisEntradas;
