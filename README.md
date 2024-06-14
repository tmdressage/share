2024/6/13新規作成
# アプリケーション名
share（Twitter風SNSアプリ）

## 作成した目的
フロントエンド学習用
 
## アプリケーションURL
http://localhost/login<br>
<br>
※PhpMyAdmin<br>
http://localhost:8080/

## 他のリポジトリ  
無し

## 機能一覧
**基本機能**<br>
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
環境：Docker Desktop v4.23.0<br>
言語：PHP 7.4.9、JQuery 3.7.1<br>
フレームワーク：Laravel 8<br>
DB：mysql 8.0.26<br>
WEBサーバソフトウェア：nginx 1.21.1<br>
エディタ：VSCode 1.84.0<br>

## テーブル設計


## ER図


## 環境構築
**1、リポジトリの設定**<br>
※自身でGitHubに開発履歴を残さない場合は、下記の工程⓵のみ行います。<br>
<br>
<br>
⓵開発環境をGitHub からクローンする<br>
※~/coachtechディレクトリ配下のlaravelディレクトリで作業を行う場合を想定して記載します。<br>
```
コマンドライン上
$ cd coachtech/laravel
$ git clone git@github.com:tmdressage/share.git
$ mv rese 任意のディレクトリ名
```

<br>
⓶GitHubでリモートリポジトリをpublicで作成する<br>
※リポジトリ名は前項で作成した任意のディレクトリ名を使用します。<br>

<br>
<br>
⓷リポジトリの紐付け先を変更する<br>

```
コマンドライン上
$ cd ⓵で作成したディレクトリ名
$ git remote set-url origin ⓶で作成したリモートリポジトリのSSHのurl
$ git remote -v
```

<br>
⓸ローカルリポジトリにあるデータを⓶で作成したリモートリポジトリに反映させる<br>

```
コマンドライン上
$ git add .
$ git commit -m "リモートリポジトリの変更"
$ git push origin main
```
<br>

**2、Dockerの設定**<br>
<br>
⓵Dockerの環境を構築する<br>

```
コマンドライン上
$ cd 工程1‐⓵で作成した任意のディレクトリ名
$ docker-compose up -d --build
```
※Docker Desktopでディレクトリ名のコンテナが作成され、起動していれば成功です。
<br>
<br>

**3、Laravelの設定**<br>
<br>
⓵Laravel のパッケージをインストールする<br>
```
コマンドライン上
$ docker-compose exec php bash
```
```
※PHPコンテナ上
$ composer install
$ exit
```
<br>

**4、.envファイルの作成**<br>
<br>
⓵.env.exampleファイルをコピーして作成する<br>
```
コマンドライン上
$ cd src/
$ cp .env.example .env
```
<br>
⓶以下のコードを.envファイルに上書きで貼り付ける<br>
※変更箇所はDBとメールの箇所です。

```
APP_NAME=Laravel
APP_ENV=local
APP_KEY=
APP_DEBUG=true
APP_URL=http://localhost

LOG_CHANNEL=stack
LOG_DEPRECATIONS_CHANNEL=null
LOG_LEVEL=debug

DB_CONNECTION=mysql
DB_HOST=mysql
DB_PORT=3306
DB_DATABASE=laravel_db
DB_USERNAME=laravel_user
DB_PASSWORD=laravel_pass

BROADCAST_DRIVER=log
CACHE_DRIVER=file
FILESYSTEM_DRIVER=local
QUEUE_CONNECTION=sync
SESSION_DRIVER=file
SESSION_LIFETIME=120

MEMCACHED_HOST=127.0.0.1

REDIS_HOST=127.0.0.1
REDIS_PASSWORD=null
REDIS_PORT=6379

MAIL_MAILER=smtp
MAIL_HOST=mail
MAIL_PORT=1025
MAIL_USERNAME=null
MAIL_PASSWORD=null
MAIL_ENCRYPTION=null
MAIL_FROM_ADDRESS="admin@rese.com"
MAIL_FROM_NAME="Rese"

WWWGROUP=1000
WWWUSER=1000

AWS_ACCESS_KEY_ID=
AWS_SECRET_ACCESS_KEY=
AWS_DEFAULT_REGION=us-east-1
AWS_BUCKET=
AWS_USE_PATH_STYLE_ENDPOINT=false

PUSHER_APP_ID=
PUSHER_APP_KEY=
PUSHER_APP_SECRET=
PUSHER_APP_CLUSTER=mt1

MIX_PUSHER_APP_KEY="${PUSHER_APP_KEY}"
MIX_PUSHER_APP_CLUSTER="${PUSHER_APP_CLUSTER}"
```

<br>
⓷以下のコードでAPP_KEYをセットする<br>

```
コマンドライン上
$ docker-compose exec php bash
```
```
※PHPコンテナ上
$ php artisan key:generate
```
<br>
<br>

**5、テーブルの作成**<br>
<br>
⓵下記コマンドでマイグレーションを行う<br>
```
※PHPコンテナ上
$ php artisan migrate
```

※http://localhost:8080/ を開いてテーブルが作成出来ていれば成功です。
<br>
<br>



