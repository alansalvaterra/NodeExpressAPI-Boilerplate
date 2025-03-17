import { Request, Response, NextFunction } from 'express';

export function asyncWrapper(fn: (req: Request, res: Response, next: NextFunction) => Promise<void>) {
  return async (req: Request, res: Response, next: NextFunction) => {
    try {
      await fn(req, res, next);
    } catch (error) {
      next(error); // Passa o erro para o errorHandler
    }
  };
}