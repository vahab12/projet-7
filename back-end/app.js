//Importation de la paquage express (Framework roposant sur node.Js)
const express = require('express');

//Importation de la paquage express (tranfomer le corps de requêt et format js)
const bodyParser = require('body-parser');

//Importation de la paquage de cookiePrser (??)
const cookieParser = require('cookie-parser');

//Importation de la paquage de helmet (améliorer la sécurité de l'app)
const helmet = require('helmet');

//Importation de la paquage de path (chemin pour les rout)
const path = require('path');

//Importer dotenv et configurer
require('dotenv').config(path, './config/.env');

//Importer les fichiers routes chacun de son dossier
const userRoutes = require('./routes/user.routes');
//mysql
const mysql = require('mysql');

//db
const db = require('./config/db');

const app = express();

//test
app.get('', (req, res) => {
  db.getConnection((err, connection) => {
    if (err) throw err;
    console.log('connected as id ' + connection.threadId);
    connection.query('SELECT * from foodly', (err, rows) => {
      connection.release(); // return the connection to pool

      if (!err) {
        res.send(rows);
      } else {
        console.log(err);
      }

      // if(err) throw err
      console.log('The data from beer table are: \n', rows);
    });
  });
});

//connection db
//const database = require('./config/db');
/*
app.listen(process.env.PORT, () => {
  console.log(`Server is up and running on ${process.env.PORT}`);
});

app.get('/getMysqlStatus', (req, res) => {
  database.ping((err) => {
    if (err) return res.status(500).send('MySQL Server is Down');
    res.send('MySQL Server is Active');
  });
});
*/
//const postRoutes = require('./routes/post.routes');
//const commentRoutes = require('./routes/comment.routes');

// Utilisation de ce middlware générale pour résoudre le problème de cors
app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', `${process.env.CLIENT_URL}`);
  res.setHeader(
    'Access-Control-Allow-Headers',
    'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization'
  );
  res.setHeader(
    'Access-Control-Allow-Methods',
    'GET, POST, PUT, DELETE, PATCH, OPTIONS'
  );
  res.setHeader('Access-Control-Allow-Credentials', 'true');
  next();
});

//check db connection

//Utilisation de bodyParser
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use('/images', express.static(path.join(__dirname, 'images')));

//***********Middlewares always executed*********//

//Utilisation de helmet
app.use(helmet());
app.use(express.json());
app.use(cookieParser());

// Les routes
app.use('/api/user', userRoutes);
//app.use('/api/auth', authRoutes);
//app.use('/api/post', postRoutes);
//app.use('/api/comment', commentRoutes);

module.exports = app;
