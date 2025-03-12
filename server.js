import 'dotenv/config';
import express from 'express';
import mongoose from 'mongoose';
import router  from './backend/routes/router.js';



const app = express();


app.use(express.json());
app.use('/traders', router);


const DB_URI = process.env.MONGODB_URI;
const PORT = 3000;

// Connect to MongoDB
mongoose.connect(DB_URI)
    .then(() => {
        console.log('Connected to MongoDB Atlas');
        app.listen(PORT, () => {
            console.log(`Server is running on http://localhost:${PORT}`);
        });
    })
    .catch((error) => {
        console.error('Error connecting to MongoDB Atlas:', error.message);
    });