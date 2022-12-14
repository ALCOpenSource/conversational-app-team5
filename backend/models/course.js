const mongoose = require('mongoose');
/**
 * We can create the content field as a buffer. That way we can do,

  const a = new Course({ content: {type: 'Buffer', data: 'link to youtube video'}}); // {"type":"Buffer","data": "url" }

  const b = new Course({ content: bufferStream }); // {"type":"Buffer","data":[serialized buffer content in an array]}

*/


const schema = new mongoose.Schema({
  author_id: {
    required: true,
    type: String
  },
  author_name: {
    required: true,
    type: String
  },
  title: {
    required: true,
    type: String
  },
  tags: {
    required: true,
    type: Array
  },
  description: {
    required: true,
    type: String
  },
  contentType: {
    required: true,
    type: String,
    enum: ['video', 'link', 'text']
  },
  content: {
    required: true,
    type: String
  },
  timestamp: {
    required: true,
    type: Date
  },
});

const Course = mongoose.model('courses', schema);

module.exports = Course;