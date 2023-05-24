<?php

use App\Http\Controllers\AuthController;
use App\Http\Controllers\ProductController;
use App\Http\Resources\UserResource;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\ResourceCollection;
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


Route::middleware('auth:sanctum')->group(static function () {
    Route::get('/all-products', [ProductController::class, 'index']);
    Route::get('/user-products', [ProductController::class, 'show']);
    Route::put('/update-product/{product}', [ProductController::class, 'update']);
    Route::delete('/delete-product/{product}', [ProductController::class, 'destroy']);
    Route::post('/logout', [AuthController::class, 'logout']);
    Route::get('/user', function (Request $request) {
        return $request->user();
    });
    Route::get('/users', function () {
        $users = User::all();
        $userCollection = new ResourceCollection($users, UserResource::class);
        return $userCollection;
    });
    
    Route::post('/add-new-product/{id}', [ProductController::class, 'store']);
});

Route::post('/signup', [AuthController::class, 'signup']);
Route::post('/login', [AuthController::class, 'login']);
