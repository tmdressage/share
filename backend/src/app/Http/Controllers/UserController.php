<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;

// ユーザ情報の取得用
class UserController extends Controller
{
    public function getUserDetails(Request $request)
    {
        $email = $request->query('email');
        $user = User::where('email', $email)->first();
        if (!$user) {
            return response()->json(['error' => 'ユーザが見つかりませんでした'], 404);
        }
        return response()->json(['id' => $user->id, 'name' => $user->name ]);
    }
}
