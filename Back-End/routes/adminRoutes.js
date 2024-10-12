import express from 'express';
import { getAllAdmins } from '../controllers/adminController.js';

const router = express.Router();

router.get('/admins', getAllAdmins);

export default router;
