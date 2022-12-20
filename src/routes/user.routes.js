import { Router } from "express";

var userController = require('../controllers/userController')

const router = Router();

router.get("/user/render", userController.renderUsers)
router.post("/user/add", userController.addUser);
router.get("/user/delete/:id", userController.deleteUser);
  
export default router;