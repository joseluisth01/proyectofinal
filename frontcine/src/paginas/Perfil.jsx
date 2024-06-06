import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../style/perfil.css';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export const Perfil = () => {
    const [user, setUser] = useState(null);
    const [activeTab, setActiveTab] = useState('Perfil');
    const [showAddCardModal, setShowAddCardModal] = useState(false);
    const [newCard, setNewCard] = useState({
        numero: '',
        fecha_caducidad: '',
        cvv: ''
    });
    const [tarjetas, setTarjetas] = useState([]);
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
                console.log(data)
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
            setNewCard({ numero: '', fecha_caducidad: '', cvv: '' });

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
                        <h3>Perfil</h3>
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
                        <h3>Mis Tarjetas</h3>
                        <br />
                        <p>Estas son tus tarjetas:</p>
                        <ul>
                            {tarjetas.map((tarjeta) => (
                                <li key={tarjeta.id}>
                                    Número: {tarjeta.numero} <br />
                                    Fecha de Caducidad: {new Date(tarjeta.fecha_caducidad).toLocaleDateString()}
                                    <button onClick={() => handleDeleteCard(tarjeta.id)}>Eliminar</button>
                                </li>
                            ))}
                        </ul>
                        <button className="botonAniadirAdmin" onClick={handleAddCardClick}>Añadir Tarjeta</button>
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

            {showAddCardModal && (
                <div className="modal">
                    <div className="modal-content">
                        <span className="close" onClick={() => setShowAddCardModal(false)}>&times;</span>
                        <h2>Añadir Tarjeta</h2>
                        <form onSubmit={handleAddCardSubmit}>
                            <div className="form-group">
                                <label>Número de Tarjeta</label>
                                <input type="text" value={newCard.numero} onChange={(e) => setNewCard({ ...newCard, numero: e.target.value })} required />
                            </div>
                            <div className="form-group">
                                <label>Fecha de Caducidad</label>
                                <input type="date" value={newCard.fecha_caducidad} onChange={(e) => setNewCard({ ...newCard, fecha_caducidad: e.target.value })} required />
                            </div>
                            <div className="form-group">
                                <label>CVV</label>
                                <input type="text" value={newCard.cvv} onChange={(e) => setNewCard({ ...newCard, cvv: e.target.value })} required />
                            </div>
                            <button type="submit">Añadir</button>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Perfil;
