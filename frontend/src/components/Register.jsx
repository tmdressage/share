/* 「useEffect」をimport↓ */
import React, { useState, useEffect } from "react";
/* ↓「createUserWithEmailAndPassword」と「auth」をimport */
/* ↓「onAuthStateChanged」をimport */
import {
  createUserWithEmailAndPassword,
  onAuthStateChanged,
} from "firebase/auth";
import { auth } from "./FirebaseConfig.jsx";
/* 「Navigate」「Link」をimport↓ */
import { Navigate } from "react-router-dom";

const Register = () => {
    /* ↓state変数を定義 */
  const [registerName, setRegisterName] = useState("");
  const [registerEmail, setRegisterEmail] = useState("");
  const [registerPassword, setRegisterPassword] = useState("");
  const [error, setError] = useState(null);

  /* ↓関数「handleSubmit」を定義 */
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await createUserWithEmailAndPassword(
        auth,
        registerEmail,
        registerPassword
      );
        
    } catch (error) {
      setError("! 正しく入力してください");
    }
  };

  /* ↓state変数「user」を定義 */
  const [user, setUser] = useState("");

  /* ↓ログインしているかどうかを判定する */
  useEffect(() => {
    onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });
  }, []);

  return (
    <>
      {/* ↓ログインしていればマイページを表示 */}
      {user ? (
        <Navigate to={`/`} />
      ) : (
        <>
          <div className="register__content">
            <p className="register__content--title">新規登録</p>
            {/* onSubmitを追加↓ */}
            <form onSubmit={handleSubmit}>
              <div className="register__content--email">
                {/* ↓「value」と「onChange」を追加 */}
                <input
                  name="name"
                  type="text"
                  value={registerName}
                  onChange={(e) => setRegisterName(e.target.value)}
                  placeholder="ユーザーネーム"
                  required
                />
              </div>
              <div className="register__content--email">
                {/* ↓「value」と「onChange」を追加 */}
                <input
                  name="email"
                  type="email"
                  value={registerEmail}
                  onChange={(e) => setRegisterEmail(e.target.value)}
                  placeholder="メールアドレス"
                  required
                />
              </div>
              <div className="register__content--password">
                {/* ↓「value」と「onChange」を追加 */}
                <input
                  name="password"
                  type="password"
                  value={registerPassword}
                  onChange={(e) => setRegisterPassword(e.target.value)}
                  placeholder="パスワード"
                  required
                />
              </div>
              {/* エラーメッセージの表示 */}
              {error && (
                <p
                  className="register__content--error"
                  style={{ color: "red" }}
                >
                  {error}
                </p>
              )}
              <button className="register__content--button">新規登録</button>
            </form>
          </div>
        </>
      )}
    </>
  );
};

export default Register;
