import mongoose from 'mongoose';

const traderSchema = new mongoose.Schema({
    id: { type: String, required: true },
    name: { type: String, required: true },
    type: { type: String, required: true },
    description: { type: String, required: true },
    location: { type: String, required: true },
    salary: { type: String, required: true },
    company: {
        name: { type: String, required: true },
        location: { type: String, required: true },
        description: { type: String, required: true },
        contactEmail: { type: String, required: true },
        contactPhone: { type: String, required: true },
    },
}, { timestamps: true });

const Trader = mongoose.model('Trader', traderSchema);

export default Trader;