import express from 'express';
import { verifyToken } from '../middleware/jwt.js';
import { deleteUser, getUser, getUsers } from '../controllers/userController.js';
const router = express.Router();

router.get('/',verifyToken, getUsers)
router.get('/:id',verifyToken, getUser)
router.delete('/:id',verifyToken, deleteUser)


export default router