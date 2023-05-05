<?php

namespace App\Http\Controllers;

use App\Models\ApiResponse;
use App\Models\User;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

class UserController extends Controller
{

    /**
     * Login user
     * @param Request $request
     * @return JsonResponse
     */
    public function login(Request $request): JsonResponse
    {
        try {
            $user = User::query()->where('email', $request->email)->first();

            if ($user && $user->password === $request->password) {
                return response()->json(
                    new ApiResponse($user, "Incorrect username or password"),
                    200
                );
            }

            return response()->json(
                new ApiResponse(401, "Incorrect username or password"),
                401
            );
        } catch (\Exception $e) {
            report($e);
            return response()->json(
                new ApiResponse(500, "An error occurred"),
                500
            );
        }
    }

    /**
     * Register a new user
     * @param Request $request
     * @return JsonResponse
     */
    public function register(Request $request): JsonResponse
    {
        try {
            $user = User::query()->where('email', $request->email)->first();

            if ($user) {
                return response()->json(
                    new ApiResponse(409, "User already exists"),
                    409
                );
            }

            $user = User::query()->create([
                'email' => $request->email,
                'password' => $request->password,
            ]);

            return response()->json(
                new ApiResponse($user, "User created successfully"),
                201
            );
        } catch (\Exception $e) {
            report($e);
            return response()->json(
                new ApiResponse(500, "Internal server error"),
                500
            );
        }
    }
}
