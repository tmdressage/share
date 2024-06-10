<?php

namespace App\Http\Controllers;

use App\Models\Like;
use Illuminate\Http\Request;

class LikeController extends Controller
{

    public function Liked($postId)
    { 
        $likes = Like::where('post_id', $postId)->count();       
        return response()->json(['likes' => $likes]);
    }

    public function Like(Request $request, $postId)
    {
        $user_id = $request->input('user_id');  
        $already_like = Like::where('user_id', $user_id)->where('post_id', $postId)->first();

        //いいね登録されていなければレコードを作成（いいね登録）
        if (!$already_like) {
            Like::create([
                'user_id' => $user_id,
                'post_id' => $postId,
            ]);

            $likes = Like::where('post_id', $postId)->count();

            return response()->json(['likes' => $likes]);
        } else {
            // お気に入り登録されていたらレコードを削除（お気に入り解除）
            Like::where('post_id', $postId)->where('user_id', $user_id)->delete();

            $likes = Like::where('post_id', $postId)->count();

            return response()->json(['likes' => $likes]);
        }

    }
}
