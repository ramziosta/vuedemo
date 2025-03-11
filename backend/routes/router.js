import express from 'express';
const router = express.Router();

import { getAllTraders, createTrader, updateTrader, deleteTrader } from '../controllers/TradersController.js';

router.get('/', getAllTraders);
router.post('/data', createTrader);
router.put('/data/:id', updateTrader);
router.delete('/data/:id', deleteTrader);

export default router;