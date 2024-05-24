/* 「useState」と「useEffect」をimport↓ */
import React from "react";
/* 「signOut」をimport↓ */
/* 「onAuthStateChanged」と「auth」をimport↓ */
import { signOut } from "firebase/auth";
import { auth } from "./FirebaseConfig.jsx";
/* ↓「useNavigate」をimport */
/* ↓「Navigate」をimport */
import { Link, useNavigate } from "react-router-dom";

const SideBar = () => {
  /* ↓「navigate」を定義 */
  const navigate = useNavigate();

  /* ↓関数「logout」を定義 */
  const logout = async () => {
    await signOut(auth);
    navigate("/login");
  };

  return (
    <>
      <div className="sidebar">
        <div className="sidebar__content">
          <img
            className="sidebar__content--logo"
            src="img/logo.png"
            alt="Share"
          ></img>
          <div className="sidebar__content--home">
            <img
              className="sidebar__content--home-logo"
              src="img/home.png"
              alt="home"
            ></img>
            <Link className="nav-link" to="/">
              ホーム
            </Link>
          </div>
          <div className="sidebar__content--logout">
            <img
              className="sidebar__content--logout-logo"
              src="img/logout.png"
              alt="logout"
            ></img>
            <Link className="nav-link" onClick={logout}>
              ログアウト
            </Link>
          </div>
          <div className="sidebar__content--share">
            <p className="sidebar__content--share-text">シェア</p>
            <textarea
              className="textarea"
              name="text"
              cols="35"
              rows="6"
              id="count"
            ></textarea>
            <div className="sidebar__content--share-button">
              <button className="share-button">シェアする</button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default SideBar;
