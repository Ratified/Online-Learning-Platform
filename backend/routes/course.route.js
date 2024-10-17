const express = require('express');
const courseController = require('../controllers/course.controller');
const { getAllCourses, getSingleCourse, createCourse, approveCourse } = courseController;
const { verifyToken, verifyRole } = require('../middleware/auth.middleware');

const router = express.Router();

// Get all courses
router.get('/', getAllCourses);

// Get course by ID
router.get('/:courseId', getSingleCourse);

// Create course (Instructors only)
router.post('/create', verifyToken, verifyRole('instructor'), createCourse);

// Approve course (Approvers only)
router.put('/:courseId/approve', verifyToken, verifyRole('approver'), approveCourse);

module.exports = router;
