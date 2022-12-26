import { Router } from "express";

const router = Router();

router.get("/", (req, res) => {
  res.render("index");
});

router.get("/books", (req, res) => {
  res.render("books");
});

router.get("/login", (req, res) => {
  res.render("auth/login", {layout: "main"});
});

export default router;
