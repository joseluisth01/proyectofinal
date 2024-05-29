<?php

use App\Http\Controllers\AsientosController;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\PeliculasControllador;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "api" middleware group. Make something great!
|
*/

Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});

Route::post('/register', [AuthController::class, 'createUser']);
Route::post('/login', [AuthController::class, 'loginUser']);
Route::post('/getId', [AuthController::class, 'getId']);

Route::post('/insertarPelicula', [PeliculasControllador::class, 'insertarPelicula']);
Route::post('/insertarEstreno', [PeliculasControllador::class, 'insertarEstreno']);

/* INSERTAR PELICULA EN FRONT */
Route::get('/peliculas', [PeliculasControllador::class, 'obtenerPeliculas']);
Route::get('/estrenos', [PeliculasControllador::class, 'obtenerEstrenos']);


/* DATOS PELICULAS */
Route::get('/peliculas/detalles', [PeliculasControllador::class, 'obtenerPeliculasConDetalles']);

/*BORRAR PELICULAS*/
Route::delete('/borrarPeliculas', [PeliculasControllador::class, 'borrarPeliculas']);
Route::delete('/borrarEstrenos', [PeliculasControllador::class, 'borrarEstrenos']);


Route::get('/asientos/{idPelicula}', [AsientosController::class, 'getAsientos']);
Route::post('/reservarAsientos', [AsientosController::class, 'reservarAsientos']);

/* DATOS */
Route::middleware('auth:sanctum')->get('/profile', [AuthController::class, 'getUserProfile']);

