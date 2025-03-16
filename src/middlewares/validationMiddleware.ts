import { Request, Response, NextFunction } from 'express';
import { ZodSchema, ZodError } from 'zod';
import { AppError } from './errorHandler';

export function validate(schema: ZodSchema) {
  return (req: Request, res: Response, next: NextFunction) => {
    try {
      // Valida os dados de entrada
      schema.parse(req.body);
      next(); // Se a validação for bem-sucedida, passa para o próximo middleware
    } catch (error) {
      // Se houver um erro de validação, lança um AppError
      if (error instanceof ZodError) {
        throw new AppError('Erro de validação', 400, error);
      }
      next(error); // Passa outros erros para o errorHandler
    }
  };
}