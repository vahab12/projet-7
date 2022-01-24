const endpoints = {
  // CRUD posts
  GET_ALL_POSTS: '/api/post',
  CREATE_POST: '/api/post',

  // Like & unlike post
  LIKE_DISLIKE: '/api/like/:id/likeDislike',
  POST_LIKED: '/api/like/:id/postLikedByUser',
  COUNT_LIKES: '/api/like/:id/countLike',

  // Images
  GET_ONE_IMAGE: '/api/post/image/:id',

  // CRUD comments
  GET_ALL_COMMENTS: '/api/comment',
  //CREATE_COMMENT: '/api/post/:id/comments/create',
  CREATE_COMMENT: '/api/comment/:id/',

  // Auth
  USER_SIGNUP: 'api/auth/signup',
  USER_LOGIN: 'api/auth/login',
  USER_LOGOUT: 'api/auth/logout',

  // RUD user
  GET_ONE_USER: 'api/user/:id',
  GET_ALL: 'api/user/',
  UPDATE_USER: 'api/user/:id',
  DELETE_USER: 'api/user/:id',
};

export default endpoints;
