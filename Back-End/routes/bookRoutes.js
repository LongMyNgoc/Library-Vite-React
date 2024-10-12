import express from 'express';
import { getAllBooks, addBook } from '../controllers/bookController.js';

const router = express.Router();

router.get('/books', getAllBooks);
router.post('/books', addBook);

export default router;
