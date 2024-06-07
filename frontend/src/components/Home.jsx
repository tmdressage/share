import React, { useState, useEffect } from "react";
import axios from "axios";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "./FirebaseConfig.jsx";
import { Navigate, useNavigate } from "react-router-dom";
import Sidebar from "./Sidebar";

const Home = () => {
  const [user, setUser] = useState(null);
  const [userDetails, setUserDetails] = useState({ id: null, name: "" });
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [likes, setLikes] = useState({});
  const navigate = useNavigate();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      if (currentUser) {
        try {
          const response = await axios.get(
            `http://localhost/api/user-details?email=${currentUser.email}`
          );
          setUserDetails({ id: response.data.id, name: response.data.name });
          console.log("ユーザー情報取得成功");
        } catch (e) {
          console.log("ユーザー情報取得失敗");
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
            `http://localhost/api/posts/${post.id}/likes`
          );
          likesCount[post.id] = response.data.likes;
        }
        setLikes(likesCount);
        console.log("いいね取得成功");
      } catch (e) {
        console.log("いいね取得失敗");
      }
    };

    if (posts.length > 0) {
      fetchLikeStatus();
    }
  }, [posts]);

  const handleDelete = (postId) => {
    deletePost(postId);
  };

  const deletePost = async (postId) => {
    try {
      await axios.delete(`http://localhost/api/posts/${postId}`);
      const response = await axios.get("http://localhost/api/posts");
      setPosts(response.data.posts);
      console.log("削除成功");
    } catch (e) {
      console.log("削除失敗");
    }
  };

  const handleLike = (postId) => {
    clickLike(postId);
  };

  const clickLike = async (postId) => {
    try {
      const response = await axios.post(
        `http://localhost/api/posts/${postId}/likes`,
        { user_id: userDetails.id }
      ); //${postId}は引数、{ user_id: userDetails.id }はリクエストとしてコントローラへ渡す。(配列userDetailsの中のidの値をuser_idという名称でコントローラへ渡す）
      setLikes((prevLikes) => ({
        ...prevLikes,
        [postId]: response.data.likes,
      }));
      console.log("いいね成功");
    } catch (e) {
      console.log("いいね失敗");
    }
  };

  const handleShowComments = (post) => {
    navigate(`/${post.id}/comments`, { state: { userDetails, post } });
  };

  if (!loading && !user) {
    return <Navigate to="/login" />;
  }

  return (
    <>
      {!loading && (
        <>
          <div className="home">
            <Sidebar userDetails={userDetails} setPosts={setPosts} />
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
                          src={"/img/heart.png"}
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
                            src={"/img/cross.png"}
                            alt="delete"
                          />
                        </button>
                      )}
                      <button
                        className="detail-button"
                        onClick={() => handleShowComments(post)}
                      >
                        <img
                          className="post__content--detail"
                          src={"/img/detail.png"}
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
