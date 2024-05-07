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
                setPeliculas(data.peliculas);
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
                <div className="peliculas-list">
                    {filteredMovies.map(pelicula => (
                        <div key={pelicula.id} className="pelicula-item">
                            <h2>{pelicula.nombrePelicula}</h2>
                            <p className="fecha-hora">Fecha: {pelicula.fecha}</p>
                            <p className="fecha-hora">Hora: {pelicula.hora}</p>
                            <p className="fecha-hora">id: {pelicula.id}</p>
                            <p className="fecha-hora">idPelicula: {pelicula.idPelicula}</p>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default PeliculasList;
