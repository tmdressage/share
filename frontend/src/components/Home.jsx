import React, { useState, useEffect } from "react";
import axios from "axios";
import { signOut, onAuthStateChanged } from "firebase/auth";
import { auth } from "./FirebaseConfig.jsx";
import { Link, Navigate, useNavigate } from "react-router-dom";
import Comment from "./Comment";

const Home = () => {
  const [user, setUser] = useState(null); // userオブジェクトを保持
  const [userDetails, setUserDetails] = useState({ id: null, name: "" }); // usersテーブルのIDと名前を保持
  const [posts, setPosts] = useState([]); // ポストごとの内容を保持する
  const [loading, setLoading] = useState(true);
  const [post, setPost] = useState(""); // ポストする内容を保持する
  const [error, setError] = useState("");
  const [likes, setLikes] = useState({}); // ポストごとのいいね数を保持する
  const navigate = useNavigate();

  const logout = async () => {
    await signOut(auth);
    navigate("/login");
  };

  const home = async () => {
    navigate("/");
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      if (currentUser) {
        try {
          const response = await axios.get(
            `http://localhost/api/user-details?email=${currentUser.email}`
          );
          setUserDetails({ id: response.data.id, name: response.data.name }); // 取得したユーザーIDと名前をセット
        } catch (error) {
          console.error("ユーザーIDと名前の取得に失敗しました:", error);
        }
        setUser(currentUser);
      } else {
        setUser(null);
        setUserDetails({ id: null, name: "" });
      }
      setLoading(false);
    });
    return () => unsubscribe();
  }, []);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await axios.get("http://localhost/api/posts");
        setPosts(response.data.posts);
        console.log("表示成功");
        setLoading(false);
      } catch (e) {
        console.log("表示失敗");
      }
    };

    fetchPosts();
  }, []);

  useEffect(() => {
    const fetchLikeStatus = async () => {
      const likesCount = {};
      try {
        for (const post of posts) {
          const response = await axios.get(
            `http://localhost/api/posts/${post.id}/like`
          );
          likesCount[post.id] = response.data.likes;
        }
        setLikes(likesCount);
        console.log("いいね取得成功");
      } catch (error) {
        console.error("いいね取得失敗:", error.message);
      }
    };

    if (posts.length > 0) {
      fetchLikeStatus();
    }
  }, [posts]);

  const sharePost = async (e) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost/api/posts", {
        post,
        user_id: userDetails.id,
      });
      const response = await axios.get("http://localhost/api/posts");
      setPosts(response.data.posts);
      setPost("");
      console.log("保存成功");
    } catch (error) {
      setError("テキストの保存中にエラーが発生しました");
      console.error("保存失敗:", error.message);
    }
  };

  const handleDelete = (postId) => {
    deletePost(postId);
  };

  const deletePost = async (postId) => {
    try {
      await axios.delete(`http://localhost/api/posts/${postId}`);
      const response = await axios.get("http://localhost/api/posts");
      setPosts(response.data.posts);
      console.log("削除成功");
    } catch (error) {
      setError("テキストの削除中にエラーが発生しました");
      console.error("削除失敗:", error.message);
    }
  };

  const handleLike = (postId) => {
    clickLike(postId);
  };

  const clickLike = async (postId) => {
    try {
      const response = await axios.post(
        `http://localhost/api/posts/${postId}/like`,
        { user_id: userDetails.id }
      ); //${postId}は引数、{ user_id: userDetails.id }はリクエストとしてコントローラへ渡す。(配列userDetailsの中のidの値をuser_idという名称でコントローラへ渡す）
      setLikes((prevLikes) => ({
        ...prevLikes,
        [postId]: response.data.likes,
      }));
      console.log("いいね成功");
    } catch (error) {
      console.error("いいね失敗:", error.message);
    }
  };

  if (!loading && !user) {
    return <Navigate to="/login" />;
  }

  return (
    <>
      {!loading && (
        <>
          <div className="home">
            <div className="sidebar">
              <div className="sidebar__content">
                <img
                  className="sidebar__content--logo"
                  src="img/logo.png"
                  alt="Share"
                ></img>
                <div className="sidebar__content--post">
                  <img
                    className="sidebar__content--post-logo"
                    src="img/home.png"
                    alt="home"
                  ></img>
                  <Link className="nav-link" onClick={home}>
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
                  {error && <p className="error-message">{error}</p>}
                  <form onSubmit={sharePost}>
                    <textarea
                      className="textarea"
                      name="text"
                      cols="35"
                      rows="6"
                      id="count"
                      value={post}
                      onChange={(e) => setPost(e.target.value)}
                    ></textarea>
                    <div className="sidebar__content--share-button">
                      <button className="share-button" type="submit">
                        シェアする
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            </div>
            <div className="post">
              <div className="post__title">
                <p className="post__title--text">ホーム</p>
              </div>
              <div className="post__all">
                {posts.map((post) => (
                  <div className="posts" key={post.id}>
                    <div className="post__content">
                      <p className="post__content--name">{post.user.name}</p>
                      <button
                        className="like-button"
                        onClick={() => handleLike(post.id)}
                      >
                        <img
                          className="post__content--like"
                          src="img/heart.png"
                          alt="like"
                        ></img>
                      </button>
                      <span className="post__content--count">
                        {likes[post.id] || 0}
                      </span>
                      {userDetails.id === post.user.id && (
                        <button
                          className="delete-button"
                          onClick={() => handleDelete(post.id)}
                        >
                          <img
                            className="post__content--delete"
                            src="img/cross.png"
                            alt="delete"
                          />
                        </button>
                      )}
                      <button
                        className="detail-button"
                        onClick={() => handleDelete(post.id)}
                      >
                        <img
                          className="post__content--detail"
                          src="img/detail.png"
                          alt="detail"
                        ></img>
                      </button>
                    </div>
                    <div className="post__message">
                      <p className="post__message--text">{post.post}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default Home;
