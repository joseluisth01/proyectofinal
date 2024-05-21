import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import YouTube from 'react-youtube';
import '../style/detallesPelicula.css';

export const DetallesPelicula = () => {
    const { idPelicula } = useParams();
    const [pelicula, setPelicula] = useState(null);
    const [trailer, setTrailer] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchPelicula = async () => {
            try {
                const response = await fetch(`https://api.themoviedb.org/3/movie/${idPelicula}?api_key=9b6ecd3e72ca170064c048d4ea07a095&append_to_response=videos`);
                const data = await response.json();
                setPelicula(data);

                if (data.videos && data.videos.results) {
                    const trailer = data.videos.results.find(
                        (vid) => vid.name === "Official Trailer"
                    );
                    setTrailer(trailer ? trailer : data.videos.results[0]);
                }
            } catch (error) {
                console.error('Error fetching pelicula:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchPelicula();
    }, [idPelicula]);

    if (loading) {
        return <p>Loading...</p>;
    }

    if (!pelicula) {
        return <p>No se encontró la película.</p>;
    }

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

    const genresInSpanish = pelicula.genres.map(genre => genreMapping[genre.name] || genre.name).join(', ');

    return (
        <div className="detalles-pelicula-container">
            <div className="detalles-pelicula">
                <img
                    className="detalles-pelicula-poster"
                    src={`https://image.tmdb.org/t/p/w500${pelicula.poster_path}`}
                    alt={`Poster de ${pelicula.title}`}
                />
                <div className="detalles-pelicula-info">
                    <h1>{pelicula.title}</h1>
                    <p><b>Duración:</b> {pelicula.runtime} minutos</p>
                    <p><b>Género:</b> {genresInSpanish}</p>
                    <p><b>Valoración:</b> {pelicula.vote_average}</p>
                    <p><b>Descripción:</b> {pelicula.overview}</p>
                    <p><b>Fecha de lanzamiento:</b> {pelicula.release_date}</p>
                </div>
            </div>
            <div className="trailer-container">
                {trailer ? (
                    <YouTube videoId={trailer.key} />
                ) : (
                    <p>No hay tráiler disponible</p>
                )}
            </div>
        </div>
    );
};
