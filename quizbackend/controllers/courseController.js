const Course = require('../models/courses');

module.exports.createCourse = async (req, res, next) => {
  try {
    const { name, description } = req.body;
    console.log('Course submitted:', req.body);

    if (!name || !description) {
      return res.status(400).json({ message: "Please provide name and description for the course." });
    }

    const existingCourse = await Course.findOne({ name });
    if (existingCourse) {
      return res.status(400).json({ message: "Course with this name already exists." });
    }

    const course = await Course.create({ name, description });

    const courses = await Course.find();

    return res.status(201).json({ message: "Course created successfully", success: true, courses,course });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "An error occurred while creating the course." });
  }
};

module.exports.getCourse = async (req, res, next) => {
  try {
    const courses = await Course.find();
    return res.status(200).json({ success: true, courses });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "An error occurred while fetching the courses." });
  }
};
// Update course
module.exports.getCourseEdit = async (req, res, next) => {
  try {
    const { courseId } = req.params;
    const course = await Course.findById(courseId);
    return res.status(200).json({ success: true, course });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "An error occurred while fetching the courses." });
  }
};

exports.updateCourse = async (req, res) => {
  try {
    const { courseId } = req.params;
    const { name, description } = req.body;
    const updatedCourse = await Course.findByIdAndUpdate(courseId, { name, description }, { new: true });

    if (!updatedCourse) {
      return res.status(404).json({ message: 'Course not found' });
    }

    res.status(200).json({ message: 'Course updated successfully', course: updatedCourse });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

// Delete course
exports.deleteCourse = async (req, res) => {
  try {
    const { courseId } = req.params;
    const deletedCourse = await Course.findByIdAndDelete(courseId);

    if (!deletedCourse) {
      return res.status(404).json({ message: 'Course not found' });
    }

    res.status(200).json({ message: 'Course deleted successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
};