<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Pelicula extends Model
{
    use HasFactory;

    protected $fillable = ['idPelicula', 'nombrePelicula', 'fecha', 'hora'];

    protected static function booted()
    {
        static::created(function ($pelicula) {
            for ($i = 1; $i <= 20; $i++) {
                \DB::table('asientos')->insert([
                    'idPelicula' => $pelicula->id,
                    'asiento_numero' => $i,
                    'estado' => 'libre',
                    'created_at' => now(),
                    'updated_at' => now(),
                ]);
            }
        });
    }
}
