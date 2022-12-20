import { response, Router } from "express";

const axios = require("axios");
const router = Router();

router.get("/admin", (req, res) => {
  res.render("admin", { layout: "adminLayout" });
});

router.get("/admin/books", (req, res) => {
  axios.get("http://localhost:3000/api/book/render").then((data) => {
    const allbooks = data.data;
    console.log(allbooks);
    res.render("booksAdmin", { layout: "adminLayout", books: true, allbooks });
  });
});

router.get("/admin/booksadd", (req, res) => {
  res.render("booksAdmin", { layout: "adminLayout", add: true });
});

router.get("/admin/users", (req, res) => {
  axios.get("http://localhost:3000/api/user/render").then((data) => {
    const allusers = data.data;
    console.log(allusers);
    res.render("usersAdmin", { layout: "adminLayout", users: true, allusers });
  });  
});

router.get("/admin/usersadd", (req, res) => {
  res.render("usersAdmin", { layout: "adminLayout", add: true });
});

router.get("/admin/sales", (req, res) => {
  res.render("salesAdmin", { layout: "adminLayout" });

});

export default router;
