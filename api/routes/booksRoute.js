import express from 'express';
const router = express.Router();
import {getBooks,getBook,createBook,deleteBook,updateBook} from '../controllers/bookController.js'

router.get('/books' ,getBooks)
router.post('/books/:id',getBook)
router.post('/books',createBook)
router.delete('/books/:id',deleteBook)
router.put('/books/:id',updateBook)

export default router