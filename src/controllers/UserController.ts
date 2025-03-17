import { Request, Response, NextFunction } from "express";
import { UserService } from "../services/UserService";
import { CreateUserInput, UpdateUserInput } from "../schemas/userSchema";
import { AppError } from "../middlewares/errorHandler";

export class UserController {
  constructor(private userService: UserService) {}

  async getAllUsers(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const users = await this.userService.getAllUsers();
      res.json(users);
    } catch (error) {
      next(error); // Passa o erro para o errorHandler
    }
  }

  async getUserById(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const id = parseInt(req.params.id, 10);
      const user = await this.userService.getUserById(id);
      res.json(user);
    } catch (error) {
      next(error); // Passa o erro para o errorHandler
    }
  }

  async createUser(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const validatedData: CreateUserInput = req.body;
      const newUser = await this.userService.createUser(validatedData);
      res.status(201).json(newUser);
    } catch (error) {
      next(error); // Passa o erro para o errorHandler
    }
  }

  async updateUser(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const id = parseInt(req.params.id, 10);
      const validatedData: UpdateUserInput = req.body;
      const updatedUser = await this.userService.updateUser(id, validatedData);
      res.json(updatedUser);
    } catch (error) {
      next(error); // Passa o erro para o errorHandler
    }
  }

  async deleteUser(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const id = parseInt(req.params.id, 10);
      await this.userService.deleteUser(id);
      res.status(204).send();
    } catch (error) {
      next(error); // Passa o erro para o errorHandler
    }
  }
}