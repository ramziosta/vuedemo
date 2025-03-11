import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
const app = express();
const port = 4000;
app.use(cors());
app.use(express.json());

// MongoDB connection URI
const mongoURI = 'mongodb+srv://makeup-app-user:lmsdLNEcGRGymWZa@elc-makeup-cluster.0pi4ejt.mongodb.net/makeup-db';

// Connect to MongoDB
mongoose.connect(mongoURI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => {
    console.log('Connected to MongoDB');
}).catch((error) => {
    console.error('Error connecting to MongoDB:', error);
});

const traderSchema = new mongoose.Schema({
    id: { type: String, required: true },  // Trader's ID (string)
    name: { type: String, required: true },  // Trader's name
    type: { type: String, required: true },  // Employment type (e.g., Full-Time, Part-Time)
    description: { type: String, required: true },  // Description of the trader's background
    location: { type: String, required: true },  // Trader's location
    salary: { type: String, required: true },  // Trader's salary range (string)
    company: {
        name: { type: String, required: true },  // Company name (e.g., Binance)
        location: { type: String, required: true },  // Company location
        description: { type: String, required: true },  // Company description
        contactEmail: { type: String, required: true },  // Company contact email
        contactPhone: { type: String, required: true },  // Company contact phone number
    },
});


const Trader = mongoose.model('Trader', traderSchema, 'vue/traders');  // 'vue/traders' specifies the collection name

 const data = app.get('/api/data', async (req, res) => {
    try {
        // Fetch all trader data from the 'vue/traders' collection
        const traders = await Trader.find();
        res.json(traders);
    } catch (error) {
        console.error('Error fetching data:', error);
        res.status(500).json({ message: 'Error fetching traders data' });
    }
});
console.log(data);
// Start the server
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});