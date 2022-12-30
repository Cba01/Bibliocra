import { Router } from "express";

var ventaController = require('../controllers/ventaController')

const router = Router();

router.post('/venta/comprar', ventaController.comprar)
router.get("/venta/render", ventaController.render)

export default router;