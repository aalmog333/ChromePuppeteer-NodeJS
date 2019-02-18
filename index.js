console.log('hello from index');
var fillForm = require('./fill-form');

var express = require('express');
var app = express();

var bodyParser = require('body-parser');
app.use(bodyParser.json()); // support json encoded bodies
app.use(bodyParser.urlencoded({
  extended: true
})); // support encoded bodies



app.post('/request1', function(req, res) {

  console.log('here1');
  var id = req.body.id;
  var phone = req.body.phone;
  console.log(id);
  console.log(phone);
  Promise.resolve(fillForm.firstFill(id, phone))
    .then(() => {
      console.log('here2');
      res.send('Hello World1')
    });

});

app.post('/request2', function(req, res) {
  console.log('here3');
  var code = req.body.code;
  console.log(code);
  res.send('Hello World2')
});

app.listen(3000);
