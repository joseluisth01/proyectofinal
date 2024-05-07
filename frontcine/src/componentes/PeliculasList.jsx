import React, { useState, useEffect } from 'react';
import '../style/peliculasList.css';
import format from 'date-fns/format';
import addDays from 'date-fns/addDays';

const PeliculasList = () => {
    const [peliculas, setPeliculas] = useState([]);
    const [loading, setLoading] = useState(false);
    const [selectedDate, setSelectedDate] = useState(new Date());

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

    const datesToShow = [0, 1, 2, 3].map(offset => addDays(selectedDate, offset));

    return (
        <div className="peliculas-container">
            <div className="day-selector">
                {datesToShow.map(date => (
                    <button
                        key={date}
                        className={`day-button ${format(date, 'yyyy-MM-dd') === format(selectedDate, 'yyyy-MM-dd') ? 'active' : ''}`}
                        onClick={() => setSelectedDate(date)}
                    >
                        {format(date, 'EEE dd/MM')}
                    </button>
                ))}
            </div>
            {loading ? (
                <p>Loading...</p>
            ) : (
                <div className="peliculas-list">
                    {peliculas.filter(pelicula =>
                        format(new Date(pelicula.fecha), 'yyyy-MM-dd') === format(selectedDate, 'yyyy-MM-dd')
                    ).map(pelicula => (
                        <div key={pelicula.id} className="pelicula-item">
                            <div className="pelicula-title">{pelicula.nombrePelicula}</div>
                            <div className="pelicula-info">Hora: {pelicula.hora}</div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default PeliculasList;
