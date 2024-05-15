import React, { useState, useEffect } from 'react';
import '../style/estrenosstyle.css';

export const EstrenosList = () => {
    const [peliculas, setPeliculas] = useState([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        const fetchPeliculas = async () => {
            setLoading(true);
            try {
                const response = await fetch('http://localhost/proyectofinal/back/public/api/estrenos');
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
    }, []);

    return (
        <div className="estrenos-container">
            <h1 className='tituloEstreno'>Próximos estrenos</h1>
            {loading ? (
                <p>Loading...</p>
            ) : (
                peliculas.map(pelicula => (
                    <div className="estreno-card" key={pelicula.id}>
                        <div className='estreno-container'>
                            <img
                                className="estreno-poster"
                                src={pelicula.posterUrl}
                                alt={`Poster de ${pelicula.nombrePelicula}`}
                            />
                        </div>
                        <hr className="hr-divider" />
                        <hr />
                    </div>
                ))
            )}
        </div>
    );
};
