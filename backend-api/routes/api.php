<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Api\V1\ProjectController;
use App\Http\Controllers\Api\V1\AuthController;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
*/

// Public routes
Route::post('/register', [AuthController::class, 'register']);
Route::post('/login', [AuthController::class, 'login']);

// Protected routes
Route::group(['middleware' => 'auth:sanctum'], function () {
    Route::post('/logout', [AuthController::class, 'logout']);
    Route::get('/me', [AuthController::class, 'me']);

    Route::post('/projects', [ProjectController::class, 'store']);
    Route::get('/projects', [ProjectController::class, 'index']);
    Route::get('/projects/{id}', [ProjectController::class, 'show']);
    Route::put('/projects/{id}', [ProjectController::class, 'update']);
    Route::delete('/projects/{id}', [ProjectController::class, 'destroy']);
    
    // Additional workflow actions
    Route::post('/milestones/{id}/fund', [ProjectController::class, 'fundMilestone']);
    Route::post('/milestones/{id}/release', [ProjectController::class, 'releaseMilestone']);
});
