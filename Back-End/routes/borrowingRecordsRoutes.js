import express from 'express';
import { getAllBorrowingRecords, addBorrowingRecord } from '../controllers/borrowingRecordsController.js';

const router = express.Router();

// Route để lấy danh sách hồ sơ mượn
router.get('/borrowingrecords', getAllBorrowingRecords);

// Route để thêm hồ sơ mượn
router.post('/borrowingrecords', addBorrowingRecord);

export default router;
