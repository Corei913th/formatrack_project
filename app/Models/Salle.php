<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Salle extends Model
{
    /**
     * The attributes that are mass assignable.
     *
     * @var array<int, string>
     */
    protected $fillable = [
        'code',
        'nom',
        'type',
        'capacite',
        'equipements',
        'batiment',
        'etage',
        'active',
    ];

    /**
     * The attributes that should be cast.
     *
     * @var array<string, string>
     */
    protected $casts = [
        'capacite' => 'integer',
        'etage' => 'integer',
        'active' => 'boolean',
    ];
}
