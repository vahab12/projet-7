import React, { useEffect, useState } from 'react';
import './Comments.scss';

import axios from 'axios';
import Comment from './Comment';

const Comments = ({ post_id }) => {
  // States
  const [allComments, setAllComments] = useState([]);
  useEffect(() => {
    async function fetchData() {
      const response = await axios.get(
        `http://localhost:5014/api/comment/${post_id}/allcomments`
      );
      const data = response.data;
      if (Array.isArray(data)) {
        setAllComments((prevState) => [...prevState, ...data]);
      } else throw new Error("Oops, didn't get an array.");
    }
    fetchData();
  }, [post_id]);

  return (
    <div className="comments">
      {allComments.map((comment) => (
        <Comment comment={comment} key={comment.post_id} />
      ))}
    </div>
  );
};

export default Comments;
