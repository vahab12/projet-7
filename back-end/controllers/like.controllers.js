const dbc = require('../config/db');
const db = dbc.getDB();

// LIKE AND DISLIKE POSTS
exports.likeDislikePost = (req, res) => {
  const { user_id, post_id } = req.body;
  const sqlSelect = `SELECT * FROM likes WHERE user_id = ${user_id} AND post_id = ${post_id}`;
  db.query(sqlSelect, (err, result) => {
    if (err) {
      console.log(err);
      res.status(404).json({ err });
      throw err;
    }

    if (result.length === 0) {
      const sqlInsert = `INSERT INTO likes (user_id, post_id) VALUES (${user_id}, ${post_id})`;
      db.query(sqlInsert, (err, result) => {
        if (err) {
          console.log(err);
          res.status(404).json({ err });
          throw err;
        }
        res.status(200).json(result);
      });
    } else {
      const sqlDelete = `DELETE FROM likes WHERE likes.user_id = ${user_id} AND likes.post_id = ${post_id}`;
      db.query(sqlDelete, (err, result) => {
        if (err) {
          console.log(err);
          res.status(404).json(err);
          throw err;
        }
        res.status(200).json(result);
      });
    }
  });
};

// POST LIKED BY USER
exports.postLikedByUser = (req, res) => {
  const { user_id, post_id } = req.body;
  const sql = `SELECT post_id, user_id FROM likes WHERE user_id = ${user_id} AND post_id = ${post_id}`;
  db.query(sql, (err, result) => {
    if (err) {
      res.status(404).json({ err });
      throw err;
    }
    res.status(200).json(result);
  });
};

//COUNT LIKES
exports.countLikes = (req, res) => {
  const { post_id } = req.body;
  const sqlInsert = `SELECT COUNT(*) AS total FROM likes WHERE likes.post_id = ${post_id}`;
  db.query(sqlInsert, (err, result) => {
    if (err) {
      res.status(404).json({ err });
      throw err;
    }
    res.status(200).json(result);
  });
};
