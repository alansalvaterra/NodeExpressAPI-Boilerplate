import { PrismaClient, Prisma } from "@prisma/client";
import { AppError } from "../middlewares/errorHandler";

const prisma = new PrismaClient();

export class UserService {
  async getAllUsers() {
    return await prisma.user.findMany({
      select: { id: true, firstName: true, lastName: true, email: true }, // Exclui o password
    });
  }

  async getUserById(id: number) {
    const user = await prisma.user.findUnique({
      where: { id },
      select: { id: true, firstName: true, lastName: true, email: true }, // Exclui o password
    });
    if (!user) {
      throw new AppError("Usuário não encontrado.", 404);
    }
    return user;
  }

  async createUser(userData: { firstName: string; lastName: string; email: string; password: string }) {
    try {
      const newUser = await prisma.user.create({
        data: userData,
        select: { id: true, firstName: true, lastName: true, email: true }, // Exclui o password
      });
      return newUser;
    } catch (error) {
      if (error instanceof Prisma.PrismaClientKnownRequestError && error.code === "P2002") {
        throw new AppError("Já existe um usuário com este e-mail.", 400);
      }
      throw new AppError("Erro ao criar usuário.", 500);
    }
  }

  async updateUser(id: number, userData: { firstName?: string; lastName?: string; email?: string; password?: string }) {
    try {
      const updatedUser = await prisma.user.update({
        where: { id },
        data: userData,
        select: { id: true, firstName: true, lastName: true, email: true }, // Exclui o password
      });
      return updatedUser;
    } catch (error) {
      if (error instanceof Prisma.PrismaClientKnownRequestError && error.code === "P2002") {
        throw new AppError("Já existe um usuário com este e-mail.", 400);
      }
      if (error instanceof Prisma.PrismaClientKnownRequestError && error.code === "P2025") {
        throw new AppError("Usuário não encontrado.", 404);
      }
      throw new AppError("Erro ao atualizar usuário.", 500);
    }
  }

  async deleteUser(id: number) {
    try {
      await prisma.user.delete({ where: { id } });
    } catch (error) {
      if (error instanceof Prisma.PrismaClientKnownRequestError && error.code === "P2025") {
        throw new AppError("Usuário não encontrado.", 404);
      }
      throw new AppError("Erro ao deletar usuário.", 500);
    }
  }
}