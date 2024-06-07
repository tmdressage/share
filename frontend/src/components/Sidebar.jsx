import React, { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom"; // useLocationをインポート
import { signOut } from "firebase/auth";
import { auth } from "./FirebaseConfig.jsx";
import axios from "axios";

const Sidebar = ({ userDetails, setPosts }) => {
  const navigate = useNavigate();
  const location = useLocation(); // 現在のパスを取得
  const [post, setPost] = useState("");
  const [errors, setErrors] = useState({});

  const logout = async () => {
    await signOut(auth);
    navigate("/login");
  };

  const home = async () => {
    navigate("/");
  };

  const sharePost = async (e) => {
    e.preventDefault();
    setErrors({});
    try {
        // Laravelのバックエンドに投稿情報を送信
      await axios.post("http://localhost/api/posts", {
        post,
        user_id: userDetails.id,
      });
      const response = await axios.get("http://localhost/api/posts");
      setPosts(response.data.posts); // 投稿成功後にsetPostsを画面に呼び出し
      setPost(""); // 投稿成功後にpostをリセット
      console.log("保存成功");
    } catch (error) {
      if (error.response && error.response.data && error.response.data.errors) {
        // Laravelのバリデーションエラーメッセージを設定
        setErrors(error.response.data.errors);
      } else {
        setErrors({ general: "登録内容でエラーが発生しました" });
      }
      console.error("保存失敗", error);
    }
  };

  const isCommentPage = location.pathname.includes("/comments"); // 現在のパスがコメントページかどうかを判定

  return (
    <div className="sidebar">
      <div className="sidebar__content">
        <img
          className="sidebar__content--logo"
          src={"/img/logo.png"} //JavaScriptの式として渡す場合: src={"/img/logo.png"}のように括弧で囲むと、JavaScriptの式として評価されます。これは通常、プロジェクトのpublicディレクトリからの相対パスとして正しく解釈されます。publicディレクトリからの相対パスで画像を表示するために、JavaScriptの式としてパスを渡す方法が一般的です。
          alt="Share"
        ></img>
        <div className="sidebar__content--post">
          <img
            className="sidebar__content--post-logo"
            src={"/img/home.png"}
            alt="home"
          ></img>
          <span className="nav-link" onClick={home}>
            ホーム
          </span>
        </div>
        <div className="sidebar__content--logout">
          <img
            className="sidebar__content--logout-logo"
            src={"/img/logout.png"}
            alt="logout"
          ></img>
          <span className="nav-link" onClick={logout}>
            ログアウト
          </span>
        </div>
        <div className="sidebar__content--share">
          {isCommentPage ? (
            <>
              <p className="sidebar__content--share-text-disabled">シェア</p>
              <form onSubmit={sharePost}>
                <textarea
                  disabled
                  className="textarea-disabled"
                  name="text"
                  cols="35"
                  rows="6"
                  id="count"
                  value={post}
                  onChange={(e) => setPost(e.target.value)}
                ></textarea>

                <div className="sidebar__content--share-button">
                  <button
                    className="share-button-disabled"
                    type="submit"
                    disabled
                  >
                    シェアする
                  </button>
                </div>
              </form>
            </>
          ) : (
            <>
              <p className="sidebar__content--share-text">シェア</p>
              <form onSubmit={sharePost}>
                <textarea
                  className="textarea"
                  name="text"
                  cols="35"
                  rows="6"
                  id="count"
                  value={post}
                  onChange={(e) => setPost(e.target.value)}
                ></textarea>
                {errors.post && (
                  <p
                    className="register__content--error"
                    style={{ color: "red" }}
                  >
                    {errors.post[0]}
                  </p>
                )}
                <div className="sidebar__content--share-button">
                  <button className="share-button" type="submit">
                    シェアする
                  </button>
                </div>
              </form>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
