import React, { useState, useEffect } from 'react';
import '../style/mainstyle.css';

const images = [
    '/img/autocine2.webp',
    '/img/autocine.webp',
    '/img/prueba.webp'
];

export const Slider = () => {
    const [currentImageIndex, setCurrentImageIndex] = useState(0);

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentImageIndex(prevIndex => (prevIndex === images.length - 1 ? 0 : prevIndex + 1));
        }, 5000); // Change every 5 seconds
        return () => clearInterval(interval);
    }, []);

    return (
        <div className="banner_nuestraempresa">
            <div className="sliderfull">
                {images.map((img, index) => (
                    <div
                        key={img}
                        className={`slide ${index === currentImageIndex ? 'active zoom-background' : ''}`}
                        style={{ backgroundImage: `url(${img})` }}
                    ></div>
                ))}
                <div className="overlay">
                    <h2 className="titulocentral">TAPACOS<br/>AUTOCINEMAS</h2>
                    <div className="botones_slider_inicio">
                        <div className="boton1_slider_inicio">
                            <p className="textobotones_slider_inicio">Cartelera</p>
                        </div>
                        <div className="boton2_slider_inicio">
                            <p className="textobotones_slider_inicio">Próximos Estrenos</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

