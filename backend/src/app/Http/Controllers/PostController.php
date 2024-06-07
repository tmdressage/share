<?php

namespace App\Http\Controllers;

use App\Models\Post;
use App\Http\Requests\PostRequest;
// use Kreait\Firebase\Auth;
// use Illuminate\Support\Facades\Auth;

class PostController extends Controller
{

    public function index()
    {
        $posts = Post::with('user:id,name')->orderBy('updated_at', 'desc')->get();

        return response()->json(['posts' => $posts]);
    }

    public function store(PostRequest $request)
    {      
        $post = $request->input('post');
        $user_id = $request->input('user_id');
        // $user_id = Auth::user()->id;

        Post::create([
                'user_id' => $user_id,
                'post' => $post,
            ]);

        return response()->json(['post' => $post ]);
    }

    public function destroy($postId)
    {
        $post = Post::where('id', $postId)->delete();

        return response()->json(['post' => $post]);
    }

}
