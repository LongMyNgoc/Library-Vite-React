import express from 'express';
import { getAllBorrowHistory, addBorrowHistory, deleteBorrowHistory, editBorrowHistory } from '../controllers/borrowHistoryController.js';

const router = express.Router();

router.get('/borrowhistory', getAllBorrowHistory);
router.post('/borrowhistory', addBorrowHistory);
router.delete('/borrowhistory/:history_id',deleteBorrowHistory);
router.put('/borrowhistory/:book_id', editBorrowHistory);

export default router;
