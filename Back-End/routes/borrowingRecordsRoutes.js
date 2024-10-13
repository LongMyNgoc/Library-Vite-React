import express from 'express';
import { getAllBorrowingRecords, addBorrowingRecord, deleteBorrow } from '../controllers/borrowingRecordsController.js';

const router = express.Router();

// Route để lấy danh sách hồ sơ mượn
router.get('/borrowingrecords', getAllBorrowingRecords);

// Route để thêm hồ sơ mượn
router.post('/borrowingrecords', addBorrowingRecord);

router.delete('/borrowingrecords/:borrow_id', deleteBorrow);

export default router;
