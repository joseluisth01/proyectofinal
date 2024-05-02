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
                'movieId' => 'required|string',
            ]);
    
            $peli = new Pelicula();
            $peli->idPelicula = $request->movieId;
            $peli->nombre = 'prueba';
            $peli->save();
    
            return response()->json(['message' => 'Pelicula agregada correctamente'], 201);
        } catch (\Exception $e) {
            return response()->json(['message' => 'Error al insertar película: ' . $e->getMessage()], 500);
        }
    }
}
