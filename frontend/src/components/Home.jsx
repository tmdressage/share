/* 「useState」と「useEffect」をimport↓ */
import React, { useState, useEffect } from "react";
/* 「signOut」をimport↓ */
/* 「onAuthStateChanged」と「auth」をimport↓ */
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "./FirebaseConfig.jsx";
/* ↓「useNavigate」をimport */
/* ↓「Navigate」をimport */
import { Navigate } from "react-router-dom";

const Home = () => {
  /* ↓state変数「user」を定義 */
  const [user, setUser] = useState("");

  /* ↓state変数「loading」を定義 */
  const [loading, setLoading] = useState(true);

  /* ↓ログインしているかどうかを判定する */
  useEffect(() => {
    onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      /* ↓追加 */
      setLoading(false);
    });
  }, []);

  return (
    <>
      {/* ↓「loading」がfalseのときにマイページを表示する設定 */}
      {!loading && (
        <>
          {/* ↓ログインしていない場合はログインページにリダイレクトする設定 */}
          {!user ? (
            <Navigate to={`/login`} />
          ) : (
            <>
              <div className="home">
                <div className="home__title">
                  <p className="home__title--text">ホーム</p>
                </div>
                <div className="post">
                  <div className="post__content">
                    <p className="post__content--name">test</p>
                    <img
                      className="post__content--like"
                      src="img/heart.png"
                      alt="like"
                    ></img>
                    <p className="post__content--count">1</p>
                    <img
                      className="post__content--delete"
                      src="img/cross.png"
                      alt="delete"
                    ></img>
                    <img
                      className="post__content--detail"
                      src="img/detail.png"
                      alt="detail"
                    ></img>
                  </div>
                  <div className="post__message">
                    <p className="post__message--text">test message</p>
                  </div>
                </div>
                <div className="comment">
                  <p className="comment__title">コメント</p>
                </div>
                <div className="comment__content">
                  <p className="comment__content--name">test</p>
                  <p className="comment__content--detail">test message</p>
                </div>
                <div className="comment__post">
                  <textarea
                    className="textarea"
                    name="text"
                    cols="133"
                    rows="1"
                    id="count"
                  ></textarea>
                  <div className="comment__post-button">
                    <button className="comment-button">コメント</button>
                  </div>
                </div>
              </div>
            </>
          )}
        </>
      )}
    </>
  );
};

export default Home;
