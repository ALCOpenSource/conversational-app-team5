const createError = require('http-errors');
const mongoose = require('mongoose');

const User = require('../models/user');

module.exports = {
  index: async (req, res, next) => {
    try {
      const results = await User.find({}, { __v: 0 });
      res.send(results);
    } catch (error) {
      console.log(error.message);
    }
  },

  create: async (req, res, next) => {
    try {
      const user = new User(req.body);
      const result = await user.save();
      console.log(result);

      res.send(result);
    } catch (error) {
      console.log(error.message);
      if (error.name === 'ValidationError') {
        next(createError(422, error.message));
        return;
      }
      next(error);
    }
  },

  get: async (req, res, next) => {
    const id = req.params.id;
    try {
      const user = await User.findById(id);
      console.log(user);

      if (!user) {
        throw createError(404, 'User does not exist.');
      }
      res.send(user);
    } catch (error) {
      console.log(error.message);
      if (error instanceof mongoose.CastError) {
        next(createError(400, 'Invalid user id'));
        return;
      }
      next(error);
    }
  },

  update: async (req, res, next) => {
    try {
      const id = req.params.id;
      const updates = req.body;
      const options = { new: true };

      const result = await User.findByIdAndUpdate(id, updates, options);
      console.log(result);

      if (!result) {
        throw createError(404, 'User does not exist');
      }
      res.send(result);
    } catch (error) {
      console.log(error.message);
      if (error instanceof mongoose.CastError) {
        return next(createError(400, 'Invalid user Id'));
      }

      next(error);
    }
  },

  delete: async (req, res, next) => {
    const id = req.params.id;
    try {
      const result = await User.findByIdAndDelete(id);
      console.log(result);
      if (!result) {
        throw createError(404, 'User does not exist.');
      }
      res.send(result);
    } catch (error) {
      console.log(error.message);
      if (error instanceof mongoose.CastError) {
        next(createError(400, 'Invalid user id'));
        return;
      }
      next(error);
    }
  }
};