import { Router } from "express";

var userController = require('../controllers/userController')

const router = Router();

router.post("/user/login", userController.login)
router.post("/user/register", userController.addUser);
router.get("/user/render", userController.renderUsers)
router.post("/user/buscar", userController.searchUser)
router.get("/user/delete/:id", userController.deleteUser);
  
export default router;