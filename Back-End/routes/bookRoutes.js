import express from 'express';
import { getAllBooks, addBook, deleteBook, updateBook } from '../controllers/bookController.js';

const router = express.Router();

router.get('/books', getAllBooks);
router.post('/books', addBook);
router.delete('/books/:book_id', deleteBook);
router.put('/books/:book_id', updateBook);

export default router;
