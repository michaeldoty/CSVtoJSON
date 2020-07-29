const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const app = express();
const fs = require('fs');
const upload = require("express-fileupload");
const port = 3000;

app.listen(port, () => {
  console.log(`CSVtoJSON is listening on ${port}`);
});

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, '../client')));
app.use(upload());

app.get('/',
  (req, res) => {
    res.render('index');
  });

app.post('/json_to_csv',
(req, res) => {
  let data = JSON.stringify(req.body);
  res.end(data);
})

app.post('/file_upload',
(req, res) => {
  if(req.files) {
    console.log(req.files);
    var file = req.files.file;
    var filename = file.name;
    var path = './'+filename;
    console.log(file.name);
    file.mv('./'+filename, function(err) {
      if(err) {
        console.log(err);
        res.send('error occured');
      } else {
        fs.readFile(path, 'UTF8', function(err, data) {
          if (err) {throw err};
          let json_data = data;
          console.log(json_data);
          res.send(json_data);
        })
      }
    })




  }
})






  // console.log('hello from /fileUpload');
  // console.log(req);
  // fs.readFile(req.value, 'UTF8', function(err, data) {
  //   if (err) {throw err};
  //   let json_data = data;
  //   console.log(json_data);
