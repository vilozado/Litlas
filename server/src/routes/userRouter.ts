import { Router } from "express";
import {
  getBooksBySubject,
  addBookToList,
  getBookList,
  updateBook,
  removeBook,
} from "../controllers/bookController";
const router: Router = Router();

router.get("/books", getBooksBySubject); //Google Books API
router.get("/reading-list", getBookList);
router.post("/reading-list", addBookToList);
router.patch("/reading-list/:id", updateBook);
router.delete("/reading-list/:id", removeBook);

export default router;
