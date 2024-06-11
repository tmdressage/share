<?php

namespace App\Http\Controllers;

use App\Http\Requests\LoginRequest;
use App\Http\Requests\RegisterRequest;
use App\Models\User;
use Illuminate\Support\Facades\Hash;
use Kreait\Firebase\Contract\Auth;

class AuthController extends Controller
{
    protected $auth;

    public function __construct(Auth $auth)
    {
        $this->auth = $auth;
    }

    public function register(RegisterRequest $request)
    {
        $user = User::create([
            'name' => $request->input('name'),
            'email' => $request->input('email'),
            'password' => Hash::make($request->input('password')),
        ]);

        return response()->json(['user' => $user]);
    }

    public function login(LoginRequest $request)
    {
        
        // フロントエンドから送信されたユーザー情報を使用
        $email = $request->input('email');
        // ユーザー情報を取得
        $user = User::where('email', $email)->first();
        if ($user) {
            return response()->json(['user' => $user]);
        } else {
            return response()->json(['error' => 'ユーザが見つかりませんでした'], 404);
        }
    }
    
}
