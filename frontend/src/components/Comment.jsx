import React from "react";

const Comment = () => {
  return (
    <>
      <div className="comments">
        <div className="comment">
          <p className="comment__title">コメント</p>
        </div>
        <div className="comment__content">
          <p className="comment__content--name">test</p>
          <p className="comment__content--detail">test message</p>
        </div>
        <div className="comment__post">
          <textarea
            className="textarea"
            name="text"
            cols="133"
            rows="1"
            id="count"
          ></textarea>
          <div className="comment__post-button">
            <button className="comment-button">コメント</button>
          </div>
        </div>
      </div>
    </>
  );
};

export default Comment;