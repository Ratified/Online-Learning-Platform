const mongoose = require("mongoose");
const dotenv = require("dotenv");
const Course = require("../models/course.model");

// Load environment variables
dotenv.config();

// Connect to MongoDB
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.error("MongoDB connection failed:", err));

// Sample data for seeding
const courses = [
  {
    title: "JavaScript Basics",
    description:
      "Learn the basics of JavaScript, including variables, loops, and functions.",
    status: "Approved", 
    instructor: null,
  },
  {
    title: "Advanced CSS",
    description:
      "Master advanced CSS techniques including Flexbox, Grid, and animations.",
    status: "Approved",
    instructor: null,
  },
  {
    title: "Node.js for Beginners",
    description: "A beginner's guide to backend development with Node.js.",
    status: "Pending",
    instructor: null,
  },
  {
    title: "React Native for Mobile Development",
    description: "Build mobile applications with React Native.",
    status: "Pending",
    instructor: null,
  },
  {
    title: "Data Structures and Algorithms",
    description:
      "Learn fundamental data structures and algorithms for coding interviews.",
    status: "Approved",
    instructor: null,
  },
  {
    title: "Version Control with Git",
    description: "Learn how to use Git and GitHub for version control.",
    status: "Approved",
    instructor: null,
  },
];

// Seed function to insert courses into the database
const seedCourses = async () => {
  try {
    await Course.deleteMany();
    const seededCourses = await Course.insertMany(courses);
    console.log("Courses seeded:", seededCourses);
    process.exit();
  } catch (error) {
    console.error("Error seeding courses:", error);
    process.exit(1);
  }
};

// Run the seeding function
seedCourses();