import axios from "axios";

// Define types for user data, credentials, and profile data
type UserData = {
    name: string;
    email: string;
    password: string;
};

type Credentials = {
    email: string;
    password: string;
};

type ProfileData = {
    name?: string;  
    email?: string; 
    password?: string; 
};

// Create an Axios instance
const axiosInstance = axios.create({
    baseURL: "http://localhost:8000/",
    headers: {
        "Content-Type": "application/json",
    },
});

// Register a new user
const register = async (userData: UserData) => {
    try {
        const response = await axiosInstance.post("auth/register", userData);
        return response.data; 
    } catch (error: any) {
        throw new Error(error.response?.data?.error || "Failed to register");
    }
};

// Log in a user
const login = async (credentials: Credentials) => {
    try {
        const response = await axiosInstance.post("auth/login", credentials);
        return response.data; 
    } catch (error: any) {
        throw new Error(error.response?.data?.error || "Failed to log in");
    }
};

// Update the user profile
const updateProfile = async (profileData: ProfileData, token: string) => {
    try {
        const response = await axiosInstance.put("auth/profile", profileData, {
            headers: {
                Authorization: `Bearer ${token}`, 
            },
        });
        return response.data; 
    } catch (error: any) {
        throw new Error(error.response?.data?.error || "Failed to update profile");
    }
};

// Get the currently authenticated user's data
const getUserData = async (token: string) => {
    try {
        const response = await axiosInstance.get("auth/me", {
            headers: {
                Authorization: `Bearer ${token}`, 
            },
        });
        return response.data; 
    } catch (error: any) {
        throw new Error(error.response?.data?.error || "Failed to get user data");
    }
};


export default {
    register,
    login,
    updateProfile,
    getUserData,
}