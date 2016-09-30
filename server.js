// renamed to app.js from server.js

const express = require('express');
const bodyParser = require('body-parser');
const MongoClient = require('mongodb').MongoClient;
const app = express();



app.use(express.static(__dirname));
app.use(bodyParser.urlencoded({extended: true}));

// All the handlers below middleware here:
var db;
MongoClient.connect('mongodb://ChrisZ:2ndMouse@ds047146.mlab.com:47146/project-crud', (err, database) => {
  if (err) return console.log(err)
  db = database
  app.listen(3000, () => {
    console.log('listening on 3000')
  })
})





app.get('/', (req, res) => {
    res.sendFile(__dirname + '/index.html')
})

app.post('/quotes', (req, res) => {
    db.collection('quotes').save(req.body, (err, result) => {
        if (err) return console.log(err)
        console.log('saved to database')
        res.redirect('/')
    })
})
