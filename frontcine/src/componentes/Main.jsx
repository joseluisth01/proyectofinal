import React from 'react';
import '../style/mainstyle.css';
import { Slider } from './Slider';
import { Link } from 'react-router-dom';


const garfieldImg = '/img/GARFIELD.jpg';
const teamImage = '/img/empleados.jpg';

export const Main = () => {
  return (
    <div className='divmain'>
      <header>
      </header>
      <main>
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
            <p>Tienes hasta el 15 de Junio a las 23:55 horas para participar (huso horario peninsular).</p>
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
            <Link to="/cartelera">
            <button className='contact-btn'>Comprar Entrada</button>
            </Link>
          </div>
        </section>

        <div class="fondoContacto">
        <div class="form-container">
            <h2 class="form-title">¿Qué te parece TAPACOS?</h2>

            <form>
                <div class="form-group">
                    <label class="form-label" for="name">Nombre</label>
                    <input class="form-input" type="text" id="name" />
                </div>

                <div class="form-group">
                    <label class="form-label" for="email">Dirección de correo electrónico</label>
                    <input class="form-input" name="email" id="email" type="email" />
                </div>

                <div class="form-group">
                    <label class="form-label" for="bio">Mensaje</label>
                    <textarea class="form-input" rows="3" name="bio" id="bio"></textarea>
                </div>

                <div class="form-actions">
                    <button class="submit-button" type="submit">Enviar mensaje</button>
                </div>
            </form>
        </div>
    </div>


        <div class="container">
          <div class="info-section">
            <h1 class="title">TAPACOS Autocinemas</h1>
            <p class="address">C. del Guadalquivir. 14010, Córdoba</p>
            <p class="contact">Tel : 963248910</p>
            <p class="email">Mail : info@tapacosautocinemas.com</p>
            <p class="summer-hours">Verano: Abierto todos los días</p>
            <p class="winter-closed">Invierno:L,M: Cerrado</p>
            <p class="winter-open">Invierno:J,V,S,D: Abierto</p>

          </div>
          <div class="map-section">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3149.5295046748156!2d-4.7708828246453345!3d37.87129790659489!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0xd6d207d83074089%3A0xc8ca16fc101afb4a!2sC.%20del%20Guadalquivir%2C%2014010%20C%C3%B3rdoba!5e0!3m2!1ses!2ses!4v1715812890043!5m2!1ses!2ses"
              style={{ border: 0, width: '300px', height: '300px' }}
              allowFullScreen=""
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            ></iframe>
          </div>
        </div>


        <hr />

      </main>
      <footer>
      </footer>
    </div>
  );
};
