const createError = require('http-errors');
const mongoose = require('mongoose');

const Course = require('../models/course');

module.exports = {
  index: async (req, res, next) => {
    try {
      const results = await Course.find({}, { __v: 0 });
      res.send(results);
    } catch (error) {
      console.log(error.message);
    }
  },

  create: async (req, res, next) => {
    try {
      const course = new Course(req.body);
      const result = await course.save();
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
      const course = await Course.findById(id);
      console.log(course);

      if (!course) {
        throw createError(404, 'Course does not exist.');
      }
      res.send(course);
    } catch (error) {
      console.log(error.message);
      if (error instanceof mongoose.CastError) {
        next(createError(400, 'Invalid course id'));
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

      const result = await Course.findByIdAndUpdate(id, updates, options);
      console.log(result);

      if (!result) {
        throw createError(404, 'Course does not exist');
      }
      res.send(result);
    } catch (error) {
      console.log(error.message);
      if (error instanceof mongoose.CastError) {
        return next(createError(400, 'Invalid course Id'));
      }

      next(error);
    }
  },

  delete: async (req, res, next) => {
    const id = req.params.id;
    try {
      const result = await Course.findByIdAndDelete(id);
      console.log(result);
      if (!result) {
        throw createError(404, 'Course does not exist.');
      }
      res.send(result);
    } catch (error) {
      console.log(error.message);
      if (error instanceof mongoose.CastError) {
        next(createError(400, 'Invalid course id'));
        return;
      }
      next(error);
    }
  }
};