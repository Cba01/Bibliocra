import { Router } from "express";

var userController = require('../controllers/userController')

const router = Router();

router.post("/user/login", userController.login)
router.post("/user/register", userController.addUser);
router.post("/user/logout", userController.logout);
router.get("/user/render", userController.renderUsers);
router.get("/user/delete/:id", userController.deleteUser);
router.post("/user/update/:id", userController.updateUser);

export default router;