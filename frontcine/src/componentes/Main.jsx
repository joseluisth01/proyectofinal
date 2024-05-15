import React from 'react';
import '../style/mainstyle.css';
import { Slider } from './Slider';
import { Header } from '../componentes/Header'

const garfieldImg = '/img/GARFIELD.jpg'; // Ruta de la imagen guardada
const teamImage = '/img/empleados.jpg'; // Ruta de la imagen guardada

export const Main = () => {
  return (
    <div className='divmain'>
      <header>
      </header>
      <main>
        <Header/>
        <Slider />

        <section className='garfield-promotion'>
          <div className='garfield-content'>
            <h2>Concurso - Garfield: la Película</h2>
            <p>
              <b> #Garfield</b>, el gato más vago y gracioso llega a Tapacos Autocinemas con regalos muy felinos.
              No hablamos de lasagna, pero os traemos packs formados por un peluche, unos stickers
              y una camiseta de adulto o niño. 🐱
            </p>
            <h3>¿Qué tienes que hacer para conseguirlos?</h3>
            <ul>
              <li>📌 1. Síguenos.</li>
              <li>📌 2. Menciona a la persona que te llevarías a verla.</li>
              <li>📌 3. Haber visto la película en Tapacos Autocinemas y estar en posesión de la entrada.</li>
            </ul>
            <p>Tienes hasta el 15 de mayo a las 23:55 horas para participar (huso horario peninsular).</p>
            Bases legales: <a href='https://BasesLegalesDeGarfield.com' target='_blank' rel='noopener noreferrer'>
              https://BasesLegalesDeGarfield.com
            </a>
          </div>
          <img src={garfieldImg} alt='Garfield Promoción' className='garfield-img' />
        </section>

        <section className='team-promotion'>
          <img src={teamImage} alt='Equipo de trabajo' className='team-img' />
          <div className='team-content'>
            <h3>TAPACOS AUTOCINEMAS</h3>
            <h2>Compra entradas de cine para recompensar el trabajo bien hecho de tu equipo</h2>
            <p>
              Los programas de reconocimiento a empleados establecen una cultura positiva, en la que el esfuerzo
              se traduce en recompensas y qué mejor que regalar CINE.
            </p>
            <button className='contact-btn'>Comprar Entrada</button>
          </div>
        </section>

        <hr />

      </main>
      <footer>
      </footer>
    </div>
  );
};
