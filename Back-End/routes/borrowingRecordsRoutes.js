import express from 'express';
import { getAllBorrowingRecords } from '../controllers/borrowingRecordsController.js';

const router = express.Router();

// Route để lấy danh sách hồ sơ mượn
router.get('/borrowingrecords', getAllBorrowingRecords);

export default router;
