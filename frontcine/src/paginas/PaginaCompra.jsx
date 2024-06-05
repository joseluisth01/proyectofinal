import React, { useEffect, useState } from 'react';
import { useParams, useLocation } from 'react-router-dom';
import '../style/paginaComprastyle.css';
import { Link } from 'react-router-dom';

const parcelalibre = '/img/plaza-aparcamiento2.png';
const parcelaseleccionada = '/img/plaza-aparcamiento-ESCOGIDO.png';
const parcelaocupada = '/img/plaza-aparcamiento-OCUPADO2.png';

const PaginaCompra = () => {
    const { id } = useParams();
    const location = useLocation();
    const { selectedDate, nombrePelicula, hora } = location.state || {};

    const [asientos, setAsientos] = useState([]);
    const [seleccionados, setSeleccionados] = useState([]);
    const [deseleccionados, setDeseleccionados] = useState([]);
    const token = localStorage.getItem('token');

    useEffect(() => {
        const fetchAsientos = async () => {
            try {
                const response = await fetch(`http://localhost/proyectofinal/back/public/api/asientos/${id}`, {
                    headers: {
                        'Authorization': `Bearer ${token}`
                    }
                });
                const data = await response.json();
                setAsientos(data.asientos);
            } catch (error) {
                console.error('Error fetching asientos:', error);
            }
        };
        fetchAsientos();
    }, [id, token]);

    const handleSelectAsiento = (numero) => {
        setSeleccionados((prev) => {
            if (prev.includes(numero)) {
                setDeseleccionados([...deseleccionados, numero]);
                setTimeout(() => {
                    setDeseleccionados((prev) => prev.filter((n) => n !== numero));
                }, 500);
                return prev.filter((n) => n !== numero);
            } else {
                setDeseleccionados(deseleccionados.filter((n) => n !== numero));
                return [...prev, numero];
            }
        });
    };

    const handleReservar = async () => {
        if (!token) {
            alert("Debe iniciar sesión para reservar asientos");
            return;
        }

        try {
            const userIdResponse = await fetch('http://localhost/proyectofinal/back/public/api/getId', {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });
            const userIdData = await userIdResponse.json();
            const fetchedUserId = userIdData.id;

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

    const formatDateToSpanish = (dateString) => {
        const date = new Date(dateString);
        return date.toLocaleDateString('es-ES', {
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        });
    };

    return (
        <div className="fondo">
            <div className="divpaginacompra">
                <div className="datoscompra">
                    <div className='flex'>
                        <p className='datoizq'>Cine:</p>
                        <p>Tapacos Autocinemas Córdoba</p>
                    </div>
                    <hr className='hrdetalles' />
                    <div className='flex mt-5'>
                        <p className='datoizq'>Voy a ver:</p>
                        <p>{nombrePelicula} 🍿 {selectedDate && formatDateToSpanish(selectedDate)} 🍿 {hora}</p>
                    </div>
                    <hr className='hrdetalles' />
                    <div className='flex mt-5'>
                        <p className='datoizq'>Parcelas seleccionadas:</p>
                        <p>{seleccionados.join(', ')}</p>
                    </div>
                    <hr className='hrdetalles' />
                </div>

                <div className="parteabajo">
                    <div className="datosleyenda">
                        <div className='flex items-center'>
                            <img className='imgleyenda' src={parcelalibre} alt='Parcela Libre' />
                            <p className="ml-3">PARCELA DISPONIBLE</p>
                        </div>
                        <div className='flex mt-5 items-center'>
                            <img className='imgleyenda' src={parcelaseleccionada} alt='Parcela Seleccionada' />
                            <p className="ml-3">PARCELA SELECCIONADA</p>
                        </div>
                        <div className='flex mt-5 items-center'>
                            <img className='imgleyenda' src={parcelaocupada} alt='Parcela Ocupada' />
                            <p className="ml-3">PARCELA OCUPADA</p>
                        </div>
                    </div>

                    <div className='datosPantalla'>
                        <div className="pantallacine">
                            PANTALLA
                        </div><br />
                        <div className="asientos-container">
                            {asientos.map((asiento, index) => (
                                <React.Fragment key={asiento.asiento_numero}>
                                    <div
                                        className={`asiento ${asiento.estado === 'ocupado' ? 'ocupado' : ''} ${seleccionados.includes(asiento.asiento_numero) ? 'seleccionado' : ''
                                            } ${deseleccionados.includes(asiento.asiento_numero) ? 'deseleccionado' : ''}`}
                                        onClick={() => asiento.estado === 'libre' && handleSelectAsiento(asiento.asiento_numero)}
                                    >
                                        <div className="car"></div>
                                        {asiento.asiento_numero}
                                    </div>
                                    {(index + 1) % 5 === 0 && <div className="spacer" />}
                                </React.Fragment>
                            ))}
                        </div>
                        <button className="reservar-btn" onClick={handleReservar}>
                            COMPRAR
                        </button>

                        <Link className="enlaceestrenos" to='/PaginaPago'>
                            <button className="reservar-btn">
                                COMPRAR PRUEBA
                            </button>
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );

};

export default PaginaCompra;
