//Importation de la paquage express (Framework roposant sur node.Js)
const express = require('express');

//Importation de la paquage express (tranfomer le corps de requêt et format js)
const bodyParser = require('express');

//Importation de la paquage de cookiePrser (??)
const cookieParser = require('cookie-parser');

//Importation de la paquage de helmet (améliorer la sécurité de l'app)
const helmet = require('helmet');

//Importation de la paquage de path (chemin pour les rout)
const path = require('path');

//Importer dotenv et configurer
require('dotenv').config(path, './config/.env');

//Importer les fichiers routes chacun de son dossier
//const userRoutes = require('./routes/user.routes');
//const postRoutes = require('./routes/post.routes');
//const authRoutes = require('./routes/auth.routes');
//const commentRoutes = require('./routes/comment.routes');

const app = express();

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

//Utilisation de bodyParser
app.use(bodyParser.json());

app.use('/images', express.static(path.join(__dirname, 'images')));

// ######### Middlewares always executed ########//

//Utilisation de helmet
app.use(helmet());
app.use(express.json());
app.use(cookieParser());

// Les routes
//app.use('/api/auth', authRoutes);
//app.use('/api/user', userRoutes);
//app.use('/api/post', postRoutes);
//app.use('/api/comment', commentRoutes);

module.exports = app;
