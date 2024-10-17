import axios from 'axios';

const axiosInstance = axios.create({
    baseURL: "http://localhost:8000/",
    headers: {
        "Content-Type": "application/json",
    },
});

// Get all courses
const getAllCourses = async () => {
    try {
        const response = await axiosInstance.get("courses");
        return response.data; 
    } catch (error: any) {
        throw new Error(error.response?.data?.error || "Failed to get courses");
    }
};

// Get a course by ID
const getCourseById = async (id: string) => {
    try {
        const response = await axiosInstance.get(`courses/${id}`);
        return response.data; 
    } catch (error: any) {
        throw new Error(error.response?.data?.error || "Failed to get course");
    }
};

export default {
    getAllCourses,
    getCourseById,
};