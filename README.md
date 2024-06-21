# Greenfy-challenge - API de Gerenciamento de Tarefas

## Tecnologias
- NestJS
- TypeORM
- PostgreSQL
- Docker
- Docker Compose
- Passport
- Swagger

## Rodando a Aplicação em Ambiente de Desenvolvimento

1. Pré-requisitos:
- Instale o Node.js
- Instale o Docker
- Instale o Docker Compose

2. Crie um aquivo .env na raiz do projeto com a seguinte estrutura
```
PORT=3000
DATABASE_HOST=localhost
DATABASE_PORT=5432
DATABASE_USERNAME=postgres
DATABASE_PASSWORD=postgres
DATABASE_NAME=postgres
SECURITY_JWT="dfgdfgdfgfdg3434233435543fghd45@fgyhfgyhfghghf"
SECURITY_JWT_REFRESH="fghfghfgh54645645456tweqr34435465@fgyhfgyhfghghf"
```
3. Instale as dependências
```
npm install
```
4. Subindo o banco de dados
```
docker-compose -f docker-compose.dev.yml up
ou 
docker-compose -f docker-compose.dev.yml up -d
```
4. Executando a aplicação
```
npm run start:dev
```
5. Acesse http://localhost:3000/docs para visualizar a documentação

## Rodando a Aplicação em Ambiente de Produção

## Tecnologias
1. Crie um aquivo .env na raiz do projeto com a seguinte estrutura

```
PORT=3000
DATABASE_HOST=postgres
DATABASE_PORT=5432
DATABASE_USERNAME=postgres
DATABASE_PASSWORD=postgres
DATABASE_NAME=postgres
SECURITY_JWT="dfgdfgdfgfdg3434233435543fghd45@fgyhfgyhfghghf"
SECURITY_JWT_REFRESH="fghfghfgh54645645456tweqr34435465@fgyhfgyhfghghf"
```

2. Executando a aplicação
```
docker-compose -f docker-compose.prod.yml up
ou
docker-compose -f docker-compose.dev.yml up -d
```

3. Acesse http://localhost:3000/docs para visualizar a documentação