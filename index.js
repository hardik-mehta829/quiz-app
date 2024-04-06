const express = require('express');
const cors = require('cors');
const dbconnection = require('./db');
const path = require('path');
const quizroutes = require('./routes/quizroutes');
const Router = express.Router();
const app = express();
app.use(cors());
app.use(express.json());
app.use(express.static('public'));
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');
app.use(express.static(path.join(__dirname, 'public')));
app.use('/api/v1/quiz', quizroutes);

app.get('/', (req, res) => {
  res.render('index', { title: 'Document', score: 0 }); // Render 'index.pug'
});
// app.get('/', (req, res) => {
//   res.setHeader('Access-Control-Allow-Credentials', 'true');
//   res.send('hello hardik');
// });

dbconnection();
console.log(`${__dirname}`);

app.listen(3000, () => {
  console.log(`Listening on port 3000`);
});
