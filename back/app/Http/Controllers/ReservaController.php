<?php

namespace App\Http\Controllers;

use App\Models\Asientos; // Importar el modelo Asientos
use Illuminate\Http\Request;

class ReservaController extends Controller
{
    public function getReservasPorUsuario($usuarioId)
    {
        // Cambiar Reserva por Asientos en la consulta
        $reservas = Asientos::where('usuario_id', $usuarioId)->get();

        return response()->json(['reservas' => $reservas], 200);
    }
}
