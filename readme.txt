Conclusão
Seguranca:
(middlewares como helmet, cors, autenticação JWT).

Validação de Dados:
Use bibliotecas como zod ou joi para validar os dados de entrada nas rotas.

Validação de dados:
Valide os dados de entrada antes de interagir com o banco de dados.
Use bibliotecas como zod ou joi para validação.

Melhorar o tratamento de erros para evitar repetição de código.

Configurações de Ambiente:
usar uma biblioteca como dotenv-flow para gerenciar diferentes ambientes (desenvolvimento, teste, produção).


QUESTAO 1
Estou desenvolvendo um projeto backend com a stack nodejs, express, prisma, postgresql e docker.
O objetivo desse projeto e servir de base para projetos futuros de forma que eu não precise partir do zero.
As premissas são um backend modular, organizado, escalável, profissional e que siga as boas praticas de programação.
O projeto já está rodando e eu vou compartilhar, em partes, todo o código para você avaliar e me dar feedback, sugestão de melhorias e pontos de atenção.



QUESTAO 2
Estrutura de pastas

BASE-BACKEND
	src
		config - DIRETORIO VAZIO
		controllers
		UserController.ts
		middlewares - DIRETORIO VAZIO
		prisma
			migrations
			schema.prisma
		routes
		userRouters.ts
		services
		UserServices.ts
		utils - DIRETORIO VAZIO
		server.ts
	.dockerignore
	.env
	.env.docker
	.env.local
	.gitignore
	docker-compose.yml
	Dockerfile
	entrypoint.sh
	package.json
	tsconfig.json
	
vou começar a compartilhar o codigo do diretorio raiz. Alem do que requisitado anteriormente, tambem me explique para que serve cada arquivo e as partes de codigo que forem relevantes e sinalize as dispensaveis.
	
.dockerignore
# .dockerignor
	.env
	.env.local
	node_modules
	dist

.env
# .env (Template)
	DATABASE_URL="postgresql://user:password@HOST:PORT/DATABASE?schema=public"
	PORT=3000
	JWT_SECRET="your_jwt_secret_here"

.env.docker
	#DESENVOLVIMENTO CONTEINER
	DATABASE_URL="postgresql://user:password@db:5432/mydb?schema=public"
	PORT=3000
	JWT_SECRET="your_jwt_secret_here"

	# DB_HOST=db
	# DB_PORT=5432
	# DB_USERNAME=user
	# DB_PASSWORD=senha123
	# DB_DATABASE=mydb
	# PORT=3000

.env.local
	# .env.local
	DATABASE_URL="postgresql://user:password@localhost:5432/mydb?schema=public"
	PORT=3000
	JWT_SECRET="your_jwt_secret_here"

	# DB_HOST=db
	# DB_PORT=5432
	# DB_USERNAME=user
	# DB_PASSWORD=senha123
	# DB_DATABASE=mydb
	# PORT=3000

.gitignore
	node_modules
	# Keep environment variables out of version control
	.env.local
	.env.docker

docker-compose.yml
services:
  db:
    image: postgres:13
    environment:
      POSTGRES_USER: user
      POSTGRES_PASSWORD: password
      POSTGRES_DB: mydb
    ports:
      - "5432:5432"
    volumes:
      - postgres_data:/var/lib/postgresql/data

  app:
    build: .
    ports:
      - "3000:3000"
    env_file:
      - .env.docker # Usa o arquivo .env.docker
    depends_on:
      - db

volumes:
  postgres_data:
  
Dockerfile
# Usa uma imagem base do Node.js
FROM node:18-slim

# Cria o diretório da aplicação
WORKDIR /usr/src/app

# Instalar OpenSSL
RUN apt-get update -y && apt-get install -y openssl

# Copia os arquivos de dependência
COPY package*.json ./

# Instala as dependências
RUN npm install

# Copia o diretório prisma primeiro
COPY src/prisma ./src/prisma/

# Gerar o cliente Prisma
RUN npx prisma generate --schema=./src/prisma/schema.prisma

# Copia o arquivo .env.docker
COPY .env.docker ./.env

# Copia o script de entrypoint
COPY entrypoint.sh ./entrypoint.sh

# Define o script como executável
RUN chmod +x ./entrypoint.sh

# Copia o restante do código
COPY . .

# Compila o TypeScript
RUN npm run build

# Expõe a porta 3000
EXPOSE 3000

# Define o entrypoint
ENTRYPOINT ["./entrypoint.sh"]

# Comando para rodar a aplicação
CMD ["node", "dist/server.js"]


entrypoint.sh
#!/bin/sh

# Aplica as migrações com o caminho correto para o schema
npx prisma migrate deploy --schema=./src/prisma/schema.prisma

# Inicia a aplicação
exec node dist/server.js

