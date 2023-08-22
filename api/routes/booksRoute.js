import express from 'express';
const router = express.Router();
import {getBooks,getBook,createBook,deleteBook,updateBook} from '../controllers/bookController.js'
import { verifyToken } from '../middleware/jwt.js';

router.get('/' ,getBooks)
router.get('/:id',getBook)
router.post('/',verifyToken,createBook)
router.delete('/:id',verifyToken,deleteBook)
router.put('/:id',verifyToken,updateBook)

export default router