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
  const [errors, setErrors] = useState({});
  const [user, setUser] = useState(null);

  const handleRegister = async (e) => {
    e.preventDefault();
    setErrors({});
    try {
      // Laravelのバックエンドにユーザー情報を送信
      await axios.post("http://localhost/api/register", {
        name: registerName,
        email: registerEmail,
        password: registerPassword,
      });

      // バリデーション成功後にFirebase Authenticationにユーザーを登録
      await createUserWithEmailAndPassword(
        auth,
        registerEmail,
        registerPassword
      );

      console.log("登録成功");
    } catch (error) {
      if (error.response && error.response.data && error.response.data.errors) {
        // Laravelのバリデーションエラーメッセージを設定
        setErrors(error.response.data.errors);
      } else {
        setErrors({ general: "登録内容でエラーが発生しました" });
      }
      console.error("登録失敗", error);
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
          {errors.name && (
            <p className="register__content--error" style={{ color: "red" }}>
              {errors.name[0]}
            </p>
          )}
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
          {errors.email && (
            <p className="register__content--error" style={{ color: "red" }}>
              {errors.email[0]}
            </p>
          )}
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
        <button className="register__content--button">新規登録</button>
      </form>
    </div>
  );
};

export default Register;
