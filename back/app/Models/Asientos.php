<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Asientos extends Model
{
    use HasFactory;

    protected $fillable = ['idPelicula', 'usuario_id', 'asiento_numero', 'estado', 'fecha', 'nombre_pelicula'];

    // Definir la relación con el modelo Pelicula
    public function pelicula()
    {
        return $this->belongsTo(Pelicula::class, 'idPelicula');
    }
}
