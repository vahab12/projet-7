const dbc = require('../config/db');
const db = dbc.getDB();

// CREATE COMMENT
exports.createComment = (req, res, next) => {
  const { post_id, author_id, author_first_name, author_last_name, message } =
    req.body;
  const sql = `INSERT INTO comments ( post_id, author_id, author_first_name, author_last_name, message, created_date, updated_date, likes) VALUES ( ${post_id}, ${author_id}, "${author_first_name}", "${author_last_name}", "${message}", CURRENT_TIMESTAMP, CURRENT_TIMESTAMP, '0')`;
  db.query(sql, (err, result) => {
    if (err) {
      res.status(404).json({ err });
      console.log(err);
      throw err;
    }
    res.status(200).json(result);
  });
};

// GET ALL COMMENTS
exports.getAllComments = (req, res) => {
  const postId = req.params.id;
  const sql = `SELECT * FROM comments WHERE comments.post_id = ${postId}`;
  db.query(sql, (err, result) => {
    if (err) {
      res.status(404).json({ err });
      throw err;
    }
    res.status(200).json(result);
  });
};

// GET ONE COMMENT
exports.getOneComment = (req, res) => {
  const comment_id = req.params.id;
  const sql = `SELECT * FROM comments WHERE comments.comment_id= ${comment_id}`;
  db.query(sql, (err, result) => {
    if (err) {
      res.status(404).json({ err });
      throw err;
    }
    res.status(200).json(result);
  });
};

// DELETE ONE COMMENTS
exports.deleteOneComment = (req, res) => {
  const comment_id = req.params.id;
  const sql = `DELETE FROM comments WHERE comments.comment_id = ${comment_id}`;
  db.query(sql, (err, result) => {
    if (err) {
      res.status(404).json({ err });
      throw err;
    }
    res.status(200).json(result);
  });
};
