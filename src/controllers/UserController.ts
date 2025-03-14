import { Request, Response } from "express";
import { UserService } from "../services/UserService";

export class UserController {
  constructor(private userService: UserService) {}

  async getAllUsers(req: Request, res: Response): Promise<void> {
    try {
      const users = await this.userService.getAllUsers();
      res.json(users);
    } catch (error) {
      if (error instanceof Error) {
        res.status(500).json({ message: error.message });
      } else {
        res.status(500).json({ message: "Erro desconhecido ao buscar usuários." });
      }
    }
  }

  async getUserById(req: Request, res: Response): Promise<void> {
    try {
      const id = parseInt(req.params.id, 10);
      const user = await this.userService.getUserById(id);
      res.json(user);
    } catch (error) {
      if (error instanceof Error) {
        if (error.message === "Usuário não encontrado.") {
          res.status(404).json({ message: error.message });
        } else {
          res.status(500).json({ message: error.message });
        }
      } else {
        res.status(500).json({ message: "Erro desconhecido ao buscar usuário." });
      }
    }
  }

  async createUser(req: Request, res: Response): Promise<void> {
    try {
      const userData = req.body;
      const newUser = await this.userService.createUser(userData);
      res.status(201).json(newUser);
    } catch (error) {
      if (error instanceof Error) {
        if (error.message === "Já existe um usuário com este e-mail.") {
          res.status(400).json({ message: error.message });
        } else {
          res.status(500).json({ message: error.message });
        }
      } else {
        res.status(500).json({ message: "Erro desconhecido ao criar usuário." });
      }
    }
  }

  async updateUser(req: Request, res: Response): Promise<void> {
    try {
      const id = parseInt(req.params.id, 10);
      const userData = req.body;
      const updatedUser = await this.userService.updateUser(id, userData);
      res.json(updatedUser);
    } catch (error) {
      if (error instanceof Error) {
        if (error.message === "Usuário não encontrado.") {
          res.status(404).json({ message: error.message });
        } else if (error.message === "Já existe um usuário com este e-mail.") {
          res.status(400).json({ message: error.message });
        } else {
          res.status(500).json({ message: error.message });
        }
      } else {
        res.status(500).json({ message: "Erro desconhecido ao atualizar usuário." });
      }
    }
  }

  async deleteUser(req: Request, res: Response): Promise<void> {
    try {
      const id = parseInt(req.params.id, 10);
      await this.userService.deleteUser(id);
      res.status(204).send();
    } catch (error) {
      if (error instanceof Error) {
        if (error.message === "Usuário não encontrado.") {
          res.status(404).json({ message: error.message });
        } else {
          res.status(500).json({ message: error.message });
        }
      } else {
        res.status(500).json({ message: "Erro desconhecido ao deletar usuário." });
      }
    }
  }
}