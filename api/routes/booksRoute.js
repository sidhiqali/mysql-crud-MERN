import express from 'express';
const router = express.Router();
import {getBooks,getBook,createBook,deleteBook,updateBook} from '../controllers/bookController.js'

router.get('/' ,getBooks)
router.post('/:id',getBook)
router.post('/',createBook)
router.delete('/:id',deleteBook)
router.put('/:id',updateBook)

export default router