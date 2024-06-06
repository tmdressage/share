import React, { useState, useEffect } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Header from "./components/Header";
import Register from "./components/Register";
import Login from "./components/Login";
import Home from "./components/Home";
import Comment from "./components/Comment";
import "./index.css";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "./components/FirebaseConfig.jsx";

const App = () => {
  const [user, setUser] = useState();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });
    return () => unsubscribe();
  }, []);

  return (
    <div className="container">
      <BrowserRouter>
        {!user && <Header />}
        <Routes>
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path="/" element={user ? <Home /> : <Login />} />
          <Route path="/:postId/comments" element={user ? <Comment /> : <Login />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
};
export default App;