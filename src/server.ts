import express from "express";
import * as dotenv from "dotenv";
import helmetMiddleware from "./middlewares/helmetMiddleware";
import corsMiddleware from "./middlewares/corsMiddleware";
import { errorHandler } from './middlewares/errorHandler';
import userRoutes from "./routes/userRoutes";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

const allowedOrigins = [
  'https://meufrontend.com', // Frontend em produção
  'http://localhost:3000',   // Desenvolvimento
];

app.use(express.json());

// Middlewares Segurança
app.use(helmetMiddleware);
app.use(corsMiddleware);

// Rotas
app.use("/api", userRoutes);

// Middleware para rotas inexistentes
app.use((req, res, next) => {
  res.status(404).json({ success: false, message: "Rota não encontrada." });
});

// Middleware de tratamento de erros
app.use(errorHandler as express.ErrorRequestHandler);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});