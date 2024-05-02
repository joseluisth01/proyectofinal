import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import '../style/modoAdmin.css';

export const ModoAdmin = () => {
    const [movies, setMovies] = useState([]);
    const [page, setPage] = useState(1);
    const [loading, setLoading] = useState(false);
    const [searchQuery, setSearchQuery] = useState('');
    const idPrueba = 999;

    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);
            try {
                let apiUrl = '';
                if (searchQuery) {
                    apiUrl = `https://api.themoviedb.org/3/search/movie?api_key=9b6ecd3e72ca170064c048d4ea07a095&query=${searchQuery}&page=${page}`;
                } else {
                    apiUrl = `https://api.themoviedb.org/3/movie/popular?api_key=9b6ecd3e72ca170064c048d4ea07a095&page=${page}`;
                }
                const response = await fetch(apiUrl);
                if (!response.ok) {
                    throw new Error('Failed to fetch data');
                }
                const data = await response.json();
                setMovies(prevMovies => (page === 1 ? data.results : [...prevMovies, ...data.results]));
            } catch (error) {
                console.error('Error fetching data:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, [searchQuery, page]);

    const handleSearchInputChange = (event) => {
        setSearchQuery(event.target.value);
        setPage(1);
    };

    const loadMoreMovies = () => {
        setPage(prevPage => prevPage + 1);
    };

    const insertarPelicula = (idPelicula, nombrePelicula) => {
        const datosPelicula = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({idPelicula,nombrePelicula}),
        };
    
        const url = 'http://localhost/proyectofinal/back/public/api/insertarPelicula';
        fetch(url, datosPelicula)
            .then((resultado) => resultado.json())
            .then((respuesta) => {
                console.log('Película insertada correctamente');
                alert("Película añadida correctamente");
            })
            .catch((err) => console.log(err));
    };
    

    return (
        <div className="movie-list-container">
            <div className="search-container">
                <input
                    type="text"
                    placeholder="Buscar películas..."
                    value={searchQuery}
                    onChange={handleSearchInputChange}
                />
            </div>
            <div className="movie-list">
                {movies.map(movie => (
                    <div key={movie.id} className="movie-item anim-upp">
                        <img className='poster' src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`} alt={movie.title} />
                        <h2 className='titulopeli'>{movie.title}</h2>
                        <button onClick={() => insertarPelicula(movie.id,movie.title)}>Añadir</button>
                    </div>
                ))}
            </div>
            {loading && <p>Loading...</p>}
            {!searchQuery && (
                <button className='buttoncargar' onClick={loadMoreMovies}>Cargar más</button>
            )}
        </div>
    )
}
