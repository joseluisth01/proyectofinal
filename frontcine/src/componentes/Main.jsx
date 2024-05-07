import React, { useState, useEffect } from 'react';
import '../style/mainstyle.css';
import { Slider } from './Slider';
import PeliculasList from './PeliculasList';


export const Main = () => {


  return (
    <div className='divmain'>

      <header>

      </header>
      <main>
        <Slider />
        <br /><br /><br /><br /><br />

        <PeliculasList />
        
      </main>
      <footer>

      </footer>

    </div>
  )
}
