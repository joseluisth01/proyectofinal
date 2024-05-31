import React, { useState, useEffect } from 'react';

const MisEntradas = () => {
    const [entradas, setEntradas] = useState([]);

    useEffect(() => {
        const savedEntradas = JSON.parse(localStorage.getItem('entradas')) || [];
        setEntradas(savedEntradas);
    }, []);

    if (entradas.length === 0) {
        return <p>No hay entradas compradas.</p>;
    }

    return (
        <div className="mis-entradas-container">
            <h2>Mis Entradas</h2>
            {entradas.map((entrada, index) => (
                <div key={index} className="entrada">
                    <h3>{entrada.pelicula}</h3>
                    <p><b>Hora:</b> {entrada.hora}</p>
                    <p><b>Sala:</b> {entrada.sala}</p>
                    <p><b>Número de entradas:</b> {entrada.numEntradas}</p>
                </div>
            ))}
        </div>
    );
};

export default MisEntradas;
