import React, { useState, useEffect } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import '../style/peliculasList.css';
import addDays from 'date-fns/addDays';

const PeliculasList = () => {
    const [peliculas, setPeliculas] = useState([]);
    const [loading, setLoading] = useState(false);
    const [startDate, setStartDate] = useState(new Date());

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
        new Date(pelicula.fecha).toDateString() === startDate.toDateString()
    );

    return (
        <div className="peliculas-container">

            <DatePicker
                selected={startDate}
                onChange={date => setStartDate(date)}
                dateFormat="yyyy-MM-dd"
            />
            {loading ? (
                <p>Loading...</p>
            ) : (
                <table className="peliculas-table">
                    <thead>
                        <tr>
                            <th>Poster</th>
                            {/* <th>Nombre</th> */}
                            <th>Hora</th>
                        </tr>
                    </thead>
                    <tbody>
                        {filteredMovies.map(pelicula => (
                            <tr key={pelicula.id}>
                                <td><img src={pelicula.posterUrl} alt={`Poster de ${pelicula.nombrePelicula}`} style={{ width: "100px" }} /></td>
                                {/* <td>{pelicula.nombrePelicula}</td> */}
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
