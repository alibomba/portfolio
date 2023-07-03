<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\PostController;
use App\Http\Controllers\UserController;
use App\Http\Controllers\ContactController;
use App\Http\Controllers\AppointmentController;

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

// Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
//     return $request->user();
// });


Route::get('/appointments/{date}', [AppointmentController::class, 'getBusyHours']);

Route::post('/appointments', [AppointmentController::class, 'store']);

Route::get('/posts', [PostController::class, 'index']);

Route::get('/posts/{post}', [PostController::class, 'show']);

Route::post('/contact', [ContactController::class, 'store']);

Route::post('/login', [UserController::class, 'login']);

Route::group(['middleware' => 'jwt.auth'], function () {
    Route::get('/is-authorized', [UserController::class, 'isAuthorized']);

    Route::post('/posts', [PostController::class, 'store']);

    Route::put('/posts/{post}', [PostController::class, 'update']);

    Route::delete('/posts/{post}', [PostController::class, 'destroy']);

    Route::post('/logout', [UserController::class, 'logout']);

    Route::post('/email', [ContactController::class, 'changeEmail']);

    Route::get('/email', [ContactController::class, 'getEmail']);

    Route::get('/appointments', [AppointmentController::class, 'index']);
});
