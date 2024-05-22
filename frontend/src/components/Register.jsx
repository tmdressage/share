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
import { Navigate, Link } from "react-router-dom";

const Register = () => {
    /* ↓state変数を定義 */
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
            setError("正しく入力してください");
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
                    <h1>新規登録</h1>
                    <form onSubmit={handleSubmit}>
                        <div>
                            <label>メールアドレス</label>
                            {/* ↓「value」と「onChange」を追加 */}
                            <input
                                name="email"
                                type="email"
                                value={registerEmail}
                                onChange={(e) =>
                                    setRegisterEmail(e.target.value)
                                }
                            />
                        </div>
                        <div>
                            <label>パスワード</label>
                            {/* ↓「value」と「onChange」を追加 */}
                            <input
                                name="password"
                                type="password"
                                value={registerPassword}
                                onChange={(e) =>
                                    setRegisterPassword(e.target.value)
                                }
                            />
                        </div>
                        {/* ↓リンクを追加 */}
                        {error && <p style={{ color: "red" }}>{error}</p>}
                        <button>登録する</button>
                        <p>
                            ログインは<Link to={`/login`}>こちら</Link>
                        </p>
                    </form>
                </>
            )}
        </>
    );
};

export default Register;
