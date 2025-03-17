# Node.js + Express + TypeScript + Prisma + PostgreSQL + Docker [Boilerplate]

Este é um boilerplate para projetos backend usando # Node.js + Express + TypeScript + Prisma + PostgreSQL + Docker. Ele foi projetado para ser modular, escalável e seguir boas práticas de desenvolvimento.

# 🚀 Começando

### Pré-requisitos

- Node.js (v18 ou superior)
- PostgreSQL
- Docker (opcional, para rodar o PostgreSQL em container)

## Instalação

1. Clone o repositório:
   ```bash
   git clone https://github.com/alansalvaterra/NodeExpressAPI-Boilerplate.git
2. Instale as dependências:
   ```bash
   cd NodeExpressAPI-Boilerplate
   npm install
3. Configure o banco de dados conforme instruções no .env.template

4. Inicie o servidor:    
   ```bash
   docker-compose up --build 

5. (Erro entypoint.sh) Caso retorne o erro:
   
   "app-1  | exec ./entrypoint.sh: no such file or directory"

   Abra o arquivo entrypoint.sh com o Visual Studio Code ou NotePad++ e altere o formato de fim de linha de "CRLF" e selecione "LF" e salve.
6. (Opcional - Rodar localmente):   
   ```bash
   npm run dev:migrate  

## Estrutura do Projeto


      src/
         ├── controllers/        # Controladores para lidar com as requisições
         ├── middlewares/        # Middlewares personalizados
         ├── prisma/             # Configurações e migrations do Prisma
         ├── routes/             # Definição das rotas
         ├── schemas/            # Esquemas de validação com Zod
         ├── services/           # Lógica de negócio
         ├── utils/              # Utilitários (helpers, funções comuns)
         ├── app.ts              # Configuração do Express
         ├── server.ts           # Inicialização do servidor
      .dockerignore
      .env                       #Template para variáveis de ambiente
      .gitignore
      docker-compose.yml
      Dockerfile
      entrypoint.sh
      package.json
      README.md
      tsconfig.json


## Rotas Disponíveis (CRUD básico)
GET /api/users: Retorna todos os usuários.

GET /api/users/:id: Retorna um usuário pelo ID.

POST /api/users: Cria um novo usuário.

PUT /api/users/:id: Atualiza um usuário pelo ID.

DELETE /api/users/:id: Deleta um usuário pelo ID.


## Segurança
Helmet: Configura cabeçalhos de segurança HTTP.

CORS: Restringe o acesso à API a origens específicas.

Zod: Validação de dados de entrada.

