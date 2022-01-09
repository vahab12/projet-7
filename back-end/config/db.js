const mysql = require('mysql');
const app = require('../app');
require('dotenv').config({ path: './.env' });

// Create connexion
const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'ROOT1516root',
  database: 'groupomania',
});

module.exports.getDB = () => {
  return db;
};

//Connect
db.connect((err) => {
  if (err) {
    console.log('Error, connexion échouée à BD MYSQL...', err);
    return;
  }
  console.log('Connexion réussie à BD MYSQL...');
});
