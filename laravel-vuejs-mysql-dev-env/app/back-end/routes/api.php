<?php

use App\Http\Controllers\UserController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

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

Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});

// Auth routes
Route::post('/auth/login', [UserController::class, 'login']);
Route::post('/auth/register', [UserController::class, 'register']);

// Task Routes
Route::get('/tasks', function (Request $request) {
    return "hello";
});
Route::get('/tasks/{id}', function (Request $request, $id) {
    return "hello";
});
Route::post('/tasks', function (Request $request) {
    return "hello";
});
Route::post('/tasks/{id}', function (Request $request, $id) {
    return "hello";
});
