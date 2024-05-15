import React, { useState, useEffect } from 'react';
import '../style/peliculasList.css';

const PeliculasList = () => {
    const [peliculas, setPeliculas] = useState([]);
    const [loading, setLoading] = useState(false);
    const [selectedDate, setSelectedDate] = useState(new Date());
    const [dateRangeStart, setDateRangeStart] = useState(new Date());
    const today = new Date();
    today.setHours(0, 0, 0, 0); // Reiniciar a la medianoche
    const fourteenDaysLater = new Date(today.getTime() + 14 * 86400000);

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
                            // Agrega más géneros según sea necesario
                        };
                        return genreMapping[genre.name] || genre.name; // Si no se encuentra, se mantiene el nombre en inglés
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
    }, []); // Solo se ejecuta una vez al montar el componente

    const filteredMovies = peliculas.filter(pelicula =>
        new Date(pelicula.fecha).toDateString() === selectedDate.toDateString()
    );

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

    // Verificar si el rango actual ya está en el día actual (inclusivo)
    const isPreviousDisabled = dateRangeStart.getTime() <= today.getTime();
    const isNextDisabled = dateRangeStart.getTime() + 3 * 86400000 >= fourteenDaysLater.getTime();

    const StarRating = ({ rating }) => {
        const stars = [];
        for (let i = 1; i <= 5; i++) {
            if (i <= rating) {
                stars.push(<span key={i} className="star filled">&#9733;</span>);
            } else {
                stars.push(<span key={i} className="star">&#9733;</span>);
            }
        }
        return <div className="star-rating">{stars}</div>;
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
                                
                            </div>
                            <div className="movie-info">
                                <p className='titulopelicartelera'>{pelicula.nombrePelicula}</p>
                                <p>{pelicula.duracion} minutos</p>
                                <p>Género: {pelicula.genero}</p>
                                <p>Valoración: {pelicula.valoracion} / 10</p>
                                <StarRating rating={pelicula.valoracion / 2} />
                                <p>{pelicula.hora}</p>
                                <button onClick={() => borrarPelicula(pelicula.id)}>Borrar</button>
                            </div>
                        </div>
                        <hr />
                    </div>

                ))
            )}

        </div>
    );
};

export default PeliculasList;
