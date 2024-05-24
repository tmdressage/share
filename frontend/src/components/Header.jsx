import React from "react";
import { Link } from "react-router-dom";

const Header = () => {
  return (
    <>
    <header className="header">
      <div className="header__content">
        <img
          className="header__content--logo"
          src="img/logo.png"
          alt="Share"
        ></img>
        <nav>
          <ul className="header__content--nav">
            <li className="nav-item">
              <Link className="nav-link" to="/register">
                新規登録
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/login">
                ログイン
              </Link>
            </li>
          </ul>
        </nav>
      </div>
    </header>
    </>
  );
};

export default Header;
