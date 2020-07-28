const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const app = express();
const port = 3000;

app.listen(port, () => {
  console.log(`CSVtoJSON is listening on ${port}`);
});

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, '../client')));

app.get('/',
  (req, res) => {
    res.render('index');
  });

  app.get('/create',
  (req, res) => {
    res.render('index');
  });

  app.post('/signup',
  (req, res) => {
    //res.json(req.body.username);
    models.Users.create(req.body)
      .then(() => {
        res.redirect('/');
      })
      .catch((err) => {
        res.redirect('/signup');
      });

  });












// const http = require('http');

// const hostname = '127.0.0.1';
// const port = 3000;

// const server = http.createServer((req, res) => {
//   res.statusCode = 200;
//   res.setHeader('Content-Type', 'text/plain');
//   res.end('Hello, World!!!\n');
// });

// server.listen(port, hostname, () => {
//   console.log(`Server running at http://${hostname}:${port}/`);
// });