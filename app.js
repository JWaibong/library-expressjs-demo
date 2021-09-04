/*  A book must have 0 or more book instances
    A book instance must have 1 book 
    A book must have 1 author
    An author must have 1 or more book(s) 
    A book must have 0 or more genres
    A genre must have 0 or more books */

    require('dotenv').config();
const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const mongoose = require('mongoose');

const indexRouter = require('./routes/index');
const usersRouter = require('./routes/users');
const wikiRouter = require('./routes/wiki');
const catalogRouter = require('./routes/catalog');

const app = express();
const mongoDB = process.env.DATABASE;

mongoose.connect(mongoDB, {useNewUrlParser: true, useUnifiedTopology: true})
.then((result) => {
    console.log('connected to db');
    app.listen(3000);
})
.catch((err) => console.log(err));

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/catalog', catalogRouter);
app.use('/wiki', wikiRouter);


// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});



module.exports = app;
