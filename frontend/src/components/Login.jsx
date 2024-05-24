/* ↓新たに5つimportしています */
import React, { useState, useEffect } from "react";
import { signInWithEmailAndPassword, onAuthStateChanged } from "firebase/auth";
import { auth } from "./FirebaseConfig.jsx";
/* 「Link」をimport↓ */
import { Navigate } from "react-router-dom";

const Login = () => {
  /* ↓state変数を定義 */
  const [loginEmail, setLoginEmail] = useState("");
  const [loginPassword, setLoginPassword] = useState("");
  const [error, setError] = useState(null); // エラーメッセージのstate変数

  /* ↓関数「handleSubmit」を定義 */
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await signInWithEmailAndPassword(auth, loginEmail, loginPassword);
    } catch (error) {
      setError("! メールアドレスまたはパスワードが間違っています。");
    }
  };
  
  /* ↓ログインを判定する設定 */
  const [user, setUser] = useState();

  useEffect(() => {
    onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });
  });
 
  return (
    <>
      {/* ↓ログインしている場合、マイページにリダイレクトする設定 */}
      {user ? (
        <Navigate to={`/`} />
      ) : (
        <>
          <div className="login__content">
            <p className="login__content--title">ログイン</p>
            {/* onSubmitを追加↓ */}
            <form onSubmit={handleSubmit}>
              <div className="login__content--email">
                {/* ↓「value」と「onChange」を追加 */}
                <input
                  name="email"
                  type="email"
                  value={loginEmail}
                  onChange={(e) => setLoginEmail(e.target.value)}
                  placeholder="メールアドレス"
                  required
                />
              </div>
              <div className="login__content--password">
                {/* ↓「value」と「onChange」を追加 */}
                <input
                  name="password"
                  type="password"
                  value={loginPassword}
                  onChange={(e) => setLoginPassword(e.target.value)}
                  placeholder="パスワード"
                  required
                />
              </div>
              {/* エラーメッセージの表示 */}
              {error && (
                <p className="login__content--error" style={{ color: "red" }}>
                  {error}
                </p>
              )}
              <button className="login__content--button">ログイン</button>
            </form>
          </div>
        </>
      )}
    </>
  );
};

export default Login;
