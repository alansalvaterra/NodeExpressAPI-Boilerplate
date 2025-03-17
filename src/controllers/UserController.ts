import { Request, Response, NextFunction } from "express";
import { UserService } from "../services/UserService";
import { CreateUserInput, UpdateUserInput } from "../schemas/userSchema";
import { AppError } from "../middlewares/errorHandler";

export class UserController {
  constructor(private userService: UserService) {}

  async getAllUsers(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const users = await this.userService.getAllUsers();
      res.status(200).json({ success: true, data: users });
    } catch (error) {
      next(error);
    }
  }

  async getUserById(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const id = parseInt(req.params.id, 10);
      if (isNaN(id)) {
        throw new AppError("ID inválido.", 400);
      }

      const user = await this.userService.getUserById(id);
      res.status(200).json({ success: true, data: user });
    } catch (error) {
      next(error);
    }
  }

  async createUser(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const validatedData: CreateUserInput = req.body;
      const newUser = await this.userService.createUser(validatedData);
      res.status(201).json({ success: true, data: newUser });
    } catch (error) {
      next(error);
    }
  }

  async updateUser(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const id = parseInt(req.params.id, 10);
      if (isNaN(id)) {
        throw new AppError("ID inválido.", 400);
      }
  
      const validatedData: UpdateUserInput = req.body;
      const updatedUser = await this.userService.updateUser(id, validatedData);
  
      // Retorna o usuário atualizado sem o password
      res.status(200).json({ success: true, data: updatedUser });
    } catch (error) {
      next(error);
    }
  }

  async deleteUser(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const id = parseInt(req.params.id, 10);
      if (isNaN(id)) {
        throw new AppError("ID inválido.", 400);
      }

      await this.userService.deleteUser(id);
      res.status(204).json({ success: true, message: "Usuário deletado com sucesso." });
    } catch (error) {
      next(error);
    }
  }
}