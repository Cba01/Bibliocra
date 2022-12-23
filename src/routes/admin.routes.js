import { response, Router } from "express";
import Book from "../models/book";

const axios = require("axios");
const router = Router();

router.get("/admin", (req, res) => {
  const user = req.session.user;
  console.log(user)

  if(user){
    if(user.rol != 'administrador'){
      res.redirect('/');
    }
    res.render("admin", { layout: "adminLayout", auth: true });
  }else{
    res.redirect('/login');
  }
});

router.get("/admin/books", (req, res) => {
  const user = req.session.user;

  if(user){
    if(user.rol != 'administrador'){
      res.redirect('/')
    }
    axios.get('http://localhost:3000/api/book/render').then((data)=>{
      const allbooks = data.data;

      res.render("booksAdmin", { layout: "adminLayout", books: true, allbooks, auth: true});
    });
  }else{
    res.redirect('/login');
  }
});

router.get("/admin/book/createBook", (req, res) => {
  const user = req.session.user;

  if(user){
    if(user.rol != 'administrador'){
      res.redirect('/')
    }
    res.render("addBook", { layout: "adminLayout", auth: true });
  }else{
    res.redirect('/login');
  }
});

router.get("/admin/book/updateBook/:id", async (req, res) => {
  // Buscar Libro por ID y enviarlo como variable
  const book = await Book.findById(req.params.id).lean();
  res.render("updateBook", { layout: "adminLayout", book, auth: true});
});

router.get("/admin/users", (req, res) => {
  const user = req.session.user;

  if(user){
    if(user.rol != 'administrador'){
      res.redirect('/')
    }
    axios.get("http://localhost:3000/api/user/render").then((data) => {
    const allusers = data.data;

    res.render("usersAdmin", { layout: "adminLayout", users: true, allusers, auth: true});
  });
  }else{
    res.redirect('/login');
  }
});

router.get("/admin/useradd", (req, res) => {
  const user = req.session.user;

  if(user){
    if(user.rol != 'administrador'){
      res.redirect('/')
    }
    res.render("usersAdmin", { layout: "adminLayout", add: true, auth: true });
  }else{
    res.redirect('/login');
  }
});

router.get("/admin/sales", (req, res) => {
  const user = req.session.user;

  if(user){
    if(user.rol != 'administrador'){
      res.redirect('/')
    }
    res.render("salesAdmin", { layout: "adminLayout", auth: true });
  }else{
    res.redirect('/login');
  }
});

export default router;
