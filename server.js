// Variable declaration starts
var express = require('express'),
app = express(),
bodyParser = require('body-parser'),
path = require('path'),
router = express.Router(),
routes = require('./src/router');
// Variable declaration ends

app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Content-Type, Cookie");
    res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
    res.header("Access-Control-Allow-Credentials", true);
    next();
});

app.use(express.static(path.join(__dirname, '/assets')));

app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

app.use('/', router);
routes(router, express);

// Code to run server on port 3000
app.listen(3000, () => {
    console.log('Server running on port 3000');
});
