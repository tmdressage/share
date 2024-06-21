<p align="center"><a href="https://laravel.com" target="_blank"><img src="https://raw.githubusercontent.com/laravel/art/master/logo-lockup/5%20SVG/2%20CMYK/1%20Full%20Color/laravel-logolockup-cmyk-red.svg" width="400"></a></p>

<p align="center">
<a href="https://travis-ci.org/laravel/framework"><img src="https://travis-ci.org/laravel/framework.svg" alt="Build Status"></a>
<a href="https://packagist.org/packages/laravel/framework"><img src="https://img.shields.io/packagist/dt/laravel/framework" alt="Total Downloads"></a>
<a href="https://packagist.org/packages/laravel/framework"><img src="https://img.shields.io/packagist/v/laravel/framework" alt="Latest Stable Version"></a>
<a href="https://packagist.org/packages/laravel/framework"><img src="https://img.shields.io/packagist/l/laravel/framework" alt="License"></a>
</p>

2024/6/13新規作成
# アプリケーション名
share（Twitter風SNSアプリ）<br>
![スクリーンショット 2024-06-21 111228](https://github.com/tmdressage/share/assets/144135026/a9f344c1-b877-49a5-b43a-1e9d61e865f3)

## 作成した目的
フロントエンド自己学習用。<br>
フロントエンドにreact.js、バックエンドにlaravel(php)を用いて作成しました。<br>
認証機能にはFirebaseを使用しています。<br>
 
## アプリケーションURL
http://localhost/login<br>
<br>
※PhpMyAdmin<br>
http://localhost:8080/

## 他のリポジトリ  
無し

## 機能一覧
・会員登録<br>
・ログイン<br>
・ログアウト<br>
・会員情報取得<br>
・投稿一覧取得<br>
・投稿追加<br>
・投稿削除<br>
・いいね追加<br>
・いいね削除<br>
・コメント一覧取得<br>
・コメント追加<br>
 
## 使用技術（実行環境）
OS：Linux（Ubuntu）<br>
環境：Docker Desktop 4.23.0<br>
言語：PHP 8.2.10、javascript<br>
ライブラリ：React.js 18.3.1<br>
フレームワーク：Laravel 8.83.27<br>
DB：mysql 8.0.26<br>
WEBサーバソフトウェア：nginx 1.21.1<br>
エディタ：VSCode 1.90.2<br>

## テーブル設計
![スクリーンショット 2024-06-21 113833](https://github.com/tmdressage/share/assets/144135026/dc2a5526-d5cc-4f29-a5aa-923962c33ac3)

## ER図
![スクリーンショット 2024-06-21 113529](https://github.com/tmdressage/share/assets/144135026/a910c3b1-24bc-47e6-9918-54c3ad6215c9)

## 環境構築
**1、Gitのクローン**<br>
<br>
(コマンドライン上)<br>
```
$ git clone git@github.com:tmdressage/share.git
```
<br>

**2、Docker環境の構築**<br>
<br>
(コマンドライン上)<br>
```
$ docker-compose up -d --build
```
<br>

**3、Laravelの設定**<br>
<br>
(コマンドライン上)<br>
```
$ docker-compose exec php bash
```
(PHPコンテナ内)<br>
```
$ composer install
```
<br>

**4、.envファイルの作成**<br>
<br>
(コマンドライン上)<br>
```
$ cd frontend/src/
$ touch .env
$ cd ../../
$ cd backend/src/
$ cp .env.example .env
$ cd ../
$ docker-compose exec php bash
```
(PHPコンテナ内)<br>
```
$ php artisan key:generate
```
<br>
※Firebaseの認証情報が関わるため詳細は非公開とします。<br>

**5、テーブルの作成**<br>
<br>
(PHPコンテナ内)<br>
```
$ php artisan migrate --seed
```
<br>
