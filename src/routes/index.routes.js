import { Router } from "express";
import book from "../models/book";

const router = Router();

router.get("/", (req, res) => {
  const user = req.session.user;
  if(user){
    res.render("index", {layout: 'main', auth: true, message: req.flash('message')});
  }else{
    res.render("index", {layout: 'main', auth: false});
  }
});

router.get("/books", async (req, res) => {
  const user = req.session.user;
  const books = await book.find().lean();
  
  if(user){
    res.render("books", {layout: 'main', books, auth: true});
  }else{
    res.render("books", {layout: 'main', books, auth: false});
  }
});

router.get("/login", (req, res) => {
  res.render("auth/login", {layout: "main"});
});

 router.get("/register", (req, res) => {
  res.render("auth/login", {layout: "main", register: true});
});

export default router;
