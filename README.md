# Criar o projeto

npx create-next-app@14.2.16

# Criarmos a modelagem de dados

# Instalar o Prisma

npm install prisma@5.21.1 typescript ts-node @types/node --save-dev
npx prisma init --datasource-provider postgresql
npx prisma migrate dev --name init

Dentro do arquivo prisma.shcema contem a modelagem de dados que ao rodar o npx prisma migrate dev --name init irá criar as tabelas no banco de dados.