package.json
{
  "name": "backend-api-node-ts-prisma-postgresql-docker",
  "version": "1.0.0",
  "main": "index.js",
  "scripts": {
    "start": "node dist/server.js",
    "dev": "dotenv -e .env.local -- ts-node src/server.ts",
    "build": "tsc",
    "prisma:generate": "dotenv -e .env.local -- prisma generate",
    "prisma:migrate": "dotenv -e .env.local -- prisma migrate dev",
    "prisma:studio": "dotenv -e .env.local -- prisma studio"
  },
  "keywords": [],
  "author": "",
  "license": "ISC",
  "description": "",
  "dependencies": {
    "@prisma/client": "^6.5.0",
    "dotenv": "^16.4.7",
    "express": "^4.21.2"
  },
  "devDependencies": {
    "@types/express": "^5.0.0",
    "@types/node": "^22.13.10",
    "dotenv-cli": "^8.0.0",
    "prisma": "^6.5.0",
    "ts-node": "^10.9.2",
    "typescript": "^5.8.2"
  }
}


tsconfig.json
{
    "compilerOptions": {
      "target": "ES6",
      "module": "commonjs",
      "strict": true,
      "esModuleInterop": true,
      "outDir": "./dist",
      "rootDir": "./src",
      "emitDecoratorMetadata": true,
      "experimentalDecorators": true
    },
    "include": ["src/**/*"],
    "exclude": ["node_modules"]
  }



3.0

Agora server, controler, services, routes

server.ts
import express from "express";
import userRoutes from "./routes/userRoutes";
import * as dotenv from "dotenv";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

app.use("/api", userRoutes);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

UserService.ts
import { PrismaClient, Prisma } from "@prisma/client";

const prisma = new PrismaClient();

export class UserService {
  async getAllUsers() {
    try {
      return await prisma.user.findMany();
    } catch (error) {
      throw new Error("Erro ao buscar usuários.");
    }
  }

  async getUserById(id: number) {
    try {
      const user = await prisma.user.findUnique({ where: { id } });
      if (!user) {
        throw new Error("Usuário não encontrado.");
      }
      return user;
    } catch (error) {
      if (error instanceof Prisma.PrismaClientKnownRequestError) {
        throw new Error(`Erro ao buscar usuário: ${error.message}`);
      }
      throw error;
    }
  }

  async createUser(userData: { firstName: string; lastName: string; email: string; password: string }) {
    try {
      return await prisma.user.create({ data: userData });
    } catch (error) {
      if (error instanceof Prisma.PrismaClientKnownRequestError) {
        if (error.code === "P2002") {
          throw new Error("Já existe um usuário com este e-mail.");
        }
      }
      throw new Error("Erro ao criar usuário.");
    }
  }

  async updateUser(id: number, userData: { firstName?: string; lastName?: string; email?: string; password?: string }) {
    try {
      const updatedUser = await prisma.user.update({ where: { id }, data: userData });
      if (!updatedUser) {
        throw new Error("Usuário não encontrado.");
      }
      return updatedUser;
    } catch (error) {
      if (error instanceof Prisma.PrismaClientKnownRequestError) {
        if (error.code === "P2002") {
          throw new Error("Já existe um usuário com este e-mail.");
        }
      }
      throw new Error("Erro ao atualizar usuário.");
    }
  }

  async deleteUser(id: number) {
    try {
      const deletedUser = await prisma.user.delete({ where: { id } });
      if (!deletedUser) {
        throw new Error("Usuário não encontrado.");
      }
      return deletedUser;
    } catch (error) {
      if (error instanceof Prisma.PrismaClientKnownRequestError) {
        if (error.code === "P2025") {
          throw new Error("Usuário não encontrado.");
        }
      }
      throw new Error("Erro ao deletar usuário.");
    }
  }
}

userRoutes.ts
import { Router } from "express";
import { UserController } from "../controllers/UserController";
import { UserService } from "../services/UserService";

const router = Router();
const userService = new UserService();
const userController = new UserController(userService);

router.get("/users", (req, res) => userController.getAllUsers(req, res));
router.get("/users/:id", (req, res) => userController.getUserById(req, res));
router.post("/users", (req, res) => userController.createUser(req, res));
router.put("/users/:id", (req, res) => userController.updateUser(req, res));
router.delete("/users/:id", (req, res) => userController.deleteUser(req, res));

export default router;

schema.prisma
// This is your Prisma schema file,
// learn more about it in the docs: https://pris.ly/d/prisma-schema

// Looking for ways to speed up your queries, or scale easily with your serverless or edge functions?
// Try Prisma Accelerate: https://pris.ly/cli/accelerate-init

datasource db {
  provider = "postgresql"
  url      = env("DATABASE_URL")
}

generator client {
  provider      = "prisma-client-js"
  binaryTargets = ["native", "debian-openssl-3.0.x"]
}

model User {
  id        Int      @id @default(autoincrement())
  firstName String
  lastName  String
  email     String   @unique
  password  String
  createdAt DateTime @default(now())
  updatedAt DateTime @updatedAt
}


UserController.ts
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
