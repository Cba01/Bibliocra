import { Router } from "express";

var bookController = require("../controllers/bookController");

const router = Router();

var multer = require("multer");
var date = Date.now();

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
router.post("/book/add", load.single("image"),bookController.addBook);
router.get("/book/delete/:id", bookController.deleteBook);

export default router;
