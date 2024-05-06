import React, { useState, useEffect } from 'react';
import '../style/mainstyle.css';

const images = [
    '/img/tapacosautocinemas2et.jpg',
    '/img/autocinemas5bueno.jpg',
    '/img/prueba.png'
];

export const Slider = () => {
    const [currentImageIndex, setCurrentImageIndex] = useState(0);

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentImageIndex((prevIndex) =>
                prevIndex === images.length - 1 ? 0 : prevIndex + 1
            );
        }, 5000); // Cambia cada 5 segundos
        return () => clearInterval(interval);
    }, []);

    return (
        <div class="banner_nuestraempresa">
            <div class="imagen_container">
                <img class="img_banner_nuestraempresa" src="../../public/img/tapacosautocinemas2et.jpg"
                    alt="" />
                <img class="img_banner_nuestraempresa" src="../../public/img/autocinemas5bueno.jpg"
                    alt="" />
                <img class="img_banner_nuestraempresa" src="../../public/img/prueba.png"
                    alt="" />
            </div>
            <div class="contenedor_banner_nuestraempresa">
                <h2 class="titulo_banner_nuestraempresa">INSTALA PLACAS SOLARES Y ELIMINA TU FACTURA DE LUZ CON SUBVENCIONES YA
                    DISPONIBLES EN <span>ANDALUCÍA</span></h2>
                <h3 class="subtitulo_banner_nuestraempresa">Empresa instaladora de <span class="placassolares">placas solares</span> en Córdoba</h3>
                <div class="botones_slider_inicio">
                    <div class="boton1_slider_inicio">
                        <p class="textobotones_slider_inicio">Solicita información</p>
                    </div>
                    <div class="boton2_slider_inicio">
                        <p class="textobotones_slider_inicio">LLAMAR AL 627 256 254</p>
                    </div>
                </div>
            </div>
        </div>
    )
}

