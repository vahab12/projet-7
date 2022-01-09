const dbc = require('../config/db');
const db = dbc.getDB();

// Créer un post
exports.createPost = (req, res, next) => {
  let { body, file } = req;
  if (!file) delete req.body.post_image;
  body = {
    ...body,
  };

  const sqlInsert = 'INSERT INTO posts SET ?';
  db.query(sqlInsert, body, (err, result) => {
    if (err) {
      res.status(404).json({ err });
      throw err;
    }
    // post_id will be equal to the post inserted, and will be reused to link the image at the correct post in the below query
    const post_id = result.insertId;
    if (file) {
      const sqlInsertImage = `INSERT INTO images (img_url, post_id) VALUES ("${file.filename}", ${post_id})`;
      db.query(sqlInsertImage, (err, result) => {
        if (err) {
          res.status(404).json({ err });
          throw err;
        }
        res.status(200).json(result);
      });
    } else {
      res.status(200).json(result);
    }
  });
};

//Get tous les posts
exports.getAllPosts = (req, res, next) => {
  const sql =
    'SELECT * FROM posts p, users u WHERE u.active=1 AND p.active=1 AND p.user_id = u.user_id ORDER BY post_date DESC;';
  db.query(sql, (err, result) => {
    if (err) {
      res.status(404).json({ err });
      throw err;
    }
    res.status(200).json(result);
  });
};

//Get un post
exports.getOnePost = (req, res, next) => {
  const { id: postId } = req.params;
  const sqlGetOnePost = `SELECT * FROM posts WHERE post_id = ${postId};`;
  db.query(sqlGetOnePost, (err, result) => {
    if (err) {
      res.status(404).json({ err });
      throw err;
    }
    res.status(200).json(result);
  });
};

//Update

exports.updatePost = (req, res, next) => {
  let sql = 'UPDATE FROM posts ORDER BY post_date DESC;';

  let db = dbc.getDB();
  db.query(sql, (err, result) => {
    if (err) {
      res.status(404).json({ err });
      throw err;
    }
    res.status(200).json(result);
  });
};

//Delete
exports.deleteOnePost = (req, res, next) => {
  const { id: postId } = req.params;
  const sql = `DELETE FROM posts  WHERE post_id = ${postId}`;
  db.query(sql, (err, result) => {
    if (err) {
      res.status(404).json({ err });
      throw err;
    }
    res.status(200).json(result);
  });
};

//Get Image
exports.getOneImage = (req, res, next) => {
  const { id: postId } = req.params;
  const sqlGetImage = `SELECT * FROM images WHERE images.post_id = ${postId};`;
  db.query(sqlGetImage, (err, result) => {
    if (err) {
      res.status(404).json({ err });
      throw err;
    }
    if (result[0]) {
      result[0].image_url =
        req.protocol +
        '://' +
        req.get('host') +
        '/images/posts/' +
        result[0].image_url;
    }
    res.status(200).json(result);
  });
};
