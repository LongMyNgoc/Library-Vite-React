import express from 'express';
import { getAllBookStatistics, addBookStatistic } from '../controllers/bookStatisticsController.js';

const router = express.Router();

router.get('/bookstatistics', getAllBookStatistics);
router.post('/bookstatistics', addBookStatistic);

export default router;
