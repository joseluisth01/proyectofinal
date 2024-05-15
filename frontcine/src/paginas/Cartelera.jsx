import React from 'react'
import PeliculasList from '../componentes/PeliculasList'
import { Header } from '../componentes/Header'
import { EstrenosList } from '../componentes/EstrenosList'

export const Cartelera = () => {
  return (
    <div className="fondo">
      <Header />
      <div class="cartelerapatida">
        <div className="carteleraizq">
          <PeliculasList />
        </div>
        <div className="carteleraderch">
          <EstrenosList/>
        </div>
      </div>
    </div>
  )
}
