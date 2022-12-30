import { Router } from "express";

var bookController = require("../controllers/bookController");

const router = Router();

var multer = require("multer");
var date = Date.now();

// Variables necesarias para guardar las imagenes en la carpeta images y ponerles nombre segun la fecha para diferenciarlos.
var storagePath = multer.diskStorage({
  destination: function (request, file, callback) {
    callback(null, "./src/public/images/");
  },
  filename: function (request, file, callback) {
    console.log(file);
    callback(null, date + "_" + file.originalname);
  },
});
var load = multer({ storage: storagePath });

router.get("/book/render", bookController.renderBooks);
router.get('/book/buscar/:id', bookController.searchBookId);
router.post("/book/buscar", bookController.searchBook)//no terminado

// Enviar imagen y guardar Libro; 
router.post("/book/add", load.single("image"),bookController.addBook);

// Eliminar Libro Por ID
router.get("/book/delete/:id", bookController.deleteBook);

// Actualizar Libro por ID
router.post("/book/update/:id",load.single("image"), bookController.updateBook);

//Enviar a la Vista formulario de crear Libro
// router.get("/book/createBook", (req, res) => {
//   res.render("addBook", { layout: "adminLayout"});
// });

//Enviar a la Vista formulario de Actualizar Libro
// router.get("/book/updateBook/:id", async (req, res) => {
//   // Buscar Libro por ID y enviarlo como variable
//   const book = await Book.findById(req.params.id).lean();
//   res.render("updateBook", { layout: "adminLayout", book});
// });




export default router;
