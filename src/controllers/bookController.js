import Book from "../models/book";
var deleteImg = require("fs");

const renderBooks = async function (req, res) {
  const books = await Book.find();

  res.status(200).send(books);
};

const addBook = async function (req, res) {
  req.body.image = req.file.filename;
  const book = Book(req.body);

  const bookSaved = await book.save();

  console.log("LIBRO GUARDADO" + bookSaved);

  res.redirect("/admin/books");
};

const deleteBook = async function (req, res) {
  var { id } = req.params;
  var book = await Book.findById(id);
  var imageName = "./src/public/images/" + book.image;

  console.log("LIBRO BORRADO: " + book);

  await Book.remove({ _id: id });
  if (deleteImg.existsSync(imageName)) {
    console.log("IMAGEN ENCONTRADA");
    deleteImg.unlinkSync(imageName);
  }
  res.redirect("/admin/books");
};

module.exports = {
  renderBooks,
  addBook,
  deleteBook,
};
