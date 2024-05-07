<?php

namespace App\Http\Controllers;

use App\Models\Pelicula;
use Illuminate\Http\Request;

class PeliculasControllador extends Controller
{
    //

    public function insertarPelicula(Request $request)
    {
        try {
            $request->validate([
                'idPelicula' => 'required|int',
                'nombrePelicula' => 'required|string',
                'fecha' => 'required|string',
                'hora' => 'required|string',
            ]);
    
            $peli = new Pelicula();
            $peli->idPelicula = $request->idPelicula;
            $peli->nombrePelicula = $request->nombrePelicula;
            $peli->fecha = $request->fecha;
            $peli->hora = $request->hora;
            $peli->save();
    
            return response()->json(['message' => 'Pelicula agregada correctamente'], 201);
        } catch (\Exception $e) {
            return response()->json(['message' => 'Error al insertar película: ' . $e->getMessage()], 500);
        }
    }

    public function obtenerPeliculas()
    {
        try {
            $peliculas = Pelicula::all();
            return response()->json(['peliculas' => $peliculas], 200);
        } catch (\Exception $e) {
            return response()->json(['message' => 'Error al obtener películas: ' . $e->getMessage()], 500);
        }
    }

}
