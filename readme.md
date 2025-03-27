# nodejs-express-prisma-typescript-starter 🚀

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
git clone https://github.com/alansalvaterra/nodejs-express-prisma-typescript-starter.git
cd nodejs-express-prisma-typescript-starter

```

### 2. Instale as dependências

```bash
npm install
```

### 3. Configure o ambiente local

Crie um arquivo .env.local na raiz do projeto com base no .env.template:

```env
DATABASE_URL=postgresql://user:password@localhost:5432/mydb
PORT=3000
```

💡 Certifique-se de que seu banco de dados PostgreSQL está rodando e que o banco mydb exista.

### 4. Configure o Prisma

```bash
npx prisma generate --schema=./src/prisma/schema.prisma
npx prisma migrate dev --schema=./src/prisma/schema.prisma
```

### 5. Inicie o servidor

```bash
npm run dev
```

## 🐳 Usando com Docker

1. Pré-requisitos
   
- Docker

- Docker Compose


2. Crie um arquivo .env.docker na raiz do projeto com base no .env.template:

```
DATABASE_URL=postgresql://user:password@db:5432/mydb
PORT=3000
```

(As credenciais devem bater com as do docker-compose.yml)


3. Em seguida, rode o projeto com:

```bash
docker-compose up --build
```

## ⚠️ Importante para usuários Windows

Se estiver no Windows, o arquivo entrypoint.sh pode ter o formato de fim de linha incorreto (CRLF), o que impede sua execução no container Linux.

✅ Solução:
Abra o arquivo entrypoint.sh no Notepad++ ou VS Code e:

No Notepad++: menu Editar → Conversão de Fim de Linha → Converter para UNIX (LF)

No VS Code: clique em CRLF no canto inferior direito e altere para LF

Salve o arquivo, e então o comando abaixo funcionará corretamente:


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
