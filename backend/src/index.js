const cors = require('cors');
const express = require('express');
const config = require("../config");
const admin = require('firebase-admin');
const bodyParser = require('body-parser');
const createError = require('http-errors');

const fireStoreConfig = {
  apiKey: config.apiKey,
  authDomain: "masterminds-9786b.firebaseapp.com",
  projectId: "masterminds-9786b",
  storageBucket: "masterminds-9786b.appspot.com",
  messagingSenderId: "651708189533",
  appId: "1:651708189533:web:c35688e35b055069c576b4",
  measurementId: "G-G805F4B5HZ"
};


admin.initializeApp(fireStoreConfig);


const app = express();
app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Setup Database
require('../database')();

const TokenRoute = require('../routes/token');
const UsersRoute = require('../routes/users');
const CoursesRoute = require('../routes/courses');

app.use('/users', UsersRoute);
app.use('/courses', CoursesRoute);
app.use('/validate-token', TokenRoute );

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