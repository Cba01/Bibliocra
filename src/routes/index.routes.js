import { Router } from "express";
import book from "../models/book";

const router = Router();

router.get("/", (req, res) => {
  res.render("index");
});

router.get("/books", async (req, res) => {
  const books = await book.find().lean();

  res.render("books", {layout: 'main', books});
});

router.get("/login", (req, res) => {
  res.render("auth/login", {layout: "main"});
});

export default router;
