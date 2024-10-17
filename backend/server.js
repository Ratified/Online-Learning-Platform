const express = require('express');
const app = express();
const dotenv = require('dotenv');
const mongoose = require('mongoose');
const cors = require('cors');

dotenv.config();

// From the .env file
const PORT = process.env.PORT;
const MONGO_URL = process.env.MONGO_URL;

app.use(express.json());
app.use(cors());

// Connect to MongoDB
const connectToDB = async () => {
    try{
        await mongoose.connect(process.env.MONGO_URL)
        console.log('Connected to MongoDB');

        // Start the server
        app.listen(PORT, () => {
            console.log('Server is running on port', PORT);
        })
    } catch (error){
        console.log(error);
    }
}

connectToDB();