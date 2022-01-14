import React, { useState } from 'react';

import './ToRespond.scss';

import axios from 'axios';

const ToRespond = ({ postId }) => {
  // States
  const [commentMessage, setCommentMessage] = useState('');

  const submitHandle = async (e) => {
    e.preventDefault();

    const data = {
      author_id: JSON.parse(localStorage.getItem('user')).user_id,
      author_first_name: JSON.parse(localStorage.getItem('user'))
        .user_first_name,
      author_last_name: JSON.parse(localStorage.getItem('user')).user_last_name,
      post_id: postId,
      message: commentMessage,
    };
    await axios.post(`http://localhost:5014/api/comment/${data.post_id}`, data);

    // this code is just for MVP, it will be upgrade in final version
    document.location.reload();
  };

  const inputHandle = (e) => {
    setCommentMessage(e.target.value);
  };

  return (
    <>
      <hr className="divider" />
      <form onSubmit={submitHandle} id={'form-comment'}>
        <input
          type="text"
          placeholder="Écrivez un commentaire..."
          onChange={inputHandle}
          value={commentMessage}
          id="input-comment"
        />
      </form>
    </>
  );
};

export default ToRespond;
