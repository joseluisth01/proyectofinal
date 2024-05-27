import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import '../style/paginaComprastyle.css';

export const PaginaCompra = () => {
    const { idPelicula } = useParams();
    const [asientos, setAsientos] = useState([]);
    const [seleccionados, setSeleccionados] = useState([]);
    const usuarioId = 1; // ID del usuario actual (esto debería ser dinámico)

    useEffect(() => {
        const fetchAsientos = async () => {
            try {
                const response = await fetch(`http://localhost/proyectofinal/back/public/api/asientos/${idPelicula}`);
                const data = await response.json();
                setAsientos(data.asientos);
            } catch (error) {
                console.error('Error fetching asientos:', error);
            }
        };
        fetchAsientos();
    }, [idPelicula]);

    const handleSelectAsiento = (numero) => {
        setSeleccionados((prev) => {
            if (prev.includes(numero)) {
                return prev.filter((n) => n !== numero);
            } else {
                return [...prev, numero];
            }
        });
    };

    const handleReservar = async () => {
        try {
            const response = await fetch('http://localhost/proyectofinal/back/public/api/reservarAsientos', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ idPelicula, asientosSeleccionados: seleccionados, usuarioId }),
            });
            const data = await response.json();
            alert(data.mensaje);
            // Actualizar el estado de los asientos
            setAsientos((prev) =>
                prev.map((asiento) =>
                    seleccionados.includes(asiento.asiento_numero)
                        ? { ...asiento, estado: 'ocupado', usuario_id: usuarioId }
                        : asiento
                )
            );
            setSeleccionados([]);
        } catch (error) {
            console.error('Error reservando asientos:', error);
            alert('Ocurrió un error al reservar los asientos');
        }
    };

    return (
        <div className="fondo">
            <div className="divpaginacompra">
                <h1>Selecciona tus asientos</h1>
                <div className="asientos-container">
                    {asientos.map((asiento) => (
                        <div
                            key={asiento.asiento_numero}
                            className={`asiento ${asiento.estado === 'ocupado' ? 'ocupado' : ''} ${
                                seleccionados.includes(asiento.asiento_numero) ? 'seleccionado' : ''
                            }`}
                            onClick={() => asiento.estado === 'libre' && handleSelectAsiento(asiento.asiento_numero)}
                        >
                            {asiento.asiento_numero}
                        </div>
                    ))}
                </div>
                <button className="reservar-btn" onClick={handleReservar}>
                    Reservar
                </button>
            </div>
        </div>
    );
};

export default PaginaCompra;
