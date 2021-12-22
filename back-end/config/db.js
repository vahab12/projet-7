const mysql = require('mysql');
require('dotenv').config({ path: './.env' });

// Create connexion
// i don't use .env because its my openclassrooms project so it's not sensible data. In real project, i will use .env and put it in .gitignore
const db = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  database: process.env.DB_NAME,
  password: process.env.DB_PASSWORD,
});

module.exports.getDB = () => {
  return db;
};

/*
db.getConnection((err, connection) => {
  if (err) throw err; //not connected
  console.log('connected as ID' + connection.threadId);
});
*/
