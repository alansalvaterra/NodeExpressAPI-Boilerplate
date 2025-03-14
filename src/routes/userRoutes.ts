import { Router } from "express";
import { UserController } from "../controllers/UserController";
import { UserService } from "../services/UserService";

const router = Router();
const userService = new UserService();
const userController = new UserController(userService);

router.get("/users", (req, res) => userController.getAllUsers(req, res));
router.get("/users/:id", (req, res) => userController.getUserById(req, res));
router.post("/users", (req, res) => userController.createUser(req, res));
router.put("/users/:id", (req, res) => userController.updateUser(req, res));
router.delete("/users/:id", (req, res) => userController.deleteUser(req, res));

export default router;