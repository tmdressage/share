/* ↓新たに5つimportしています */
import React, { useState, useEffect } from "react";
import { signInWithEmailAndPassword, onAuthStateChanged } from "firebase/auth";
import { auth } from "./FirebaseConfig.jsx";
/* 「Link」をimport↓ */
import { Navigate, Link } from "react-router-dom";

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
            setError("メールアドレスまたはパスワードが間違っています");
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
                    <h1>ログインページ</h1>
                    {/* onSubmitを追加↓ */}
                    <form onSubmit={handleSubmit}>
                        <div>
                            <label>メールアドレス</label>
                            {/* ↓「value」と「onChange」を追加 */}
                            <input
                                name="email"
                                type="email"
                                value={loginEmail}
                                onChange={(e) => setLoginEmail(e.target.value)}
                            />
                        </div>
                        <div>
                            <label>パスワード</label>
                            {/* ↓「value」と「onChange」を追加 */}
                            <input
                                name="password"
                                type="password"
                                value={loginPassword}
                                onChange={(e) =>
                                    setLoginPassword(e.target.value)
                                }
                            />
                        </div>
                        {/* エラーメッセージの表示 */}
                        {error && <p style={{ color: "red" }}>{error}</p>}
                        <button>ログイン</button>
                        {/* ↓リンクを追加 */}
                        <p>
                            新規登録は<Link to={`/register`}>こちら</Link>
                        </p>
                    </form>
                </>
            )}
        </>
    );
};

export default Login;
