import { Router } from "express";
import { UserController } from "../controllers/UserController";
import { UserService } from "../services/UserService";
import { validate } from "../middlewares/validationMiddleware";
import { createUserSchema, updateUserSchema } from "../schemas/userSchema";
import { asyncWrapper } from "../utils/asyncWrapper";

const router = Router();
const userService = new UserService();
const userController = new UserController(userService);

// Rotas
router.get("/users", asyncWrapper((req, res, next) => userController.getAllUsers(req, res, next)));
router.get("/users/:id", asyncWrapper((req, res, next) => userController.getUserById(req, res, next)));
router.post("/users", validate(createUserSchema), asyncWrapper((req, res, next) => userController.createUser(req, res, next)));
router.put("/users/:id", validate(updateUserSchema), asyncWrapper((req, res, next) => userController.updateUser(req, res, next)));
router.delete("/users/:id", asyncWrapper((req, res, next) => userController.deleteUser(req, res, next)));

export default router;