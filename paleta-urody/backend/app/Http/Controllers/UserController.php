<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Tymon\JWTAuth\Facades\JWTAuth;
use Tymon\JWTAuth\Exceptions\JWTException;

class UserController extends Controller
{
    public function login(Request $request)
    {
        $credentials = $request->only('login', 'password');

        if($token = JWTAuth::attempt($credentials)) {
            return response()->json(['token' => $token]);
        }

        return response(['error' => 'Niepoprawny login lub hasło'], 401);
    }

    public function isAuthorized(Request $request)
    {
        return JWTAuth::check();
    }

    public function logout(Request $request)
    {
        $token = JWTAuth::parseToken();

        try {
            $token->invalidate();
        } catch(\Exception $e) {
            return response(['error' => 'Coś poszło nie tak'], 400);
        }

        // try {
        //     $token->blacklist();
        // } catch (\Exception $e) {
        //     return response(['error' => 'Coś poszło nie tak'], 400);
        // }

        return response()->json(['message' => 'Logout successful']);
    }
}
