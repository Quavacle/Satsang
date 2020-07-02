var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var mongoose = require('mongoose');
var cors = require('cors');

require('dotenv').config();

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/userRoute');

var bookRouter = require('./routes/bookRoute');
var instanceRouter = require('./routes/instanceRoute');
var app = express();

mongoose.connect(
  '  mongodb+srv://satsangTest:kIxgwdtAZyYClS7A@cluster0-mdil5.mongodb.net/satsang?retryWrites=true&w=majority'
);

var db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(cors());

app.use('/', indexRouter);
app.use('/users', usersRouter);

app.use('/books', bookRouter);
app.use('/instances', instanceRouter);

module.exports = app;
