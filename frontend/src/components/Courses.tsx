// src/components/Course.tsx
import React, { useEffect, useState } from 'react';
import {
  getAllCourses,
  createCourse,
  approveCourse,
  Course as CourseType,
} from '../services/course.service';

interface CourseProps {
  token: string;
}

const Course: React.FC<CourseProps> = ({ token }) => {
  const [courses, setCourses] = useState<CourseType[]>([]);
  const [newCourse, setNewCourse] = useState<Omit<CourseType, '_id'>>({
    title: '',
    description: '',
  });
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const data = await getAllCourses();
        setCourses(data);
      } catch (error: any) {
        setError(error.message);
      }
    };

    fetchCourses();
  }, []);

  const handleCreateCourse = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await createCourse(newCourse, token);
      setCourses((prevCourses) => [...prevCourses, response.course]);
      setNewCourse({ title: '', description: '' }); // Reset form
    } catch (error: any) {
      setError(error.message);
    }
  };

  const handleApproveCourse = async (courseId: string) => {
    try {
      const response = await approveCourse(courseId, token);
      setCourses((prevCourses) =>
        prevCourses.map((course) =>
          course._id === response.course._id ? response.course : course
        )
      );
    } catch (error: any) {
      setError(error.message);
    }
  };

  return (
    <div>
      <h1>Courses</h1>
      {error && <p className="error">{error}</p>}
      <form onSubmit={handleCreateCourse}>
        <input
          type="text"
          placeholder="Course Title"
          value={newCourse.title}
          onChange={(e) => setNewCourse({ ...newCourse, title: e.target.value })}
          required
        />
        <textarea
          placeholder="Course Description"
          value={newCourse.description}
          onChange={(e) =>
            setNewCourse({ ...newCourse, description: e.target.value })
          }
          required
        ></textarea>
        <button type="submit">Create Course</button>
      </form>

      <ul>
        {courses.map((course) => (
          <li key={course._id}>
            <h2>{course.title}</h2>
            <p>{course.description}</p>
            <p>Instructor: {course.instructor?.name}</p>
            <p>Status: {course.status}</p>
            {course.status !== 'Approved' && (
              <button onClick={() => handleApproveCourse(course._id)}>
                Approve Course
              </button>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Course;