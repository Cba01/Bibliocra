import { Router } from "express";
import Book from "../models/book";

const router = Router();

router.get("/", (req, res) => {
  res.render("index");
});

router.post("/book/add", async (req, res) => {
  const book = Book(req.body);

  const bookSaved = await book.save();

  console.log(bookSaved);
  res.send("saved");
});

router.get("/about", (req, res) => {
  res.send("about");
});

export default router;
