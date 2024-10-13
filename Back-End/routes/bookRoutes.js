import express from 'express';
import { getAllBooks, addBook, deleteBook, updateBook, borrowBook } from '../controllers/bookController.js';

const router = express.Router();

router.get('/books', getAllBooks);
router.post('/books', addBook);
router.delete('/books/:book_id', deleteBook);
router.put('/books/:book_id', updateBook);
router.put('/books/:book_id/borrow', borrowBook);

export default router;
