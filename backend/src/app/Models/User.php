<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Laravel\Sanctum\HasApiTokens;
use Kreait\Firebase\Factory;
use Kreait\Firebase\ServiceAccount;


class User extends Authenticatable
{
    use HasApiTokens, HasFactory, Notifiable;

    /**
     * The attributes that are mass assignable.
     *
     * @var array<int, string>
     */
    protected $fillable = [
        'name',
        'email',
        'password',
    ];

    /**
     * The attributes that should be hidden for serialization.
     *
     * @var array<int, string>
     */
    protected $hidden = [
        'password',
        'remember_token',
    ];

    /**
     * The attributes that should be cast.
     *
     * @var array<string, string>
     */
    protected $casts = [
        'email_verified_at' => 'datetime',
    ];

    public function posts()
    {
        return $this->hasMany(Post::class);
    }

    public function Likes()
    {
        return $this->hasMany(Like::class);
    }

    public function Comments()
    {
        return $this->hasMany(Comment::class);
    }


    public function createFirebaseUser()
    {
        $factory = (new Factory)->withServiceAccount(config('firebase.credentials.file'));
        $auth = $factory->createAuth();

        $userProperties = [
            'email' => $this->email,
            'emailVerified' => false,
            'password' => $this->password, // プレーンテキストのパスワードを使用
            'displayName' => $this->name,
            'disabled' => false,
        ];

        try {
            $createdUser = $auth->createUser($userProperties);
            return $createdUser;
        } catch (\Kreait\Firebase\Exception\AuthException $e) {
            // エラーハンドリング
            throw new \Exception('Firebase Auth Error: ' . $e->getMessage());
        }
    }




}
