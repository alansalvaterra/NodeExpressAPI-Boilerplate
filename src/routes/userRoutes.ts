import { Router } from "express";
import { UserController } from "../controllers/UserController";
import { UserService } from "../services/UserService";
import { validate } from "../middlewares/validationMiddleware";
import { createUserSchema, updateUserSchema } from "../schemas/userSchema";

const router = Router();
const userService = new UserService();
const userController = new UserController(userService);

// Rotas
router.get("/users", (req, res) => userController.getAllUsers(req, res));
router.get("/users/:id", (req, res) => userController.getUserById(req, res));
router.post("/users", validate(createUserSchema), (req, res) => userController.createUser(req, res));
router.put("/users/:id", validate(updateUserSchema), (req, res) => userController.updateUser(req, res));
router.delete("/users/:id", (req, res) => userController.deleteUser(req, res));

export default router;