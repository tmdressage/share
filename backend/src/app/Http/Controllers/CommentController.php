<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Comment;
use App\Http\Requests\CommentRequest;
// use Kreait\Firebase\Auth;
// use Illuminate\Support\Facades\Auth;

class CommentController extends Controller
{
    // コメントの取得
    public function index($postId)
    {

        $comments = Comment::where('post_id', $postId)->with('user:id,name')->orderBy('updated_at', 'desc')->get();
  
        return response()->json(['comments' => $comments]);
    }

    // コメントの投稿
    public function store(Request $request, $postId)    {

        $comment = $request->input('comment');
        $user_id = $request->input('user_id');
         // ログインユーザーのIDを取得

        Comment::create([
            'user_id' => $user_id,
            'post_id' => $postId,           
            'comment' => $comment,
        ]);

        return response()->json(['comment' => $comment]);
    }
}
