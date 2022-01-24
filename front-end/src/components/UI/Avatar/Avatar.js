import React from 'react';
import './Avatar.scss';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faImage } from '@fortawesome/free-solid-svg-icons';

const Avatar = ({ className, editable, post_id, imgSrc }) => {
  return (
    <div className={className}>
      <img src={`http://localhost:5014/${imgSrc}`} alt="profile_picture" />
      {editable && <input type="file" name="image" post_id={post_id} />}
      {editable && (
        <label htmlFor="image">
          {' '}
          <FontAwesomeIcon
            icon={faImage}
            className="profile_picture__change"
          />{' '}
        </label>
      )}
    </div>
  );
};

export default Avatar;
