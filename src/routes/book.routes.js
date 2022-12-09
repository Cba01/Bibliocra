import { Router } from "express";

var bookController = require('../controllers/bookController')

const router = Router();

router.get("/book/render", bookController.renderBooks)
router.post("/book/buscar", bookController.searchBook)
router.post("/book/add", bookController.addBook);
router.get("/book/delete/:id", bookController.deleteBook);
  
export default router;