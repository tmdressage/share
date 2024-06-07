import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate, useLocation } from "react-router-dom";
import Sidebar from "./Sidebar";

const Comment = () => {
  const location = useLocation();
  const { userDetails, post } = location.state || {
    userDetails: {},
    post: null,
  };
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState("");
  const [likes, setLikes] = useState(0);
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();

  useEffect(() => {
    const fetchCommentsAndLikes = async () => {
      try {
        const commentsResponse = await axios.get(
          `http://localhost/api/posts/${post.id}/comments`
        );
        setComments(commentsResponse.data.comments);
        console.log("userDetails:", userDetails); // ログを追加して確認
        console.log("postId:", post.id); // ログを追加して確認

        const likesResponse = await axios.get(
          `http://localhost/api/posts/${post.id}/likes`
        );
        setLikes(likesResponse.data.likes);
        console.log("コメントといいね表示成功");
      } catch (e) {
        console.log("コメントといいね表示失敗");
      }
    };

    fetchCommentsAndLikes();
  }, [post, userDetails]);

  const handlePostComment = async () => {
    try {
      // Laravelのバックエンドにコメント情報を送信
      await axios.post(`http://localhost/api/posts/${post.id}/comments`, {
        comment: newComment,
        user_id: userDetails.id,
        post_id: post.id,
      });
      // コメント成功後にsetCommentsを画面に呼び出し
      const response = await axios.get(
        `http://localhost/api/posts/${post.id}/comments`
      );
      setComments(response.data.comments);
      setNewComment(""); // コメント投稿欄をリセット
      console.log("コメント投稿成功");
    } catch (error) {
      if (error.response && error.response.data && error.response.data.errors) {
        // Laravelのバリデーションエラーメッセージを設定
        setErrors(error.response.data.errors);
      } else {
        setErrors({ general: "登録内容でエラーが発生しました" });
      }
      console.error("コメント投稿失敗", error);
    }
  };

  const handleDelete = async (postId) => {
    try {
      await axios.delete(`http://localhost/api/posts/${postId}`);
      console.log("投稿削除成功");
      navigate("/"); //ホームへ強制遷移する
    } catch (e) {
      console.log("投稿削除失敗");
    }
  };

  const handleLike = async (postId) => {
    try {
      const response = await axios.post(
        `http://localhost/api/posts/${postId}/likes`,
        { user_id: userDetails.id }
      );
      setLikes(response.data.likes);
      console.log("いいね成功");
    } catch (e) {
      console.log("いいね失敗");
    }
  };

  return (
    <>
      <div className="home">
        <Sidebar userDetails={userDetails} />
        <div className="comment">
          <div className="comment__title">
            <p className="comment__title--text">コメント</p>
          </div>
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
              <span className="post__content--count">{likes}</span>
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
            </div>
            <div className="post__message">
              <p className="post__message--text">{post.post}</p>
            </div>
          </div>
          <div className="comment__subtitle">
            <p className="comment__subtitle--text">コメント</p>
          </div>
          <div className="comment__all">
            {comments.map((comment) => (
              <div key={comment.id} className="comment__content">
                <p className="comment__content--name">{comment.user.name}</p>
                <p className="comment__content--detail">{comment.comment}</p>
              </div>
            ))}
          </div>
          <div className="comment__post">
            <textarea
              className="textarea"
              name="text"
              cols="120"
              rows="1"
              value={newComment}
              onChange={(e) => setNewComment(e.target.value)}
            ></textarea>
            {errors.comment && (
              <p className="register__content--error" style={{ color: "red" }}>
                {errors.comment[0]}
              </p>
            )}
            <div className="comment__post-button">
              <button className="comment-button" onClick={handlePostComment}>
                コメント
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Comment;
