<?php

use App\Http\Controllers\Api\AuthController;
use Illuminate\Support\Facades\Route;


// 5 tentatives par minutes pour une adresse ip
Route::post('/auth/login', [AuthController::class, 'login'])->middleware('throttle:5,1');

Route::middleware('auth:sanctum')->group(function () {
    Route::post('/auth/logout', [AuthController::class, 'logout']);
    Route::post('/auth/refresh', [AuthController::class, 'refresh']);
});

