var express = require('express');
var app = express();

var bodyParser = require('body-parser');
app.use(bodyParser.json()); // support json encoded bodies
app.use(bodyParser.urlencoded({
  extended: true
})); // support encoded bodies

// app.get('/', function (req, res) {
//   console.log('here1');
//   res.send('Hello World1')
// });

app.post('/request1', function(req, res) {
  console.log('here1');
  console.log(req.body);
  var id = req.body.id;
  var phone = req.body.phone;
  console.log(id);
  console.log(phone);
  res.send('Hello World1')
});

app.post('/request2', function(req, res) {
  console.log('here2');
  var code = req.body.code;
  console.log(code);
  res.send('Hello World2')
});

app.listen(3000);
