import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import '../style/estrenosstyle.css';

export const EstrenosList = () => {
    const [peliculas, setPeliculas] = useState([]);
    const [loading, setLoading] = useState(false);
    const isAdmin = localStorage.getItem('isAdmin') === 'true';

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
                toast.error('Error fetching peliculas');
            } finally {
                setLoading(false);
            }
        };

        fetchPeliculas();
    }, []);

    const borrarEstreno = async (idPelicula) => {
        const datosPelicula = {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ id: idPelicula }),
        };

        try {
            const response = await fetch('http://localhost/proyectofinal/back/public/api/borrarEstrenos', datosPelicula);
            if (!response.ok) {
                throw new Error('Error al borrar estreno');
            }
            const data = await response.json();
            toast.success(data.message);
            setPeliculas(prevPeliculas => prevPeliculas.filter(pelicula => pelicula.id !== idPelicula));
        } catch (error) {
            console.error('Error:', error);
            toast.error('Ocurrió un error al borrar el estreno');
        }
    };

    return (
        <div className="estrenos-container">
            <ToastContainer />
            <h2 className='tituloEstreno'>Próximos estrenos</h2>
            {loading ? (
                <p>Loading...</p>
            ) : (
                peliculas.map(pelicula => (
                    <div className="estreno-card" key={pelicula.id}>
                        <div className='estreno-container'>
                            <Link to={`/DetallesPelicula/${pelicula.idPelicula}`}>
                                <img
                                    className="estreno-poster"
                                    src={pelicula.posterUrl}
                                    alt={`Poster de ${pelicula.nombrePelicula}`}
                                />
                            </Link>
                        </div>
                        {isAdmin && <button className="borrarEstreno" onClick={() => borrarEstreno(pelicula.id)}>BORRAR</button>}
                    </div>
                ))
            )}
            <h2 className='tituloEstreno'>DONDE NOS ENCONTRAMOS</h2>
            <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3149.5295046748156!2d-4.7708828246453345!3d37.87129790659489!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0xd6d207d83074089%3A0xc8ca16fc101afb4a!2sC.%20del%20Guadalquivir%2C%2014010%20C%C3%B3rdoba!5e0!3m2!1ses!2ses!4v1715812890043!5m2!1ses!2ses"
                style={{ border: 0, width: '300px', height: '300px', margin: '0 auto'}}
                allowFullScreen=""
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
            ></iframe>
        </div>
    );
};
