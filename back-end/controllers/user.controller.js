const dbc = require('../config/db');
const db = dbc.getDB();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
require('dotenv').config({ path: '../config/.env' });

//*********** Signup*************
exports.signup = async (req, res) => {
  try {
    const { user_password: password } = req.body;

    // ====== Password encryption =========
    const salt = await bcrypt.genSalt(10);
    const encryptedPassword = await bcrypt.hash(password, salt);

    const user = {
      ...req.body,
      user_password: encryptedPassword,
    };
    const sql = 'INSERT INTO user SET ?';
    const db = dbc.getDB();
    db.query(sql, user, (err, result) => {
      if (!result) {
        res.status(200).json({ message: 'Email déjà enregistré' });
      } else {
        res.status(201).json({ message: 'User created !' });
      }
    });
  } catch (err) {
    res.status(200).json({ message: 'Failed registration', err });
  }
};

//login

exports.login = (req, res) => {
  //===== Check if user exists in DB ======
  const { user_email, user_password: clearPassword } = req.body;
  const sql = `SELECT user_firstname, user_lastname, user_password, user_id, active FROM users WHERE user_email=?`;
  const db = dbc.getDB();
  db.query(sql, [user_email], async (err, results) => {
    if (err) {
      return res.status(404).json({ err });
    }

    // ===== Verify password with hash in DB ======
    if (results[0] && results[0].active === 1) {
      try {
        const { user_password: hashedPassword, user_id } = results[0];
        const match = await bcrypt.compare(clearPassword, hashedPassword);
        if (match) {
          // If match, generate JWT token
          const maxAge = 1 * (24 * 60 * 60 * 1000);
          const token = jwt.sign({ user_id }, process.env.JWT_TOKEN, {
            expiresIn: maxAge,
          });

          // httpOnly: true,
          // maxAge,
          // sameSite: true,
          // secure: true,

          // remove the password key of the response
          delete results[0].user_password;

          res.cookie('jwt', token);
          res.status(200).json({
            user: results[0],
            token: jwt.sign({ userId: user_id }, process.env.JWT_TOKEN, {
              expiresIn: '24h',
            }),
          });
        }
      } catch (err) {
        console.log(err);
        return res.status(400).json({ err });
      }
    } else if (results[0] && results[0].active === 0) {
      res.status(200).json({
        error: true,
        message: 'Votre compte a été désactivé',
      });
    } else if (!results[0]) {
      res.status(200).json({
        error: true,
        message: 'Mauvaise combinaison email / mot de passe',
      });
    }
  });
};

// logout
exports.logout = (req, res) => {
  res.clearCookie('jwt');
  res.status(200).json('OUT');
};

//Delete profile le compt

exports.deleteProfile = async (req, res) => {
  try {
    const userToFind = await models.User.findOne({
      where: { id: req.user.id },
    });
    if (!userToFind) {
      throw new Error("Sorry,can't find your account");
    }

    const notLatent = userToFind.update({
      latent: 0,
    });

    if (!notLatent) {
      throw new Error('Sorry,something gone wrong , please try again later');
    }

    res.status(200).json({
      message: 'Your account has been successfully deleted',
    });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// RUD users

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

exports.updateOneUser = (req, res, next) => {
  if (req.file) {
    const { id: user_id } = req.params;
    let { destination, filename } = req.file;
    destination = destination + filename;

    const sqlInsertImage = `INSERT INTO images (post_id, user_id, image_url) VALUES (NULL, ${user_id}, "${destination}");`;
    db.query(sqlInsertImage, (err, result) => {
      if (err) {
        res.status(404).json({ err });
        throw err;
      }
    });
  }

  const { user_firstname, user_lastname } = req.body;
  const { id: userId } = req.params;
  const sqlUpdateUser = `UPDATE users SET user_firstname = "${user_firstname}", user_lastname = "${user_lastname}" WHERE users.user_id = ${userId};`;
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

exports.getProfilPicture = (req, res, next) => {
  const { id: user_id } = req.params;
  const sqlGetUser = `SELECT image_url FROM images WHERE images.user_id = ${user_id} ORDER BY images.image_id desc;`;
  db.query(sqlGetUser, (err, result) => {
    if (err) {
      res.status(404).json({ err });
      throw err;
    }
    res.status(200).json(result);
  });
};
