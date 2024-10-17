import axios from 'axios';

const API_URL = 'http://localhost:8000/courses'; 

export interface Course {
  _id: string;
  title: string;
  description: string;
  instructor?: {
    name: string;
    email: string;
  };
  status: string;
}

export interface CourseResponse {
  message: string;
  course: Course;
}

// Get all courses
export const getAllCourses = async (): Promise<Course[]> => {
  try {
    const response = await axios.get<Course[]>(API_URL);
    return response.data;
  } catch (error) {
    throw new Error('Error fetching courses: ' + error.message);
  }
};

// Get a single course by ID
export const getSingleCourse = async (courseId: string): Promise<Course> => {
    try {
      const response = await axios.get<Course>(`${API_URL}/${courseId}`);
      return response.data;
    } catch (error) {
      throw new Error('Error fetching course: ' + error.message);
    }
  };

// Get a single course by ID
export const getSingleCourse = async (courseId: string): Promise<Course> => {
  try {
    const response = await axios.get<Course>(`${API_URL}/${courseId}`);
    return response.data;
  } catch (error) {
    throw new Error('Error fetching course: ' + error.message);
  }
};

// Create a new course
export const createCourse = async (courseData: Omit<Course, '_id'>, token: string): Promise<CourseResponse> => {
  try {
    const response = await axios.post<CourseResponse>(`${API_URL}/create`, courseData, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return response.data;
  } catch (error) {
    throw new Error('Error creating course: ' + error.message);
  }
};

// Approve a course
export const approveCourse = async (courseId: string, token: string): Promise<CourseResponse> => {
  try {
    const response = await axios.put<CourseResponse>(`${API_URL}/${courseId}/approve`, null, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return response.data;
  } catch (error) {
    throw new Error('Error approving course: ' + error.message);
  }
};