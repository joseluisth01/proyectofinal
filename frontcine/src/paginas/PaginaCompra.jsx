import React, { useEffect, useState } from 'react';
import { useParams, useNavigate, useLocation } from 'react-router-dom';
import '../style/paginaComprastyle.css';

export const PaginaCompra = () => {
    const { id } = useParams();
    const location = useLocation();
    const selectedDate = location.state?.selectedDate || ''; // Get selected date from location state
    const [asientos, setAsientos] = useState([]);
    const [seleccionados, setSeleccionados] = useState([]);
    const [pelicula, setPelicula] = useState(null); // State to store movie details
    const navigate = useNavigate();
    
    const token = localStorage.getItem('token');
    const [usuarioId, setUsuarioId] = useState(null);

    useEffect(() => {
        const fetchAsientos = async () => {
            try {
                const response = await fetch(`http://localhost/proyectofinal/back/public/api/asientos/${id}`);
                const data = await response.json();
                setAsientos(data.asientos);
            } catch (error) {
                console.error('Error fetching asientos:', error);
            }
        };
        const fetchPelicula = async () => {
            try {
                const response = await fetch(`https://api.themoviedb.org/3/movie/${id}?api_key=9b6ecd3e72ca170064c048d4ea07a095&language=es-ES`);
                const data = await response.json();
                setPelicula(data);
            } catch (error) {
                console.error('Error fetching pelicula:', error);
            }
        };
        fetchAsientos();
        fetchPelicula(); // Fetch movie details
    }, [id]);

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
        if (!token) {
            alert("Debe iniciar sesión para reservar asientos");
            return;
        }

        let fetchedUserId;
        try {
            const response = await fetch('http://localhost/proyectofinal/back/public/api/getId', {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });
            const data = await response.json();
            if (response.ok) {
                fetchedUserId = data.id;
            } else {
                alert("Debe iniciar sesión para reservar asientos");
                return;
            }
        } catch (error) {
            console.error('Error fetching user ID:', error);
            alert("Debe iniciar sesión para reservar asientos");
            return;
        }

        try {
            const response = await fetch('http://localhost/proyectofinal/back/public/api/reservarAsientos', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify({ idPelicula: id, asientosSeleccionados: seleccionados, usuarioId: fetchedUserId }),
            });
            const responseData = await response.json();
            if (response.ok) {
                alert(responseData.mensaje);
                // Actualizar el estado de los asientos
                setAsientos((prev) =>
                    prev.map((asiento) =>
                        seleccionados.includes(asiento.asiento_numero)
                            ? { ...asiento, estado: 'ocupado', usuario_id: fetchedUserId }
                            : asiento
                    )
                );
                setSeleccionados([]);
            } else {
                alert(responseData.error || 'Ocurrió un error al reservar los asientos');
            }
        } catch (error) {
            console.error('Error reservando asientos:', error);
            alert('Ocurrió un error al reservar los asientos');
        }
    };

    return (
        <div className="fondo">
            <div className="divpaginacompra">
                {pelicula && (
                    <div className="datos-pelicula">
                        <p><b>Cine:</b> TAPACOS AUTOCINEMAS CÓRDOBA</p>
                        <p><b>Película:</b> {pelicula.title}</p>
                        <p><b>Fecha:</b> {selectedDate}</p>
                        <p><b>Asientos seleccionados:</b> {seleccionados.join(', ')}</p>
                    </div>
                )}
                <div>
                    <div className="pantallacine">
                        PANTALLA
                    </div><br />
                    <div className="asientos-container">
                        {asientos.map((asiento, index) => (
                            <React.Fragment key={asiento.asiento_numero}>
                                <div
                                    className={`asiento ${asiento.estado === 'ocupado' ? 'ocupado' : ''} ${
                                        seleccionados.includes(asiento.asiento_numero) ? 'seleccionado' : ''
                                    }`}
                                    onClick={() => asiento.estado === 'libre' && handleSelectAsiento(asiento.asiento_numero)}
                                >
                                    {asiento.asiento_numero}
                                </div>
                                {(index + 1) % 5 === 0 && <div className="spacer" />}
                            </React.Fragment>
                        ))}
                    </div>
                </div>
                <button className="reservar-btn" onClick={handleReservar}>
                    Reservar
                </button>
            </div>
        </div>
    );
};

export default PaginaCompra;
