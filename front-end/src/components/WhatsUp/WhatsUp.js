import React, { useEffect, useState } from 'react';

import './WhatsUp.scss';

import axios from 'axios';

import Avatar from '../UI/Avatar/Avatar';
import WhatsUpForm from './WhatsUpForm';

const WhatsUp = () => {
  const [imgSrc, setImgSrc] = useState('');
  let userName;
  // If localstorage is empty, that's mean we aren't connected so go back to the connexion page
  if (JSON.parse(localStorage.getItem('user'))) {
    userName = JSON.parse(localStorage.getItem('user')).user_first_name;
  } else {
    document.location.href = 'http://localhost:3000/connexion';
  }

  useEffect(() => {
    const toFetchProfilPicture = async () => {
      try {
        const response = await axios.get(
          `http://localhost:5014/api/user/image/${
            JSON.parse(localStorage.getItem('user')).user_id
          }`
        );

        if (response.data[0]) setImgSrc(response.data[0].img_url);
        else setImgSrc('./images/profils/default/mee.png');
      } catch (err) {
        throw err;
      }
    };
    toFetchProfilPicture();
  }, []);

  return (
    <div className="whats_up">
      <Avatar className={'whatsup__avatar'} imgSrc={imgSrc} />
      <WhatsUpForm
        className={'whatsup__form'}
        placeholder={`Publier votre post, ${userName} ?`}
      />
    </div>
  );
};

export default WhatsUp;
