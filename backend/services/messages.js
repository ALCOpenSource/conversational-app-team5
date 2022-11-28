const Course = require('../models/course');

const findCourses = async (title) => {
  try {
    const courses = await Course.find({
      $or: [
        { title: { $regex: `${title}`, $options: 'i' } },
        { tags: { $regex: `${title}`, $options: 'i' } }
      ]
    });

    return courses;
  } catch (error) {
    console.log(error.message);
  }
  return [];
}

const processMessage = async ({message, action}) => {
  let outcome = null;
  switch (action) {
    case 'courses-search':
      outcome = await findCourses(message);
      break;
    default:
      break;
  }
  return outcome;
};


module.exports = { processMessage };