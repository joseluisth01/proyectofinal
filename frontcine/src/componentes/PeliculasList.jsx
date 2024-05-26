import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import '../style/peliculasList.css';

const PeliculasList = () => {
    const [peliculas, setPeliculas] = useState([]);
    const [loading, setLoading] = useState(false);
    const [selectedDate, setSelectedDate] = useState(new Date());
    const [dateRangeStart, setDateRangeStart] = useState(new Date());
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const fourteenDaysLater = new Date(today.getTime() + 14 * 86400000);
    const isAdmin = localStorage.getItem('isAdmin') === 'true';

    useEffect(() => {
        const fetchPeliculas = async () => {
            setLoading(true);
            try {
                const response = await fetch('http://localhost/proyectofinal/back/public/api/peliculas');
                if (!response.ok) {
                    throw new Error('Failed to fetch peliculas');
                }
                const data = await response.json();
                const moviesWithDetails = await Promise.all(data.peliculas.map(async (pelicula) => {
                    const tmdbResponse = await fetch(`https://api.themoviedb.org/3/movie/${pelicula.idPelicula}?api_key=9b6ecd3e72ca170064c048d4ea07a095`);
                    const tmdbData = await tmdbResponse.json();
                    const genresInSpanish = tmdbData.genres.map(genre => {
                        const genreMapping = {
                            "Action": "Acción",
                            "Adventure": "Aventura",
                            "Animation": "Animación",
                            "Comedy": "Comedia",
                            "Crime": "Crimen",
                            "Documentary": "Documental",
                            "Drama": "Drama",
                            "Family": "Familia",
                            "Fantasy": "Fantasía",
                            "History": "Historia",
                            "Horror": "Terror",
                            "Music": "Música",
                            "Mystery": "Misterio",
                            "Romance": "Romance",
                            "Science Fiction": "Ciencia ficción",
                            "TV Movie": "Película de TV",
                            "Thriller": "Suspense",
                            "War": "Guerra",
                            "Western": "Western"
                        };
                        return genreMapping[genre.name] || genre.name;
                    }).join(', ');
                    return {
                        ...pelicula,
                        posterUrl: `https://image.tmdb.org/t/p/w500${tmdbData.poster_path}`,
                        duracion: tmdbData.runtime,
                        genero: genresInSpanish,
                        valoracion: tmdbData.vote_average
                    };
                }));
                setPeliculas(moviesWithDetails);
            } catch (error) {
                console.error('Error fetching peliculas:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchPeliculas();
    }, []);

    const filteredMovies = peliculas.filter(pelicula =>
        new Date(pelicula.fecha).toDateString() === selectedDate.toDateString()
    ).sort((a, b) => {
        const timeA = parseInt(a.hora.replace(':', ''), 10);
        const timeB = parseInt(b.hora.replace(':', ''), 10);
        return timeA - timeB;
    });

    const getDayLabel = (date) => {
        const days = ['Domingo', 'Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado'];
        if (date.toDateString() === today.toDateString()) {
            return `${days[date.getDay()]}\n${date.getDate()}/${date.getMonth() + 1}`;
        } else {
            return `${days[date.getDay()]}\n${date.getDate()}/${date.getMonth() + 1}`;
        }
    };

    const borrarPelicula = async (idPelicula) => {
        const datosPelicula = {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ id: idPelicula }),
        };

        try {
            const response = await fetch('http://localhost/proyectofinal/back/public/api/borrarPeliculas', datosPelicula);
            if (!response.ok) {
                throw new Error('Error')              
                throw new Error('Error al borrar película');
            }
            const data = await response.json();
            alert(data.message);
            // Filtrar las películas eliminadas
            setPeliculas(prevPeliculas => prevPeliculas.filter(pelicula => pelicula.id !== idPelicula));
        } catch (error) {
            console.error('Error:', error);
            alert('Ocurrió un error al borrar la película');
        }
    };

    const moveDateRange = (days) => {
        const newDateRangeStart = new Date(dateRangeStart.getTime() + days * 86400000);
        if (newDateRangeStart.getTime() >= today.getTime() && newDateRangeStart.getTime() <= fourteenDaysLater.getTime()) {
            setDateRangeStart(newDateRangeStart);
        }
    };

    const handleDateSelection = (offset) => {
        const newDate = new Date(dateRangeStart.getTime() + offset * 86400000);
        setSelectedDate(newDate);
    };

    const isPreviousDisabled = dateRangeStart.getTime() <= today.getTime();
    const isNextDisabled = dateRangeStart.getTime() + 3 * 86400000 >= fourteenDaysLater.getTime();

    const calcularEstrellas = (valoracion) => {
        const numEstrellas = Math.round(valoracion / 2);
        return '★'.repeat(numEstrellas) + '☆'.repeat(5 - numEstrellas);
    };

    const formatHora = (hora) => {
        if (hora === '24:00') {
            return '00:00';
        }
        return hora;
    };

    return (
        <div className="peliculas-container">
            <div className="calendar">
                <button
                    className={`arrow-btn ${isPreviousDisabled ? "disabled" : ""}`}
                    onClick={() => moveDateRange(-1)}
                    disabled={isPreviousDisabled}
                >
                    ❮
                </button>
                {[...Array(4)].map((_, index) => {
                    const dayDate = new Date(dateRangeStart.getTime() + index * 86400000);
                    const isActive = dayDate.toDateString() === selectedDate.toDateString();
                    return (
                        <button
                            key={index}
                            className={isActive ? "active" : ""}
                            onClick={() => handleDateSelection(index)}
                        >
                            {getDayLabel(dayDate)}
                        </button>
                    );
                })}
                <button
                    className={`arrow-btn ${isNextDisabled ? "disabled" : ""}`}
                    onClick={() => moveDateRange(1)}
                    disabled={isNextDisabled}
                >
                    ❯
                </button>
            </div>

            {loading ? (
                <p>Loading...</p>
            ) : (
                filteredMovies.map(pelicula => (
                    <div className="movie-card" key={pelicula.id}>
                        <div className="divflex">
                            <div className='postercartelera'>
                                <img
                                    className="movie-poster"
                                    src={pelicula.posterUrl}
                                    alt={`Poster de ${pelicula.nombrePelicula}`}
                                />
                                {isAdmin && <button className='borrarEstreno' onClick={() => borrarPelicula(pelicula.id)}>BORRAR</button>}
                            </div>
                            <div className="movie-info">
                                <p className='titulopelicartelera'>{pelicula.nombrePelicula}</p>
                                <p><b>Duración:</b> {pelicula.duracion} minutos</p>
                                <p><b>Género:</b> {pelicula.genero}</p>
                                <p><b>Valoración:</b> {calcularEstrellas(pelicula.valoracion)}</p>
                                <div className="botonesdetalles">
                                    <Link to={`/PaginaCompra/${pelicula.idPelicula}`}>
                                        <div className="hora">
                                            {formatHora(pelicula.hora)}
                                        </div>
                                    </Link>
                                    <Link to={`/DetallesPelicula/${pelicula.idPelicula}`}>
                                        <div className="botondetalles">
                                            VER DETALLES
                                        </div>
                                    </Link>
                                </div>
                            </div>
                        </div>
                        <hr className="hrlistas" />
                    </div>
                ))
            )}
        </div>
    );
};

export default PeliculasList;
