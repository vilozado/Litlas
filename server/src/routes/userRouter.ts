import { Router } from "express";
import {
  getBooksBySubject,
  addBookToList,
  getBookList,
  updateBook,
  removeBook,
  getExploredSubjects,
} from "../controllers/bookController";
const router: Router = Router();

router.get("/books", getBooksBySubject);
router.get("/reading-list", getBookList);
router.post("/reading-list", addBookToList);
router.patch("/reading-list/:id", updateBook);
router.delete("/reading-list/:id", removeBook);
router.get("/explored", getExploredSubjects);

export default router;
