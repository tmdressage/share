import React, { useState, useEffect } from "react";
import { signInWithEmailAndPassword, onAuthStateChanged } from "firebase/auth";
import { auth } from "./FirebaseConfig";
import { Navigate } from "react-router-dom";
import axios from "axios";

const Login = () => {
  const [loginEmail, setLoginEmail] = useState("");
  const [loginPassword, setLoginPassword] = useState("");
  const [errors, setErrors] = useState({});
  const [user, setUser] = useState(null);

  const handleLogin = async (e) => {
    e.preventDefault();
    setErrors({});
    try {
      // Laravelのバックエンドにユーザー情報を送信
      await axios.post("http://localhost/api/login", {
        email: loginEmail,
        password: loginPassword,
      });

      // バリデーション成功後にFirebase Authenticationにログイン

      await signInWithEmailAndPassword(auth, loginEmail, loginPassword);
      console.log("ログイン成功");
    } catch (error) {
      if (error.response && error.response.data && error.response.data.errors) {
        // Laravelのバリデーションエラーメッセージを設定
        setErrors(error.response.data.errors);
      } else {
        setErrors({ general: "登録内容でエラーが発生しました" });
      }
      console.error("ログイン失敗", error);
    }
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });
    return () => unsubscribe();
  }, []);

  if (user) {
    return <Navigate to="/" />;
  }

  return (
    <div className="login__content">
      <p className="login__content--title">ログイン</p>
      <form onSubmit={handleLogin} noValidate>
        <div className="login__content--email">
          <input
            name="email"
            type="email"
            value={loginEmail}
            onChange={(e) => setLoginEmail(e.target.value)}
            placeholder="メールアドレス"
            required
          />
          {errors.email && (
            <p className="register__content--error" style={{ color: "red" }}>
              {errors.email[0]}
            </p>
          )}
        </div>
        <div className="login__content--password">
          <input
            name="password"
            type="password"
            value={loginPassword}
            onChange={(e) => setLoginPassword(e.target.value)}
            placeholder="パスワード"
            required
          />
          {errors.password && (
            <p className="register__content--error" style={{ color: "red" }}>
              {errors.password[0]}
            </p>
          )}
        </div>
        {errors.general && (
          <p className="register__content--error" style={{ color: "red" }}>
            {errors.general}
          </p>
        )}
        <button className="login__content--button">ログイン</button>
      </form>
    </div>
  );
};

export default Login;
