import React from 'react'
import PeliculasList from '../componentes/PeliculasList'
import { Header } from '../componentes/Header'

export const Cartelera = () => {
  return (
    <div className="fondo">
        <Header/>
        <PeliculasList/>
    </div>
  )
}
