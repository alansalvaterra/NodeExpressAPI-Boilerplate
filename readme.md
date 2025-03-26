# NodeExpressAPI-Boilerplate 🚀

Boilerplate moderno para criação de APIs RESTful usando **Node.js**, **Express**, **TypeScript**, **Prisma** e **PostgreSQL**. Inclui suporte a **Docker** para facilitar o desenvolvimento e deploy.

## 🧱 Tecnologias Utilizadas

- [Node.js](https://nodejs.org/)
- [Express](https://expressjs.com/)
- [TypeScript](https://www.typescriptlang.org/)
- [Prisma ORM](https://www.prisma.io/)
- [PostgreSQL](https://www.postgresql.org/)
- [Docker](https://www.docker.com/)

## 📁 Estrutura de Pastas

```bash
.
├── src/
│   ├── controllers/      # Controladores das rotas
│   ├── middlewares/      # Middlewares (ex: tratamento de erros)
│   ├── prisma/           # Migrations e schema do Prisma
│   ├── routes/           # Definição das rotas
│   ├── schemas/          # Validação de dados com Zod
│   ├── services/         # Lógica de negócios
│   ├── utils/            # Utilitários
│   └── server.ts         # Arquivo principal da aplicação
├── .env.template         # Variáveis de ambiente
├── Dockerfile            # Dockerfile da aplicação
├── docker-compose.yml    # Arquivo do Docker Compose
└── entrypoint.sh         # Inicializar o container Docker
```

## ⚙️ Instalação

### 1. Clone o projeto

```bash
git clone https://github.com/alansalvaterra/NodeExpressAPI-Boilerplate.git
cd NodeExpressAPI-Boilerplate
```

### 2. Instale as dependências

```bash
npm install
```

### 3. Configure o `.env`

Crie um arquivo `.env` na raiz com o conteúdo:

```env
DATABASE_URL=postgresql://user:password@localhost:5432/mydb
PORT=3000
```

### 4. Configure o banco de dados com Prisma

```bash
npx prisma migrate dev --name init
```

### 5. Inicie o servidor

```bash
npm run dev
```

## 🐳 Usando com Docker

Certifique-se de ter o Docker e Docker Compose instalados. Depois, execute:

```bash
docker-compose up --build
```

A aplicação estará disponível em `http://localhost:3000`

## 📌 Endpoints Padrão

As rotas da API estão organizadas dentro de src/routes/. O exemplo abaixo corresponde ao módulo de usuários, já implementado no projeto:

- GET	    `/users`	    Lista todos os usuários
- GET	    `/users/:id`	Busca um usuário pelo ID
- POST	    `/users`	    Cria um novo usuário
- PUT	    `/users/:id`	Atualiza um usuário existente
- DELETE	`/users/:id`	Remove um usuário do sistema

## 🧑‍💻 Autor

Feito com 💙 por [Alan Salvaterra](https://github.com/alansalvaterra)

---

> Sinta-se à vontade para abrir *issues* ou enviar *pull requests*!
