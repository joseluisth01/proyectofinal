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

        <div
          class="max-w-md mx-auto relative overflow-hidden z-10 bg-gray-800 p-8 rounded-lg shadow-md before:w-24 before:h-24 before:absolute before:bg-purple-600 before:rounded-full before:-z-10 before:blur-2xl after:w-32 after:h-32 after:absolute after:bg-sky-400 after:rounded-full after:-z-10 after:blur-xl after:top-24 after:-right-12"
        >
          <h2 class="text-2xl font-bold text-white mb-6">Update Your Profile</h2>

          <form method="post" action="#">
            <div class="mb-4">
              <label class="block text-sm font-medium text-gray-300" for="name"
              >Full Name</label
              >
              <input
                class="mt-1 p-2 w-full bg-gray-700 border border-gray-600 rounded-md text-white"
                type="text"
              />
            </div>

            <div class="mb-4">
              <label class="block text-sm font-medium text-gray-300" for="email"
              >Email Address</label
              >
              <input
                class="mt-1 p-2 w-full bg-gray-700 border border-gray-600 rounded-md text-white"
                name="email"
                id="email"
                type="email"
              />
            </div>

            <div class="mb-4">
              <label class="block text-sm font-medium text-gray-300" for="bio"
              >Bio</label
              >
              <textarea
                class="mt-1 p-2 w-full bg-gray-700 border border-gray-600 rounded-md text-white"
                rows="3"
                name="bio"
                id="bio"
              ></textarea>
            </div>

            <div class="flex justify-end">
              <button
                class="bg-gradient-to-r from-purple-600 via-purple-400 to-blue-500 text-white px-4 py-2 font-bold rounded-md hover:opacity-80"
                type="submit"
              >
                Update Profile
              </button>
            </div>
          </form>
        </div>



        <hr />

      </main>
      <footer>
      </footer>
    </div>
  );
};
