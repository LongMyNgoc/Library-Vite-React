import express from 'express';
import { getAllUsers, registerUser } from '../controllers/userController.js';

const router = express.Router();

router.get('/users', getAllUsers);
router.post('/users', registerUser);

export default router;
