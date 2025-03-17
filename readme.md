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
   cd NodeExpressAPI-Boilerplate
2. Instale as dependências:
   ```bash
   npm install
3. Configure o banco de dados conforme instruções no .env.

4. Inicie o servidor:
   1. Local:    
        ```bash
        npm run dev:migrate  

   2. Docker:   
         ```bash
        docker-compose up --build

## Estrutura do Projeto


    src/
    ├── controllers/        # Controladores para lidar com as requisições
    ├── services/           # Lógica de negócio
    ├── repositories/       # Interações com o banco de dados
    ├── middlewares/        # Middlewares personalizados
    ├── routes/             # Definição das rotas
    ├── schemas/            # Esquemas de validação com Zod
    ├── utils/              # Utilitários (helpers, funções comuns)
    ├── app.ts              # Configuração do Express
    ├── server.ts           # Inicialização do servidor

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

