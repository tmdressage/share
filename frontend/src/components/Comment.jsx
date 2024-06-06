import React, { useState, useEffect } from "react";
import axios from "axios";
import { useLocation } from "react-router-dom";


const Comment = () => {
  const location = useLocation();
  const { userDetails, postId } = location.state;
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState("");
  

  useEffect(() => {
    const fetchComments = async () => {
      try {
        const response = await axios.get(
          `http://localhost/api/posts/${postId}/comments`
        );
        setComments(response.data.comments);
        console.log("userDetails:", userDetails); // ログを追加して確認
        console.log("postId:", postId); // ログを追加して確認
      } catch (e) {
        console.log("表示失敗");
      }
    };

    fetchComments();
  }, [postId, userDetails]);

  const handlePostComment = async () => {
    try {
      await axios.post(`http://localhost/api/posts/${postId}/comments`, {
        comment: newComment,
        user_id: userDetails.id,
        post_id: postId,
      });

      const response = await axios.get(
        `http://localhost/api/posts/${postId}/comments`
      );
      setComments(response.data.comments);
      setNewComment("");
    } catch (error) {
      console.error("コメント投稿失敗:", error.message);
    }
  };

  return (
    <div className="comments">
      <div className="comment">
        <p className="comment__title">コメント</p>
      </div>
      {comments.map((comment) => (
        <div key={comment.id} className="comment__content">
          <p className="comment__content--name">{comment.user.name}</p>
          <p className="comment__content--detail">{comment.comment}</p>
        </div>
      ))}
      <div className="comment__post">
        <textarea
          className="textarea"
          name="text"
          cols="133"
          rows="1"
          value={newComment}
          onChange={(e) => setNewComment(e.target.value)}
        ></textarea>
        <div className="comment__post-button">
          <button className="comment-button" onClick={handlePostComment}>
            コメント
          </button>
        </div>
      </div>
    </div>
  );
};

export default Comment;
