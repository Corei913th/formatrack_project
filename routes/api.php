<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\SalleController;

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

Route::get('/salles', [SalleController::class, 'index']);
Route::post('/salles', [SalleController::class, 'store']);
Route::put('/salles/{id}', [SalleController::class, 'update']);
Route::delete('/salles/{id}', [SalleController::class, 'destroy']);
