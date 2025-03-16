import { Request, Response } from "express";
import { UserService } from "../services/UserService";
import { CreateUserInput, UpdateUserInput } from "../schemas/userSchema";
import { AppError } from "../middlewares/errorHandler";

export class UserController {
  constructor(private userService: UserService) {}

  async getAllUsers(req: Request, res: Response): Promise<void> {
    const users = await this.userService.getAllUsers();
    res.json(users);
  }

  async getUserById(req: Request, res: Response): Promise<void> {
    const id = parseInt(req.params.id, 10);
    const user = await this.userService.getUserById(id);
    res.json(user);
  }

  async createUser(req: Request, res: Response): Promise<void> {
    // Dados já validados pelo middleware
    const validatedData: CreateUserInput = req.body;

    // Chama o service com os dados validados
    const newUser = await this.userService.createUser(validatedData);
    res.status(201).json(newUser);
  }

  async updateUser(req: Request, res: Response): Promise<void> {
    const id = parseInt(req.params.id, 10);

    // Dados já validados pelo middleware
    const validatedData: UpdateUserInput = req.body;

    // Chama o service com os dados validados
    const updatedUser = await this.userService.updateUser(id, validatedData);
    res.json(updatedUser);
  }

  async deleteUser(req: Request, res: Response): Promise<void> {
    const id = parseInt(req.params.id, 10);
    await this.userService.deleteUser(id);
    res.status(204).send();
  }
}