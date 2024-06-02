<?php
namespace App\Http\Controllers;

use Carbon\Carbon;
use App\Models\Reserva;
use App\Models\Asientos;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class ReservaController extends Controller
{
    public function __construct()
    {
        $this->middleware('auth:api');
    }

    public function getReservasPorUsuario()
    {
        $usuarioId = Auth::id();
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
            if ($reserva->usuario_id !== Auth::id()) {
                return response()->json(['error' => 'No autorizado'], 403);
            }
            $reserva->estado = 'libre';
            $reserva->usuario_id = null; // Liberar el asiento
            $reserva->save();
            return response()->json(['mensaje' => 'Reserva cancelada correctamente'], 200);
        } catch (\Exception $e) {
            return response()->json(['error' => 'No se pudo cancelar la reserva'], 500);
        }
    }
   
public function obtenerReservas($usuarioId)
    {
        try {
            $reservas = Reserva::where('usuario_id', $usuarioId)->get();

            return response()->json([
                'success' => true,
                'reservas' => $reservas
            ], 200);
        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Error al recuperar las reservas'
            ], 500);
        }
    }

}
