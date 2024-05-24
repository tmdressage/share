import React, { useState, useEffect } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Header from "./components/Header";
import SideBar from "./components/SideBar";
import Register from "./components/Register";
import Login from "./components/Login";
import Home from "./components/Home";
import "./index.css";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "./components/FirebaseConfig.jsx";

const App = () => {
  /* ↓ログインを判定する設定 */
  const [user, setUser] = useState();

  useEffect(() => {
    onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });
  });

  return (
    <div className="container">
      <BrowserRouter>
        {user ? (
          <div className="share">
            {" "}
            <SideBar /> <Home />
            <Routes>
              <Route path={`/`} element={<Home />} />
            </Routes>
          </div>
        ) : (
          <>
            <Header />
            <Routes>
              <Route path={`/register`} element={<Register />} />
              <Route path={`/login`} element={<Login />} />
            </Routes>
          </>
        )}
      </BrowserRouter>
    </div>
  );
};

export default App;
