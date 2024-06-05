import React, { useState, useEffect } from "react";
import { signInWithEmailAndPassword, onAuthStateChanged } from "firebase/auth";
import { auth } from "./FirebaseConfig.jsx";
import { Navigate } from "react-router-dom";

const Login = () => {
  const [loginEmail, setLoginEmail] = useState("");
  const [loginPassword, setLoginPassword] = useState("");
  const [error, setError] = useState(null);
  const [user, setUser] = useState(null);

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      await signInWithEmailAndPassword(auth, loginEmail, loginPassword);
      console.log("ログイン成功");
    } catch (error) {
      setError("! メールアドレスまたはパスワードが間違っています。");
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
      <form onSubmit={handleLogin}>
        <div className="login__content--email">
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
          <input
            name="password"
            type="password"
            value={loginPassword}
            onChange={(e) => setLoginPassword(e.target.value)}
            placeholder="パスワード"
            required
          />
        </div>
        {error && (
          <p className="login__content--error" style={{ color: "red" }}>
            {error}
          </p>
        )}
        <button className="login__content--button">ログイン</button>
      </form>
    </div>
  );
};

export default Login;
