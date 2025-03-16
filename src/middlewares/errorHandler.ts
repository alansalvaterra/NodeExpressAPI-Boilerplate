import { Request, Response, NextFunction } from 'express';
import { ZodError } from 'zod';
import { Prisma } from '@prisma/client';
import { formatZodError } from '../utils/formatError';

export class AppError extends Error {
  constructor(
    public message: string,
    public statusCode: number = 500,
    public details?: any
  ) {
    super(message);
  }
}

export function errorHandler(
  error: Error | ZodError | Prisma.PrismaClientKnownRequestError | AppError,
  req: Request,
  res: Response,
  next: NextFunction
): Response | undefined {
  // Erro de validação do Zod (encapsulado em AppError)
  if (error instanceof AppError && error.details instanceof ZodError) {
    return res.status(error.statusCode).json({
      message: error.message,
      errors: formatZodError(error.details), // Formata os erros do Zod
    });
  }

  // Erros do Prisma
  if (error instanceof Prisma.PrismaClientKnownRequestError) {
    if (error.code === 'P2002') {
      return res.status(400).json({ message: 'Já existe um usuário com este e-mail.' });
    }
    if (error.code === 'P2025') {
      return res.status(404).json({ message: 'Usuário não encontrado.' });
    }
    return res.status(500).json({ message: 'Erro no banco de dados.' });
  }

  // Erros personalizados (AppError)
  if (error instanceof AppError) {
    return res.status(error.statusCode).json({ message: error.message });
  }

  // Erro genérico
  res.status(500).json({ message: 'Erro interno no servidor.' });
}