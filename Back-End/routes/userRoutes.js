import express from 'express';
import { getAllUsers, registerUser, deleteUser, updateUser } from '../controllers/userController.js';

const router = express.Router();

router.get('/users', getAllUsers);
router.post('/users', registerUser);
router.delete('/users/:user_id', deleteUser);
router.put('/users/:user_id', updateUser);

export default router;
