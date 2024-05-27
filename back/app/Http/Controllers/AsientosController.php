<?php

namespace App\Http\Controllers;

use App\Models\Asientos;
use Illuminate\Http\Request;

class AsientosController extends Controller
{
    //

    public function getAsientos($idPelicula)
    {
        $asientos = Asientos::where('idPelicula', $idPelicula)->get();
        return response()->json(['asientos' => $asientos]);
    }
}
