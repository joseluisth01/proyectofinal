import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../style/perfil.css';

export const Perfil = () => {
    const [user, setUser] = useState(null);
    const [activeTab, setActiveTab] = useState('Perfil');
    const navigate = useNavigate();

    useEffect(() => {
        const fetchUserProfile = async () => {
            try {
                const token = localStorage.getItem('token');
                if (!token) {
                    navigate('/login'); // Redirect to login if no token
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

    const handleTabClick = (tabName) => {
        setActiveTab(tabName);
    };

    if (!user) {
        return <div>Loading...</div>;
    }

    return (
        <div className="fondo">
            <div className="perfil-container">


                {/* <h1>Perfil</h1> */}
                <div className="tab">
                    <button className={`tablinks ${activeTab === 'Perfil' ? 'active' : ''}`} onClick={() => handleTabClick('Perfil')} id="defaultOpen">👤Mi Perfil</button>
                    <button className={`tablinks ${activeTab === 'Settings' ? 'active' : ''}`} onClick={() => handleTabClick('Settings')}>💳Mis Tarjetas</button>
                    <button className={`tablinks ${activeTab === 'Other' ? 'active' : ''}`} onClick={() => handleTabClick('Other')}>⚙️Otros</button>
                </div>

                <div id="Perfil" className={`tabcontent ${activeTab === 'Perfil' ? 'active' : ''}`}>
                    <h3>Perfil</h3>
                    <div className="perfil-info">
                        <div className="field">
                            <label><strong>Nombre:</strong></label>
                            <span className="value">{user.nombre}</span>
                        </div>
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
                    <h3>Settings</h3>
                    <p>Settings content goes here.</p>
                </div>

                <div id="Other" className={`tabcontent ${activeTab === 'Other' ? 'active' : ''}`}>
                    <h3>Other</h3>
                    <p>Other content goes here.</p>
                </div>

            </div>
        </div>
    );
};
