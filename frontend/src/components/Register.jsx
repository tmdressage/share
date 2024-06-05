import React, { useState, useEffect } from "react";
import {
  onAuthStateChanged,
  createUserWithEmailAndPassword,
} from "firebase/auth";
import { auth } from "./FirebaseConfig";
import { Navigate } from "react-router-dom";
import axios from "axios";

const Register = () => {
  const [registerName, setRegisterName] = useState("");
  const [registerEmail, setRegisterEmail] = useState("");
  const [registerPassword, setRegisterPassword] = useState("");
  const [error, setError] = useState(null);
  const [user, setUser] = useState(null);

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      // Firebase Authenticationにユーザーを登録
      await createUserWithEmailAndPassword(
        auth,
        registerEmail,
        registerPassword
      );

      // Laravelのバックエンドにユーザー情報を送信
      await axios.post("http://localhost/api/register", {
        name: registerName,
        email: registerEmail,
        password: registerPassword,
      });

      console.log("登録成功");
    } catch (error) {
      setError("登録内容でエラーが発生しました");
      console.error("登録失敗");
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
    <div className="register__content">
      <p className="register__content--title">新規登録</p>
      <form onSubmit={handleRegister} noValidate>
        <div className="register__content--email">
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
          <input
            name="password"
            type="password"
            value={registerPassword}
            onChange={(e) => setRegisterPassword(e.target.value)}
            placeholder="パスワード"
            required
          />
        </div>
        {error && (
          <p className="register__content--error" style={{ color: "red" }}>
            {error}
          </p>
        )}
        <button className="register__content--button">新規登録</button>
      </form>
    </div>
  );
};

export default Register;