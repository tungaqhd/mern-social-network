import React, { useState } from "react";
import { connect } from "react-redux";
import { addComment } from "../../actions/post";
const CommentForm = ({ postId, addComment }) => {
  const [text, setComment] = useState("");
  const onComment = (e) => {
    e.preventDefault();
    addComment(postId, { text });
    setComment("");
  };
  return (
    <div className='post-form'>
      <div className='bg-primary p'>
        <h3>Leave A Comment</h3>
      </div>
      <form onSubmit={onComment} className='form my-1'>
        <textarea
          name='text'
          cols='30'
          rows='5'
          placeholder='Comment on this post'
          defaultValue={text}
          onChange={(e) => setComment(e.target.value)}
          required
        ></textarea>
        <input type='submit' className='btn btn-dark my-1' value='Submit' />
      </form>
    </div>
  );
};

export default connect(null, { addComment })(CommentForm);
