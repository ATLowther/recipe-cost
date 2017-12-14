const express = require('express');
const app = express();
const path = require('path');
const http = require('http');
const bodyParser = require('body-parser');
const DB = require('./config/baking.conf').MONGODB;

const recipe = require('./routes/routes');

const port = process.env.PORT || 3000;

const mongoose = require('mongoose');
mongoose.connect(DB, { useMongoClient: true });

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

//app.use(morgan('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use('', express.static(path.join(__dirname, 'public')));

//Add routes to app
app.use('/', recipe);

http.createServer(app).listen(port, function (req, res) {
	console.log("Listening on port " + port);
});