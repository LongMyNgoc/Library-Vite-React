import express from 'express';
import { getAllUserStatistics, addUserStatistic } from '../controllers/userStatisticsController.js';

const router = express.Router();

router.get('/userstatistics', getAllUserStatistics);
router.post('/userstatistics', addUserStatistic);

export default router;
