import React from 'react';
import '../style/mainstyle.css';
import { Slider } from './Slider';

// Asegúrate de tener la imagen en el directorio `public` para poder utilizarla directamente.
const garfieldImg = '/img/GARFIELD.jpg'; // Reemplaza este con el nombre correcto de tu imagen

export const Main = () => {
  return (
    <div className='divmain'>
      <header>
      </header>
      <main>
        <Slider />
        <br /><br /><br /><br /><br />
        <section className='garfield-promotion'>
          <img src={garfieldImg} alt='Garfield' className='garfield-img' />
          <div className='garfield-content'>
            <h2>Concurso - Garfield: la Película</h2>
            <p>
              #Garfield, el gato más vago y gracioso llega a Odeon Multicines con regalos muy felinos.
              ¡Participa y gana un pack de merchandising de la película!
            </p>
          </div>
        </section>
      </main>
      <footer>
      </footer>
    </div>
  );
};
