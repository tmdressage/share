<?php

namespace App\Http\Controllers;

// use App\Http\Requests\LoginRequest;
// use App\Http\Requests\RegisterRequest;
// use Kreait\Firebase\Auth;
// use Illuminate\Support\Facades\Auth;
use Illuminate\Http\Request;
use App\Models\User;
use Illuminate\Support\Facades\Hash;

class AuthController extends Controller
{
    // protected $auth;

    // public function __construct(Auth $auth)
    // {
    //     $this->auth = $auth;
    // }


    public function register(Request $request)
    {
        $user = User::create([
            'name' => $request->input('name'),
            'email' => $request->input('email'),
            'password' => Hash::make($request->input('password')),
        ]);

        // ユーザー登録成功時の処理
        return response()->json(['message' => 'User registered successfully', 'user' => $user]);
    }

    public function login(Request $request)
    {
        // フロントエンドから送信されたユーザー情報を使用
        $email = $request->input('email');
        // ユーザー情報を取得
        $user = User::where('email', $email)->first();
        if ($user) {
            return response()->json(['message' => 'User logged in successfully', 'user' => $user]);
        } else {
            return response()->json(['message' => 'User not found']);
        }
    }
}
