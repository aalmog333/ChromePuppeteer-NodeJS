console.log('hello from index');

var fillForm = require('./fill-form');

const puppeteer = require('puppeteer');
puppeteer.launch().then(function(browser) {
  browser.newPage().then(function(page) {

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
      Promise.resolve(fillForm.firstFill(id, phone, page))
        .then(() => {
          console.log('here2');
          res.send('Hello World1')
        });

    });

    app.post('/request2', function(req, res) {
      console.log('here3');
      var code = req.body.code;
      console.log(code);
      Promise.resolve(fillForm.secondFill(code, page))
        .then((renderedContent) => {
          console.log('here4');
          res.send(renderedContent);
        });
    });

    app.listen(3000);

  });
});
