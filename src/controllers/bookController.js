import Book from "../models/book";
var deleteImg = require("fs");

const renderBooks = async function (req, res) {
  const books = await Book.find();

  res.status(200).send(books);
};

const addBook = async function (req, res) {
  // Reemplazar el nombre de la imagen del formulario con el nuevo nombre con la fecha incluida.
  req.body.image = req.file.filename;

  //Crear libro con la informacion del formulario y guardarlo en la BD
  const book = Book(req.body);
  const bookSaved = await book.save();
  console.log("LIBRO GUARDADO" + bookSaved);

  res.redirect("/admin/books");
};

const deleteBook = async function (req, res) {
  // Recibir ID de los parametros y buscar libro segun la ID
  var { id } = req.params;
  var book = await Book.findById(id);

  var imageName = "./src/public/images/" + book.image;

  // Eliminar libro por ID y eliminar imagen
  await Book.remove({ _id: id });

  // Comprobar si la imagen existe y si existe entonces Borrar
  if (deleteImg.existsSync(imageName)) {
    console.log("IMAGEN ENCONTRADA");
    deleteImg.unlinkSync(imageName);
  }
  console.log("LIBRO BORRADO: " + book);

  res.redirect("/admin/books");
};

const updateBook = async function (req, res) {
  const { id } = req.params;

  // Reemplazar el nombre de la imagen del formulario con el nuevo nombre con la fecha incluida.
  req.body.image = req.file.filename;

  // Asegurarse si se envió una imagen en el formulario
  if (req.file) {
    if (req.file.filename) {

      // Buscar libro por ID, guardar en variable ruta de la supuesta imagen
      var book = await Book.findById(id);
      var imageName = "./src/public/images/" + book.image;

      // Si existe la imagen guardada que se intenta actualizar en en la carpeta images entonces borrarla de la carpeta
      if (deleteImg.existsSync(imageName)) {
        console.log("IMAGEN ENCONTRADA"+imageName)
        deleteImg.unlinkSync(imageName);
      }
    }
  }

  //Actualizar libro por id con el nuevo nombre de la imagen.
  await Book.findByIdAndUpdate(id, req.body);
  console.log("LIBRO ACTUALIZADO");

  res.redirect("/admin/books");
};

module.exports = {
  renderBooks,
  addBook,
  deleteBook,
  updateBook,
};
