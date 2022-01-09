const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
require('dotenv').config({ path: '../config/.env' });
const dbc = require('../config/db');
//const mysql = require('mysql');

// Créer un compte
exports.signup = async (req, res) => {
  console.log(req.body);
  try {
    const { user_password: password } = req.body;

    // ====== Password encryption =========
    const salt = await bcrypt.genSalt(10);
    const encryptedPassword = await bcrypt.hash(password, salt);

    const user = {
      ...req.body,
      user_password: encryptedPassword,
    };
    const sql = 'INSERT INTO users SET ?';
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

//S'identifié
exports.login = (req, res) => {
  //===== Vérifier si user exist dans BD ======
  const { user_email, user_password: clearPassword } = req.body;
  const sql = `SELECT user_first_name, user_last_name, user_password, user_id, active FROM users WHERE user_email=?`;
  const db = dbc.getDB();
  db.query(sql, [user_email], async (err, results) => {
    if (err) {
      return res.status(404).json({ err });
    }

    // ===== Verifer le MDP AVEC hash DANS BD ======
    if (results[0] && results[0].active === 1) {
      try {
        const { user_password: hashedPassword, user_id } = results[0];
        const match = await bcrypt.compare(clearPassword, hashedPassword);
        if (match) {
          // Si matche, generer JWT token
          const maxAge = 1 * (24 * 60 * 60 * 1000);
          const token = jwt.sign({ user_id }, process.env.JWT_TOKEN_SECRET, {
            expiresIn: maxAge,
          });

          // remove the password key of the response
          delete results[0].password;

          res.cookie('jwt', token);
          res.status(200).json({
            user: results[0],
            token: jwt.sign({ userId: user_id }, process.env.JWT_TOKEN_SECRET, {
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

//se deconnecter
exports.logout = (req, res) => {
  res.clearCookie('jwt');
  res.status(200).json('Vous êtes déconecté!!!');
};

/*
exports.desactivateAccount = (req, res) => {
  const userId = req.params.id;
  const sql = `UPDATE users SET active=0 WHERE user_id = ?`;
  const db = dbc.getDB();
  db.query(sql, userId, (err, results) => {
    if (err) {
      return res.status(404).json({ err });
    }
    res.clearCookie('jwt');
    res.status(200).json('DESACTIVATE');
  });
};
*/

//supprimer
exports.delete = (req, res) => {
  const userId = req.params.id;
  const db = dbc.getDB();
  const sql = 'DELETE  FROM users WHERE user_id = ?';
  db.query(sql, [userId], (err, rows, fields) => {
    if (!err) res.send('Deleted successfully.');
    else console.log(err);
  });
};
