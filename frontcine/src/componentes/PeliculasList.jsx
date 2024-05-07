import React, { useState, useEffect } from 'react';
import '../style/peliculasList.css';

const PeliculasList = () => {
    const [peliculas, setPeliculas] = useState([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        const fetchPeliculas = async () => {
            setLoading(true);
            try {
                const response = await fetch('http://localhost/proyectofinal/back/public/api/peliculas');
                if (!response.ok) {
                    throw new Error('Failed to fetch peliculas');
                }
                const data = await response.json();
                setPeliculas(data.peliculas);
            } catch (error) {
                console.error('Error fetching peliculas:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchPeliculas();
    }, []);

    return (
        <div className="peliculas-container">
            {loading ? (
                <p>Loading...</p>
            ) : (
                <div className="peliculas-list">
                    {peliculas.map(pelicula => (
                        <div key={pelicula.id} className="pelicula-item">
                            <h2>{pelicula.nombrePelicula}</h2>
                            <p className="fecha-hora">Fecha: {pelicula.fecha}</p>
                            <p className="fecha-hora">Hora: {pelicula.hora}</p>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default PeliculasList;
