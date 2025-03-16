import express from "express";
import * as dotenv from "dotenv";
import helmetMiddleware from "./middlewares/helmetMiddleware";
import corsMiddleware from "./middlewares/corsMiddleware";
import { errorHandler } from './middlewares/errorHandler';
import { validate } from './middlewares/validationMiddleware';
import { createUserSchema, updateUserSchema } from './schemas/userSchema';
import userRoutes from "./routes/userRoutes";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

const allowedOrigins = [
  'https://meufrontend.com', // Frontend em produção
  'http://localhost:3000',   // Desenvolvimento
];

// Middlewares
app.use(express.json());
app.use(helmetMiddleware);
app.use(corsMiddleware);

// Rotas
app.use("/api", userRoutes);

// Middleware de tratamento de erros (DEVE SER O ÚLTIMO MIDDLEWARE)
app.use(errorHandler as express.ErrorRequestHandler);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});