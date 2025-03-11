import express from 'express';
import mongoose from 'mongoose';
import router  from './backend/routes/router.js';


const app = express();


app.use(express.json());

app.use('/traders', router);
const MONGO_URI = 'mongodb+srv://makeup-app-user:lmsdLNEcGRGymWZa@elc-makeup-cluster.0pi4ejt.mongodb.net/Vue';

// Connect to MongoDB
mongoose.connect(MONGO_URI)
    .then(() => {
        console.log('Connected to MongoDB Atlas');
        // Start the server
        const PORT = 3000;
        app.listen(PORT, () => {
            console.log(`Server is running on http://localhost:${PORT}`);
        });
    })
    .catch((error) => {
        console.error('Error connecting to MongoDB Atlas:', error);
    });