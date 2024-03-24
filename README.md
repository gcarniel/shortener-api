# SHORTENER-API

## 🎯 Funcionalidades

- [x] Criar usuário.
- [x] Autenticar usuário.
- [x] Criar URLs encurtado.
- [x] Contabilizar visitas em URLs encurtados.
- [x] Listar URLs de um usuário autenticado.
- [x] Editar URLs de um usuário autenticado.
- [x] Excluir URLs de um usuário autenticado.
- [x] Exibir métricas de URLs de um usuário autenticado.

## 💻 Pré-requisitos

A versão do NodeJS escolhida para o projeto é a 20.11

No projeto tem o arquivo .nvmrc que indica a versão do node e com o comando `nvm use` 
nos ajuda a baixar a versão do node e a define para rodar o projeto.

Configurar o arquivo `.env`. Dentro do projeto existe um de exemplo `.env.example`.


## 🚀 Rodando o projeto

1. `nvm use`
2. `npm install`
3. `docker compose up -d`
4. `npm run dev`
5. `npm run test` Para rodar os testes
6. `npm run test:watch` Para rodar os teste em modo watch

## 🛠️ Ferramentas

1. `zod` Validação de dados
2. `prisma` ORM para gerenciar banco de dados
3. `fastify` Framework web
4. `typescript`
5. `tsup` Para gerar build do projeto. TS > JS

## 🪧 Rotas

Todas as rotas estão abaixo, porém no projeto tem um arquivo `client.http` com as 
rotas mapeadas e prontas para fazer testes locais, assim como é possível fazer no `postman` ou `insomnia`.

### 🧛🏻‍♂️ Usuários
`POST` `/api/users` - Criar um usuário.

`POST` `/api/auth` - Autenticação de usuário

### 📬 Links
`GET`    `/:code`  - Busca um link encurtado e redireciona o usuário.

`POST`   `/api/links`  - Cria um link encurtado na aplicação.

`GET`    `/api/links`  - Busca paginada de links do usuário autenticado.

`DELETE` `/api/links/:id`  - Deleta um link do usuário autenticado.

`PATCH`  `/api/links/:id`  - Altera um link do usuário autenticado.

`GET`    `/api/links/metris/:code`  - Busca as métricas de uma URL encurtada.

## 📝 Licença
Esse projeto está sob licença MIT.
