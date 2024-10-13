import express from 'express';
import { getAllBooks, addBook, deleteBook } from '../controllers/bookController.js';

const router = express.Router();

router.get('/books', getAllBooks);
router.post('/books', addBook);
router.delete('/books/:book_id', deleteBook);

export default router;
