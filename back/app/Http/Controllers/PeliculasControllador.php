<?php

namespace App\Http\Controllers;

use App\Models\Pelicula;
use Illuminate\Http\Request;
use GuzzleHttp\Client;

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



    public function obtenerPeliculasConDetalles()
    {
        $client = new Client();
        $peliculas = Pelicula::all();
        $apiKey = 'tu_api_key';
        $detallesPeliculas = [];

        foreach ($peliculas as $pelicula) {
            $url = "https://api.themoviedb.org/3/movie/{$pelicula->idPelicula}?api_key={$apiKey}&language=es-ES";
            try {
                $response = $client->request('GET', $url);
                $data = json_decode($response->getBody()->getContents(), true);
                $detallesPeliculas[] = [
                    'id' => $pelicula->id,
                    'idPelicula' => $pelicula->idPelicula,
                    'nombrePelicula' => $data['title'] ?? 'Título no disponible',
                    'poster_path' => $data['poster_path'] ? 'https://image.tmdb.org/t/p/w500' . $data['poster_path'] : null,
                    'fecha' => $pelicula->fecha,
                    'hora' => $pelicula->hora
                ];
            } catch (\Exception $e) {
                continue;  // Si falla una petición, continua con la siguiente película
            }
        }

        return response()->json($detallesPeliculas);
    }




}
