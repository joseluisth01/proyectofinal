<?php

namespace App\Http\Controllers;

use App\Models\Asientos;
use Exception;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
class AsientosController extends Controller
{
    //

    public function getAsientos($idPelicula)
    {
        $asientos = Asientos::where('idPelicula', $idPelicula)->get();
        return response()->json(['asientos' => $asientos]);
    }

    public function reservarAsientos(Request $request)
    {
        $idPelicula = $request->input('idPelicula');
        $asientosSeleccionados = $request->input('asientosSeleccionados');
        $usuarioId = $request->input('usuarioId');

        try {
            \DB::transaction(function () use ($idPelicula, $asientosSeleccionados, $usuarioId) {
                foreach ($asientosSeleccionados as $asientoNumero) {
                    Asientos::where('idPelicula', $idPelicula)
                        ->where('asiento_numero', $asientoNumero)
                        ->update(['estado' => 'ocupado', 'usuario_id' => $usuarioId]);
                }
            });

            return response()->json(['mensaje' => 'Asientos reservados exitosamente']);
        } catch (Exception $e) {
            return response()->json(['error' => 'Error reservando asientos', 'message' => $e->getMessage()], 500);
        }
    }
}
