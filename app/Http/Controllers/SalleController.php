<?php

namespace App\Http\Controllers;

use App\Models\Salle;
use Illuminate\Http\Request;

class SalleController extends Controller
{
    /**
     * Display a listing of active salles.
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function index()
    {
        $salles = Salle::where('active', true)->get();
        
        return response()->json($salles);
    }

    /**
     * Store a newly created salle in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\JsonResponse
     */
    public function store(Request $request)
    {
        $validated = $request->validate([
            'code' => 'required|unique:salles,code',
            'nom' => 'required',
            'capacite' => 'required|integer|min:1',
            'type' => 'nullable',
            'equipements' => 'nullable',
            'batiment' => 'nullable',
            'etage' => 'nullable|integer',
        ]);

        $salle = Salle::create($validated);

        return response()->json($salle, 201);
    }

    /**
     * Update the specified salle in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\JsonResponse
     */
    public function update(Request $request, $id)
    {
        $salle = Salle::find($id);

        if (!$salle) {
            return response()->json(['message' => 'Not Found'], 404);
        }

        $validated = $request->validate([
            'code' => 'required|unique:salles,code,' . $id,
            'nom' => 'required',
            'capacite' => 'nullable|integer|min:1',
            'type' => 'nullable',
            'equipements' => 'nullable',
            'batiment' => 'nullable',
            'etage' => 'nullable|integer',
        ]);

        $salle->update($validated);

        return response()->json($salle);
    }

    /**
     * Remove the specified salle from storage (soft delete).
     *
     * @param  int  $id
     * @return \Illuminate\Http\JsonResponse
     */
    public function destroy($id)
    {
        $salle = Salle::find($id);

        if (!$salle) {
            return response()->json(['message' => 'Not Found'], 404);
        }

        $salle->update(['active' => false]);

        return response()->json(['message' => 'Salle désactivée']);
    }
}
