const Course = require('../models/course.model');

// Get all courses
const getAllCourses = async (req, res) => {
  try{
    const courses = await Course.find().populate('instructor', 'name email');
    res.status(200).json(courses);
  } catch(error){
    res.status(500).json({error: 'Server error'})
  }
}

const getSingleCourse = async (req, res) => {
  const { courseId } = req.params;
  const id = parseInt(courseId);

  try {
    const course = await Course.findById(id).populate('instructor', 'name email');
    if (!course) {
      return res.status(404).json({ message: 'Course not found' });
    }

    res.status(200).json(course);
  } catch (err) {
    res.status(500).json({ error: 'Server error' });
  }
}

// Create course (Instructors only)
const createCourse = async (req, res) => {
  const { title, description } = req.body;
  if (req.user.role !== 'instructor') {
    return res.status(403).json({ message: 'Only instructors can create courses' });
  }

  const newCourse = new Course({
    title,
    description,
    instructor: req.user.id,
  });

  try {
    await newCourse.save();
    res.status(201).json({ message: 'Course created', course: newCourse });
  } catch (err) {
    res.status(500).json({ error: 'Course creation failed' });
  }
};

// Approve course (Approvers only)
const approveCourse = async (req, res) => {
  const { courseId } = req.params;
  if (req.user.role !== 'approver') {
    return res.status(403).json({ message: 'Only approvers can approve courses' });
  }

  try {
    const course = await Course.findByIdAndUpdate(courseId, { status: 'Approved' }, { new: true });
    res.status(200).json({ message: 'Course approved', course });
  } catch (err) {
    res.status(500).json({ error: 'Approval failed' });
  }
};

module.exports = { getAllCourses, getSingleCourse, createCourse, approveCourse };