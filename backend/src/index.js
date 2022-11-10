const cors = require('cors');
const express = require('express');
const config = require("../config");
const bodyParser = require('body-parser');
const createError = require('http-errors');

const app = express();
app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Setup Database
require('../database')();

const UsersRoute = require('../routes/users');
const CoursesRoute = require('../routes/courses');
const authMiddleWare = require('../auth/index');

/**
 *
 * app.use(authMiddleWare);
*/



app.use('/v1/users', authMiddleWare, UsersRoute);
app.use('/v1/courses', authMiddleWare, CoursesRoute);
app.use('/v1/status', (req, res, next) => {
  return res.json({ message: 'Hello World.' });
});
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