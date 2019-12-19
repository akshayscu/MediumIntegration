const express = require('express');
const cors = require('cors');
const app = express();

app.use(cors());

app.get('/bbpMedium', function(request, response) {
    var request = require('request');
      var https = require('https');
      var parseString = require('xml2js').parseString;
      var xml = '';
    function xmlToJson(url, callback) {
      var req = https.get(url, function(res) {
        var xml = '';
    res.on('data', function(chunk) {
          xml += chunk;
        });
    res.on('error', function(e) {
          callback(e, null);
        });
    res.on('timeout', function(e) {
          callback(e, null);
        });
    res.on('end', function() {
          parseString(xml, function(err, result) {
            callback(null, result);
          });
        });
      });
    }
    var url = "https://medium.com/feed/the-better-because-project"
    xmlToJson(url, function(err, data) {
      if (err) {
        return console.err(err);
      }
     var jsonString = JSON.stringify(data, null, 2);
     var objectValue = JSON.parse(jsonString);
    
     var g = objectValue['rss']['channel'][0];
    
     var resultArray = [];

     for(var item in g['item']){
        var yourString = g['item'][item]['content:encoded'].toString();
        var maxLength = 200;
        var trimmedString = yourString.substr(0, maxLength);
        var regEx = /\b(https?:\/\/.*?\.[a-z]{2,4}\/[^\s]*\b)/g;
        var authImg= [trimmedString.match(regEx)[0]];
        var data = {
          img: authImg,
          title: g['item'][item]['title'],
          // link: g['item'][item]['link'],
          desc: g['item'][item]['content:encoded']
        };
        resultArray.push(data);
      }
      response.send(resultArray);
     });
    });

    app.get('/akiMedium', function(request, response) {
      var request = require('request');
        var https = require('https');
        var parseString = require('xml2js').parseString;
        var xml = '';
      function xmlToJson(url, callback) {
        var req = https.get(url, function(res) {
          var xml = '';
      res.on('data', function(chunk) {
            xml += chunk;
          });
      res.on('error', function(e) {
            callback(e, null);
          });
      res.on('timeout', function(e) {
            callback(e, null);
          });
      res.on('end', function() {
            parseString(xml, function(err, result) {
              callback(null, result);
            });
          });
        });
      }
      var url = "https://medium.com/feed/@aki9154"
      xmlToJson(url, function(err, data) {
        if (err) {
          return console.err(err);
        }
       var jsonString = JSON.stringify(data, null, 2);
       var objectValue = JSON.parse(jsonString);
       var g = objectValue['rss']['channel'][0];
       var resultArray = [];
       for(var item in g['item']){
          var data = {
            img: ['https://upload.wikimedia.org/wikipedia/commons/4/42/Blog_%281%29.jpg'],
            title: g['item'][item]['title'],
            // link: g['item'][item]['link'],
            desc : g['item'][item]['content:encoded']
          };
          resultArray.push(data);
        }
        response.send(resultArray);
       });
      });

      app.get('/susMedium', function(request, response) {
        var request = require('request');
          var https = require('https');
          var parseString = require('xml2js').parseString;
          var xml = '';
        function xmlToJson(url, callback) {
          var req = https.get(url, function(res) {
            var xml = '';
        res.on('data', function(chunk) {
              xml += chunk;
            });
        res.on('error', function(e) {
              callback(e, null);
            });
        res.on('timeout', function(e) {
              callback(e, null);
            });
        res.on('end', function() {
              parseString(xml, function(err, result) {
                callback(null, result);
              });
            });
          });
        }
        var url = "https://medium.com/feed/@susannapage"
        xmlToJson(url, function(err, data) {
          if (err) {
            return console.err(err);
          }
         var jsonString = JSON.stringify(data, null, 2);
         var objectValue = JSON.parse(jsonString);
         var g = objectValue['rss']['channel'][0];
         var resultArray = [];
         for(var item in g['item']){
            var data = {
              img: ['https://upload.wikimedia.org/wikipedia/commons/4/42/Blog_%281%29.jpg'],
              title: g['item'][item]['title'],
              // link: g['item'][item]['link'],
              desc : g['item'][item]['content:encoded']
            };
            resultArray.push(data);
          }
          response.send(resultArray);
         });
        });
  


    var port = process.env.PORT;
    if (port == null || port == "") {
      port = 2900;
    }
    app.listen(port);


