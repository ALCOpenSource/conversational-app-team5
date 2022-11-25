const cors = require('cors');
const http = require('http');
const express = require('express');
const ioSocket = require("socket.io");
const bodyParser = require('body-parser');
const createError = require('http-errors');

const config = require("../config");
const { setupSocket } = require("./socket");
const app = express();

app.use(cors()); // // app.use(cors(corsOptions));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const UsersRoute = require('../routes/users');
const CoursesRoute = require('../routes/courses');
const authMiddleWare = require('../auth/index');


/**
 *
 * app.use(authMiddleWare);
*/
const server = http.createServer(app);

const io = ioSocket(server, {
  cors: {
    origin: config.appUrl,
  },
});

setupSocket(io);

app.use('/v1/users', authMiddleWare, UsersRoute);
app.use('/v1/courses', authMiddleWare, CoursesRoute);
app.use('/v1/status', (req, res, next) => {
  return res.json({ message: 'Hello World.' });
});

/*
//404 handler and pass to error handler
*/
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

// Setup Database
require('../database')();

server.listen(config.port, () => {
  console.log('Server started on port ' + config.port + '...');
});