import React from 'react';
import '../style/mainstyle.css';
import { Slider } from './Slider';

const garfieldImg = '/img/GARFIELD.jpg'; // Ruta de la imagen guardada

export const Main = () => {
  return (
    <div className='divmain'>
      <header>
      </header>
      <main>
        <Slider />
        <br /><br /><br /><br /><br />
        <section className='garfield-promotion'>
          <div className='garfield-content'>
            <h2>Concurso - Garfield: la Película</h2>
            <p>
              <b> #Garfield</b>, el gato más vago y gracioso llega a Odeon Multicines con regalos muy felinos.
              No hablamos de lasagna, pero os traemos packs formados por un peluche, unos stickers
              y una camiseta de adulto o niño. 🐱
            </p>
            <h3>¿Qué tienes que hacer para conseguirlos?</h3>
            <ul>
              <li>📌 1. Síguenos.</li>
              <li>📌 2. Menciona a la persona que te llevarías a verla.</li>
              <li>📌 3. Haber visto la película en Odeon Multicines y estar en posesión de la entrada.</li>
            </ul>
            <p>Tienes hasta el 15 de mayo a las 23:55 horas para participar (huso horario peninsular).</p>
            <a href='https://epr.ms/3UAodQ4' target='_blank' rel='noopener noreferrer'>
              Bases legales: https://epr.ms/3UAodQ4
            </a>
          </div>
          <img src={garfieldImg} alt='Garfield Promoción' className='garfield-img' />
        </section>
      </main>
      <footer>
      </footer>
    </div>
  );
};
