import express from 'express';
import { getBooksByCountry, addBookToList, getBookList } from './controllers/bookController';
const router = express.Router();

router.get('/api/books', getBooksByCountry) //Google Books API
router.get('/reading-list', getBookList)
router.post('/reading-list', addBookToList)

export default router;