<?php

namespace App\Providers;

use Illuminate\Support\ServiceProvider;
use Kreait\Firebase\Factory;
use Kreait\Firebase\Auth;
use Illuminate\Support\Facades\Log;

class FirebaseServiceProvider extends ServiceProvider
{
    public function register()
    {
        $this->app->singleton(Auth::class, function ($app) {
            $firebaseConfig = env('FIREBASE_CREDENTIALS');
            Log::info('Firebase credentials file path: "' . $firebaseConfig . '"'); // デバッグ用のログ出力

            if (is_null($firebaseConfig)) {
                Log::error('Firebase credentials file path is null.');
                throw new \Exception("Firebase credentials file path is null.");
            }

            if (!file_exists($firebaseConfig)) {
                Log::error('Firebase credentials file not found: "' . $firebaseConfig . '"');
                throw new \Exception("Firebase credentials file not found: {$firebaseConfig}");
            }

            Log::info('Firebase credentials file found: "' . $firebaseConfig . '"'); // ファイルが見つかったことをログに記録

            $factory = (new Factory)->withServiceAccount($firebaseConfig);
            return $factory->createAuth();
        });
    }

    public function boot()
    {
        //
    }
}
