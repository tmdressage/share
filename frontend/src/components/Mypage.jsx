/* 「useState」と「useEffect」をimport↓ */
import React, { useState, useEffect } from "react";
/* 「signOut」をimport↓ */
/* 「onAuthStateChanged」と「auth」をimport↓ */
import { onAuthStateChanged, signOut } from "firebase/auth";
import { auth } from "./FirebaseConfig.jsx";
/* ↓「useNavigate」をimport */
/* ↓「Navigate」をimport */
import {
  useNavigate,
  Navigate
} from "react-router-dom";

const Mypage = () => {
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

    /* ↓「navigate」を定義 */
    const navigate = useNavigate();

    /* ↓関数「logout」を定義 */
    const logout = async () => {
        await signOut(auth);
        navigate("/login");
    };

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
                            <h1>マイページ</h1>
                            {/* ↓ユーザーのメールアドレスを表示（ログインしている場合） */}
                            <p>{user && user.email}</p>
                            {/* ↓「onClick」を追加 */}
                            <button onClick={logout}>ログアウト</button>
                        </>
                    )}
                </>
            )}
        </>
    );
};

export default Mypage;
