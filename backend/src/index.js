const express = require('express');
const createError = require('http-errors');
const config = require("../config");

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Setup Database
require('../database')();

const UserRoute = require('../routes/users');
app.use('/users', UserRoute);

//404 handler and pass to error handler
app.use((req, res, next) => {
  next(createError(404, 'Not found'));
});

app.use((err, req, res, next) => {
  res.status(err.status || 500);
  res.send({
    error: {
      status: err.status || 500,
      message: err.message
    }
  });
});


app.listen(config.port, () => {
  console.log('Server started on port ' + config.port + '...');
});