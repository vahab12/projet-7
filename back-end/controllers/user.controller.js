const dbc = require('../config/db');
const db = dbc.getDB();

// GET ONE USER
exports.getOneUser = (req, res, next) => {
  const { id: userId } = req.params;
  const sqlGetUser = `SELECT * FROM users WHERE users.user_id = ${userId};`;
  db.query(sqlGetUser, (err, result) => {
    if (err) {
      res.status(404).json({ err });
      throw err;
    }
    delete result[0].user_password;
    res.status(200).json(result);
  });
};

//UDATE ONE USER
exports.updateOneUser = (req, res, next) => {
  if (req.file) {
    const { id: user_id } = req.params;
    let { destination, filename } = req.file;
    destination = destination + filename;

    const sqlInsertImage = `INSERT INTO images (user_id, img_url) VALUES ( ${user_id}, "${destination}");`;
    db.query(sqlInsertImage, (err, result) => {
      if (err) {
        res.status(404).json({ err });
        throw err;
      }
    });
  }

  const { user_first_name, user_last_name } = req.body;
  const { id: userId } = req.params;
  const sqlUpdateUser = `UPDATE users SET user_first_name = "${user_first_name}", user_last_name = "${user_last_name}" WHERE users.user_id = ${userId};`;
  db.query(sqlUpdateUser, (err, result) => {
    if (err) {
      res.status(404).json({ err });
      throw err;
    }
    if (result) {
      res.status(200).json(result);
    }
  });
};

// GET PROFIL PICTURE
exports.getProfilPicture = (req, res, next) => {
  const { id: user_id } = req.params;
  const sqlGetUser = `SELECT img_url FROM images WHERE images.user_id = ${user_id} ORDER BY images.img_id desc;`;
  db.query(sqlGetUser, (err, result) => {
    if (err) {
      res.status(404).json({ err });
      throw err;
    }
    res.status(200).json(result);
  });
};
