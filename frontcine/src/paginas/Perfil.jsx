import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../style/perfil.css';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Modal from 'react-modal';
import Cards from 'react-credit-cards';
import 'react-credit-cards/es/styles-compiled.css';

Modal.setAppElement('#root');

export const Perfil = () => {
    const [user, setUser] = useState(null);
    const [activeTab, setActiveTab] = useState('Perfil');
    const [showAddCardModal, setShowAddCardModal] = useState(false);
    const [newCard, setNewCard] = useState({
        numero: '',
        fecha_caducidad_mes: '',
        fecha_caducidad_anio: '',
        cvv: ''
    });
    const [tarjetas, setTarjetas] = useState([]);
    const [selectedCard, setSelectedCard] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchUserProfile = async () => {
            try {
                const token = localStorage.getItem('token');
                if (!token) {
                    navigate('/login');
                    return;
                }

                const response = await fetch('http://localhost/proyectofinal/back/public/api/profile', {
                    method: 'GET',
                    headers: {
                        'Authorization': `Bearer ${token}`,
                        'Content-Type': 'application/json',
                    },
                });

                if (!response.ok) {
                    throw new Error('Failed to fetch user profile');
                }

                const data = await response.json();
                setUser(data);
            } catch (error) {
                console.error('Error fetching user profile:', error);
            }
        };

        fetchUserProfile();
    }, [navigate]);

    useEffect(() => {
        const fetchUserCards = async () => {
            try {
                if (!user) {
                    return;
                }

                const token = localStorage.getItem('token');
                if (!token) {
                    return;
                }

                const response = await fetch(`http://localhost/proyectofinal/back/public/api/tarjetas/${user.id}`, {
                    method: 'GET',
                    headers: {
                        'Authorization': `Bearer ${token}`,
                        'Content-Type': 'application/json',
                    },
                });

                if (!response.ok) {
                    throw new Error('Failed to fetch user cards');
                }

                const data = await response.json();
                setTarjetas(data.tarjetas);
                console.log(data);
            } catch (error) {
                console.error('Error fetching user cards:', error);
            }
        };

        fetchUserCards();
    }, [user]);

    const handleTabClick = (tabName) => {
        setActiveTab(tabName);
    };

    const logout = () => {
        localStorage.clear();
        navigate('/');
    };

    const handleAddCardClick = () => {
        setShowAddCardModal(true);
    };

    const handleAddCardSubmit = async (e) => {
        e.preventDefault();
        const token = localStorage.getItem('token');
        if (!token) {
            toast.warn("Debe iniciar sesión para añadir una tarjeta");
            return;
        }

        try {
            const response = await fetch('http://localhost/proyectofinal/back/public/api/tarjetas', {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ ...newCard, id_usuario: user.id })
            });

            if (!response.ok) {
                throw new Error('Failed to add card');
            }

            const data = await response.json();
            toast.success('Tarjeta añadida exitosamente');
            setShowAddCardModal(false);
            setNewCard({ numero: '', fecha_caducidad_mes: '', fecha_caducidad_anio: '', cvv: '' });

            setTarjetas(prevTarjetas => [...prevTarjetas, data]);
        } catch (error) {
            console.error('Error adding card:', error);
            toast.error('Ocurrió un error al añadir la tarjeta. Por favor, inténtalo de nuevo más tarde.');
        }
    };

    const handleDeleteCard = async (tarjetaId) => {
        const token = localStorage.getItem('token');
        if (!token) {
            toast.error("Debe iniciar sesión para eliminar la tarjeta");
            return;
        }

        try {
            const response = await fetch(`http://localhost/proyectofinal/back/public/api/tarjetas/${tarjetaId}`, {
                method: 'DELETE',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json',
                },
            });

            if (!response.ok) {
                throw new Error('Failed to delete card');
            }

            setTarjetas(prevTarjetas => prevTarjetas.filter(tarjeta => tarjeta.id !== tarjetaId));
            toast.success('Tarjeta eliminada exitosamente');
        } catch (error) {
            console.error('Error deleting card:', error);
            toast.error('Ocurrió un error al eliminar la tarjeta. Por favor, inténtalo de nuevo más tarde.');
        }
    };

    const handleCardSelection = (e) => {
        const selectedCardId = e.target.value;
        const card = tarjetas.find(tarjeta => tarjeta.id === parseInt(selectedCardId));
        setSelectedCard(card);
    };

    if (!user) {
        return <div>Loading...</div>;
    }

    return (
        <div className="fondo">
            <div className="perfill-container">
                <div className="user-head">
                    <div className="usuariolog">
                        <button>{user.nombre.charAt(0).toUpperCase()}</button>
                    </div>
                    <span className="user-greeti">Hola, {user.nombre}</span>
                </div>
                <div className="alineadoflex">
                    <div className="tab">
                        <button className={`tablinks ${activeTab === 'Perfil' ? 'active' : ''}`} onClick={() => handleTabClick('Perfil')} id="defaultOpen">👤 Mi Perfil</button>
                        <button className={`tablinks ${activeTab === 'Settings' ? 'active' : ''}`} onClick={() => handleTabClick('Settings')}>💳 Mis Tarjetas</button>
                        <button className={`tablinks ${activeTab === 'Other' ? 'active' : ''}`} onClick={() => handleTabClick('Other')}>⚙️ Otros</button>
                        <button className={`tablinks ${activeTab === 'CerrarSesion' ? 'active' : ''}`} onClick={() => handleTabClick('CerrarSesion')}>🔒 Cerrar Sesión</button>
                    </div>

                    <div id="Perfil" className={`tabcontent ${activeTab === 'Perfil' ? 'active' : ''}`}>
                        <br />
                        <div className="perfil-info">
                            <div className="field">
                                <label><strong>Email:</strong></label>
                                <span className="value">{user.email}</span>
                            </div>
                            <div className="field">
                                <label><strong>Contraseña:</strong></label>
                                <span className="value">********</span>
                            </div>
                        </div>
                    </div>

                    <div id="Settings" className={`tabcontent ${activeTab === 'Settings' ? 'active' : ''}`}>
                        <br />
                        <p>Estas son tus tarjetas:</p>
                        <select onChange={handleCardSelection}>
                            <option value="">Selecciona una tarjeta</option>
                            {tarjetas.map((tarjeta) => (
                                <option key={tarjeta.id} value={tarjeta.id}>
                                    {tarjeta.numero} - {new Date(tarjeta.fecha_caducidad).toLocaleDateString()}
                                </option>
                            ))}
                        </select>
                        {selectedCard && (
                            <div className="card-item">
                                <Cards
                                    number={selectedCard.numero}
                                    name={user.nombre}
                                    expiry={`${selectedCard.fecha_caducidad_mes}${selectedCard.fecha_caducidad_anio}`}
                                    cvc="***"
                                    focused="number"
                                />
                                <button onClick={() => handleDeleteCard(selectedCard.id)}>Eliminar</button>
                            </div>
                        )}
                        <br />
                        <button onClick={handleAddCardClick} class="animated-button">
                            <svg viewBox="0 0 24 24" class="arr-2" xmlns="http://www.w3.org/2000/svg">
                                <path
                                    d="M16.1716 10.9999L10.8076 5.63589L12.2218 4.22168L20 11.9999L12.2218 19.778L10.8076 18.3638L16.1716 12.9999H4V10.9999H16.1716Z"
                                ></path>
                            </svg>
                            <span class="text">Añadir tarjeta</span>
                            <span class="circle"></span>
                            <svg viewBox="0 0 24 24" class="arr-1" xmlns="http://www.w3.org/2000/svg">
                                <path
                                    d="M16.1716 10.9999L10.8076 5.63589L12.2218 4.22168L20 11.9999L12.2218 19.778L10.8076 18.3638L16.1716 12.9999H4V10.9999H16.1716Z"
                                ></path>
                            </svg>
                        </button>

                        {/* <button className="botonAniadirAdmin" onClick={handleAddCardClick}>Añadir Tarjeta</button> */}
                    </div>

                    <div id="Other" className={`tabcontent ${activeTab === 'Other' ? 'active' : ''}`}>
                        <h3>Otros</h3>
                    </div>

                    <div id="CerrarSesion" className={`tabcontent ${activeTab === 'CerrarSesion' ? 'active' : ''}`}>
                        <h3>Cerrar Sesión</h3>
                        <br />
                        <p>¿Estás seguro que quieres cerrar sesión?</p>
                        <br /><br />
                        <button className='botonCerrar'><a onClick={logout}>Cerrar sesión</a></button>
                    </div>
                </div>
            </div>

            <Modal
                isOpen={showAddCardModal}
                onRequestClose={() => setShowAddCardModal(false)}
                contentLabel="Añadir Tarjeta"
                className="card-modal"
                overlayClassName="card-overlay"
            >
                <button onClick={() => setShowAddCardModal(false)} className="close-modal-button">X</button>
                {/* <h2>Añadir Tarjeta</h2> */}
                <form onSubmit={handleAddCardSubmit}>
                    <div className="form-group">
                        <label>Número de Tarjeta</label>
                        <input className='campoForm' type="text" value={newCard.numero} onChange={(e) => setNewCard({ ...newCard, numero: e.target.value })} required />
                    </div>
                    <div className="form-group">
                        <label>Fecha de Caducidad</label>
                        <div style={{ display: 'flex', gap: '10px' }}>
                            <select className='campoForm' value={newCard.fecha_caducidad_mes} onChange={(e) => setNewCard({ ...newCard, fecha_caducidad_mes: e.target.value })} required>
                                <option value="">Mes</option>
                                {Array.from({ length: 12 }, (_, i) => (
                                    <option key={i + 1} value={String(i + 1).padStart(2, '0')}>
                                        {String(i + 1).padStart(2, '0')}
                                    </option>
                                ))}
                            </select>
                            <select className='campoForm' value={newCard.fecha_caducidad_anio} onChange={(e) => setNewCard({ ...newCard, fecha_caducidad_anio: e.target.value })} required>
                                <option value="">Año</option>
                                {Array.from({ length: 20 }, (_, i) => (
                                    <option key={i + 2023} value={i + 2023}>
                                        {i + 2023}
                                    </option>
                                ))}
                            </select>
                        </div>
                    </div>
                    <div className="form-group">
                        <label>CVV</label>
                        <input className='campoForm' type="text" value={newCard.cvv} onChange={(e) => setNewCard({ ...newCard, cvv: e.target.value })} required />
                    </div>
                    <button type="submit">Añadir</button>
                </form>
            </Modal>

            <ToastContainer />
        </div>
    );
};

export default Perfil;
