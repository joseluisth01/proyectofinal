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
                const moviesWithPosters = await Promise.all(data.peliculas.map(async (pelicula) => {
                    const tmdbResponse = await fetch(`https://api.themoviedb.org/3/movie/${pelicula.idPelicula}?api_key=9b6ecd3e72ca170064c048d4ea07a095`);
                    const tmdbData = await tmdbResponse.json();
                    return { ...pelicula, posterUrl: `https://image.tmdb.org/t/p/w500${tmdbData.poster_path}` };
                }));
                setPeliculas(moviesWithPosters);
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
    );

    const getDayLabel = (date) => {
        const days = ['Domingo', 'Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado'];
        if (date.toDateString() === today.toDateString()) {
            return "Hoy";
        } else {
            return `${days[date.getDay()]} ${date.getDate()}/${date.getMonth() + 1}`;
        }
    };

    const moveDateRange = (days) => {
        const newDateRangeStart = new Date(dateRangeStart.getTime() + days * 86400000);
        // Verificar límites de rango, permitiendo retroceder hasta el día actual (inclusivo)
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
                <table className="peliculas-table">
                    <thead>
                        <tr>
                            <th>Poster</th>
                            <th>Hora</th>
                        </tr>
                    </thead>
                    <tbody>
                        {filteredMovies.map(pelicula => (
                            <tr key={pelicula.id}>
                                <td>
                                    <img
                                        src={pelicula.posterUrl}
                                        alt={`Poster de ${pelicula.nombrePelicula}`}
                                        style={{ width: "100px" }}
                                    />
                                </td>
                                <td>{pelicula.hora}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            )}
        </div>
    );
};

export default PeliculasList;
