var express = require('express');
var mysql = require('mysql');
var app = express();
var bodyParser = require("body-parser");

// set the view engine to ejs
app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({ extended: true }));

// use res.render to load up an ejs view file
var connection = mysql.createConnection({
    host: '206.12.96.242',
    user: 'group0',
    password: 'untanglingGroup0',
    database: 'group0DB'
});
connection.connect();

var listings;

connection.query('SELECT * FROM stuff WHERE location="sidney"', function(err, rows, fields) {
    if (err) throw err;

    listings = rows;
    console.log(rows[0]);
});

connection.end();

app.get('/', function(req, res) {


    res.render('async1', { listings: listings })
})

//query
app.post('/query', function(req, res) {

    console.log(req.body);

});

// about page 
app.get('/about', function(req, res) {
    var sentence = "this is a test about page, passed as a variable through ejs";
    var drinks = [
        { name: 'Bloody Mary', drunkness: 3 },
        { name: 'Martini', drunkness: 5 },
        { name: 'Scotch', drunkness: 10 }
    ];
    res.render('about', {
        drinks: drinks,
        sentence: sentence
    });
});

app.listen(8000, function() {
    console.log('Example app listening on port 8000!')
})