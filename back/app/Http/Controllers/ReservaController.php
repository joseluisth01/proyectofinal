<?php

namespace App\Http\Controllers;

use App\Models\Asientos;
use Illuminate\Http\Request;
use Carbon\Carbon;

class ReservaController extends Controller
{
    public function getReservasPorUsuario($usuarioId)
    {
        $reservas = Asientos::where('usuario_id', $usuarioId)->with('pelicula')->get();

        $reservas->transform(function ($reserva) {
            $reserva->fecha = Carbon::parse($reserva->fecha)->toDateString();
            return $reserva;
        });

        return response()->json(['reservas' => $reservas], 200);
    }

    public function cancelarReserva($id)
    {
        try {
            $reserva = Asientos::findOrFail($id);
            $reserva->estado = 'libre';
            $reserva->save();
            return response()->json(['mensaje' => 'Reserva cancelada correctamente'], 200);
        } catch (\Exception $e) {
            return response()->json(['error' => 'No se pudo cancelar la reserva'], 500);
        }
    }
}
