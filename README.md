# LINKS UTEIS

Aula 1: Boas Vindas e Apresentação do Evento | Full Stack Week
https://www.youtube.com/live/WtVI5mLHjtE
Aula 2: Setup do Projeto & Autenticação | Full Stack Week
https://www.youtube.com/watch?v=bSR-iWChMhs
Aula 3: Gestão de Transações | Full Stack Week
https://www.youtube.com/watch?v=AjwjN3xFDr8
Aula 4: Mentoria Tira Dúvidas | Full Stack Week
https://www.youtube.com/live/rgkP8fZHjrU
Aula 5: Dashboard & Gráficos | Full Stack Week
https://www.youtube.com/watch?v=zEcehthgR5s
Aula 6 - Integração com ChatGPT & Planos de Assinatura
https://www.youtube.com/watch?v=QpykcA92ffs
Aula 7: Mentoria Tira Dúvidas | Full Stack Week
https://www.youtube.com/live/OfzsmvuCx3Y
Aula 8: Deploy, Revisão do Projeto & Sorteio de Notebook Gamer | Full Stack Week
https://www.youtube.com/watch?v=-qSqxzYQyUs

Modelagem de dados:
https://www.drawdb.app/
https://drawsql.app/

# CRIAR PROJETO

`npx create-next-app@14.2.16`

# CRIAR MODELAGEM DE DADOS

Usar o eraser para criar o diagrama de entidade e relacionamento.
A modelagem está em: https://app.eraser.io/workspace/C3HphDLMJA9jzuCzqR6L

# BANCO DE DADOS

O banco de dados utilizado é o PostgreSQL.
Ele está hospedado no NeonDB em: https://console.neon.tech/app/projects/gentle-paper-35030639?database=neondb

# INSTALAR O PRISMA

Usar o Prisma como ORM.

`npm install prisma@5.21.1 typescript ts-node @types/node --save-dev`
`npx prisma init --datasource-provider postgresql`
`npx prisma migrate dev --name init`

Dentro do arquivo prisma.shcema contem a modelagem de dados que ao rodar o npx prisma migrate dev --name init irá criar as tabelas no banco de dados.

Para formatar o schema use o comando: `npx prisma format`

# Instalar o Prettier e sua extensão do VSCode

O Prettier é um linter que formata o código de acordo com as regras de formatação do projeto. Irá ajudar a manter o código organizado e fácil de entender. No tailwind irá ajudar a manter as classes organizadas.

`npm install -D prettier prettier-plugin-tailwindcss`

Criar o arquivo de configuração .prittierrc e colocar o codigo abaixo:
{
"plugins": [
"prettier-plugin-tailwindcss"
]
}

No VSCode, em setting, buscar por Default Formatter e selecionar o Prettier - Code formatter. Depois buscar por format on save e marcar a opção para formatar o arquivo/codigo ao salvar.

# ESLint

Usar o ESLint para verificar se o código está correto e não há erros de sintaxe.
`npm install eslint --save-dev`
`npx eslint --init`

Instalar também o eslint plugin no VSCode.

# Shadcn/ui

Usar o shadcn como padrão de estilo do projeto.

`npx shadcn@2.1.3 init`

Configurar o arquivo components.json para apontar para a pasta components.
Para este projeto configurarmos a pasta components, libs, hooks, tudo dentro da pasta app. Por isso o arquiov components.json ficará assim:

"aliases": {
"components": "@/app/\_components",
"utils": "@/app/\_lib/utils",
"ui": "@/app/\_components/ui",
"lib": "@/app/\_lib",
"hooks": "@/app/\_hooks"
}

Instalar os componentes do shadcn.

`npx shadcn@2.1.3 add button`

# Clerk - Autenticação

Instalar o clerk para autenticação.
`npm install @clerk/nextjs@5.7.5`

Salvar a chave no arquivo .env.

Criar o arquivo middleware.ts na raiz do projeto e configurar o arquivo com as informações do projeto.

Fazer a configuração acrescentando o <ClerkProvider> no arquivo layout.tsx que envolve a pagina principal.
return (

<html lang="en">
<body
className={`${geistSans.variable} ${geistMono.variable} dark antialiased`} >
<ClerkProvider>{children}</ClerkProvider>
</body>
</html>
);

Acrescentar no inicio da pagina Pages.tsx a validação de autenticação:
const { userId } = await auth();
if (userId) {
redirect("/");
}

Onde se o usuário estiver autencicado será redirecionado para a home.

## Configurar o Thema

Para o tema do Clerk, instalar o pacote `npm install @clerk/themes@2.1.37`.

# Sonner - Toast

Instalar o sonner para criar toast.
`npx shadcn@2.1.3 add sonner`

Acrescentar o <Toaster /> no layout.tsx principal.

# Git Hooks

Este hook do git irá verificar se o código está de acordo com as regras de commit. Isso se aplicará para qualquer desenvolvedor que faça o commit, mantendo um padrão de qualidade no código.

Para configurar os hooks do git, instalar o pacote `npm install husky@9.1.6`.

https://www.npmjs.com/package/husky

Instalar o husky para criar hooks.
`npm install -D husky@9.1.6`

Instalar também o lint staged, https://www.npmjs.com/package/lint-staged/v/12.3.2
`npm i -D lint-staged@12.3.2`

Após instalar estas duas dependencias, rodar o comando:
`npx husky init`

Com isso será criada uma pasta .husky com um arquivo pre-commit.
Nele iremos configurar colocando o comando conforme abaixo:

npx lint-staged

Criar um arquivo na raiz do projeto com o nome .lintstagedrc.json e colocar o conteudo abaixo:
{
"\*.ts?(x)": [
"eslint --fix",
"prettier --write"
]
}

Isso fará com que o eslint e o prettier sejam executados antes de fazer o commit, garantindo que o código esteja correto.
Se houver erro, o commit não será feito.

## Git Hooks Convention Message Validation

Documentação em : https://www.npmjs.com/package/git-commit-msg-linter

Para validar se a mensagem do commit está dentro dos padrões da convensão do git,
instalar o pacote `npm i git-commit-msg-linter@5.0.8`

Para configurar o husky 5 com o commit msg, instalar o pacote abaixo:
`npx husky add .husky/commit-msg ".git/hooks/commit-msg \$1"`

Criar um arquivo "commit-msg" dentro da pasta .husky e colocar o codigo abaixo:
.git/hooks/commit-msg $1

# Fontes

O next integra com o google fonts.
Para isso é só importar através do caminho: `import {Mulish} from "next/font/google";`, onde Mulish é o nome da fonte do google.
Para aplicar no projeto, basta usar o css: `font-family: ${Mulish.style.cssFontFamily}` ou criar uma constante como abaixo:

const mulish = Mulish({
subsets: ["latin-ext"],
});

E aplicando no body do projeto:

<body className={`${mulish.className} dark antialiased`}>

# Docker

Para usar o docker, é só criar um arquivo Dockerfile e configurar o projeto para rodar dentro do container.
Criar um arquivo docker-compose.yml com o conteúdo abaixo:
services:
postgres:
image: postgres:latest
container_name: finance-ai-database # usando o mesmo nome do container de outro projeto para economizar espaço
environment:
POSTGRES_USER: postgres
POSTGRES_PASSWORD: password
POSTGRES_DB: finance-ai
ports: - "5432:5432"
volumes: - ./.postgres-data:/var/lib/postgresql/data

volumes:
.postgres-data:

Para criar as tabelas no banco de dados, rodar o comando do prisma:
`npx prisma migrate dev`

# Criar Conexão com o Banco de Dados Prisma

Para criar uma conexão no next com o Prisma, iremos criar dentro da pasta \_lib um arquivo chamado prisma.ts com o conteúdo abaixo:

import { PrismaClient } from "@prisma/client";

declare global {
// eslint-disable-next-line no-var
var cachedPrisma: PrismaClient;
}

let prisma: PrismaClient;
if (process.env.NODE_ENV === "production") {
prisma = new PrismaClient();
} else {
if (!global.cachedPrisma) {
global.cachedPrisma = new PrismaClient();
}
prisma = global.cachedPrisma;
}
export const db = prisma;

Este arquivo irá criar uma conexão com o banco de dados e irá gerenciar para que não sejam abertoas novas instancias/ sessões.

Depos de criado, é só instanciar no arquivo que você deseja usar o banco de dados:
`const transactions = await db.transaction.findMany({});`

A variavel acima recebe todos os registros da tabela transaction.

# SERVER E CLIENT COMPONENTS

Server components podem importar client components, mas não o contrário.

# Uso do ASYNC E VARIAVEIS DE ESTADO

O ASYNC só pode ser usado em componentes server-side, pois ele não pode ser usado em componentes client-side, pois o browser não suporta.
Variáveis de estado, useState, só podem ser usadas em componentes client-side, pois interagem com o DOM / Front / Cliente.

# DATA TABLE - SHADCN

Para usar o DataTable, você precisa instalar o pacote shadcn, com o comando abaixo:
`npx shadcn@2.1.3 add table`

também instalar a dependencia:
`npm install @tanstack/react-table`

Para usar o DataTable, você precisa criar um componente com o nome data-table.tsx, copiar o codigo da pagina do Shadcn / table dentro dele, ajustar os apontamentos. Depois criar um arquivo columns.ts que conterá o código para criação das colunas. Pegar exemplo no site do Shadcn / table também. Este arquivo deve estar dentro da pasta \_columns que ficará dentro da pagina que você deseja usar o DataTable. Exemplo: app/transactions/\_columns/columns.ts.
Ajustar o código para que ele seja usado dentro do componente data-table.tsx.
`export const transactionColumns: ColumnDef<Transaction>[] = [...`
O codigo ColumnDef<Transaction> é um tipo que você precisa criar dentro do arquivo columns.ts. <Transaction> é o nome da tabela que você está usando, integrado ao Prisma. Com isso a tipagem é feita automaticamente.

# DIALOG - MÓDULO DE INCLUSÃO DE TRANSAÇÃO

Para criar o módulo de adição de transações, vamos usar o Dialog. Para isso, você precisa instalar o pacote shadcn, com o comando `npx shadcn@2.1.3 add dialog`

Para o formulário iremos usar o Form do Shadcn, para isso, você precisa instalar o pacote shadcn, com o comando `npx shadcn@2.1.3 add form`, e para os campos , iremos usar o Field do Shadcn, para isso, você precisa instalar o pacote shadcn, com o comando `npx shadcn@2.1.3 add input`, `npx shadcn@2.1.3 add select`, `npx shadcn@2.1.3 add popover calendar`, entre outros.

Para formatar o valor do campo "amount" para que ele seja exibido com duas casas decimais no formato de moeda brasileiro, iremos usar o pacote `react-number-format` com o comando `npm install react-number-format@5.4.2`

# DIALOG - MÓDULO DE EXCLUSÃO DE TRANSAÇÃO

Usamos o componente Alert-Dialog para solicitar a confirmação ao usuário para exclusão do registro.

# DASHBOARD

O módulo de dashboard é nossa home page.
Usamos o componente Card para exibir as informações nos summary cards.

# STRIPE

https://dashboard.stripe.com/

O Stripe é uma API de pagamento que permite realizar pagamentos online.
Para usar o Stripe, você precisa criar uma conta no site do Stripe e obter as chaves que serão utilziadas para a configuração do Stripe no seu projeto.

Para usar o Stripe, você precisa criar uma conta no site do Stripe e criar um projeto, para poder fazer as transações de pagamento.

stripe.com
Conta: mazzulli@live.com
Chave secreta: strike@????#???0

Após o cadastro, a primeira coisa a fazer é criar uma seção com o Stripe através da sua aplicação. Para isso tem que instalar a biblioteca do Stripe atraves do comando `npm install stripe@17.3.1` e criar um arquivo com o nome de stripe.
Criar as entradas abaixo no arquivo .env:
STRIPE_PREMIUM_PLAN_PRICE_ID
STRIPE_SECRET_KEY
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY

Pegar os valores no site do Stripe.

Instalar também a biblioteca @stripe/stripe-js
`npm install @stripe/stripe-js@4.9.0`

# STRIPE CLI - CONFIGURANDO O WEBHOOK

https://docs.stripe.com/webhooks
https://docs.stripe.com/stripe-cli?install-method=windows
Seguir os passos para executar o comando `stripe login` e criar uma conta no Stripe.
The Stripe CLI is configured for your account with account id acct_1QMugTKFQsLHTwLv
Your webhook signing secret is whsec_cf2585ab388b8503c63c783b86ef5f3863f2b3296debef06397b92811f5a70a0
Este secret acima deve ser salvo em uma variavel de ambiente no arquivo .env.
Para rodar a CLI do Stripe tem que ser através do terminal, e não através do VSCode. Não dá pra rodar a CLI do Stripe no VSCode e no terminal do bash.

Para receber as notificações do Stripe, você precisa configurar o webhook do Stripe.
A documentação pode ser vista em
Para isso, você precisa criamos um arquivo com o nome de route.ts dentro da pasta app/api/webhooks/stripe.

Para acompanhar os eventos é necessário ativar a escuta de eventos no Stripe.
`stripe listen --forward-to localhost:4242/webhook`

Estas são algumas configurações úteis para ajudar a testar com o ouvinte local:

Para desativar a verificação de certificados HTTPS, use o sinalizador opcional --skip-verify.
Para encaminhar apenas eventos específicos, use o sinalizador opcional --events e passe uma lista de eventos separados por vírgulas.

stripe listen --events payment_intent.created,customer.created,payment_intent.succeeded,checkout.session.completed,payment_intent.payment_failed \ --forward-to localhost:3000/api/webhook/stripe`

# CANCELAR O PLANO

Para cancelar o plano tem que acessar a conta do Stripe e cancelar o plano.

# CHAT GPT

Foi criada uma conta no chatGPT para poder usar a API.
A conta foi criada com o email do Google.
Um depósito inicial foi efetuado para poder usar a API.
Foi necessário instalar o `npm i openai@4.71.1` para se conectar com o chatGPT.
No site https://platform.openai.com/, acessar a conta e em configurações para criar uma API key.
A API key foi salva em uma variavel de ambiente no arquivo .env.
Acessar a documentação do chatGPT para criar um token de acesso. https://platform.openai.com/docs/overview
No Quickstar, https://platform.openai.com/docs/quickstart?desktop-os=windows, tem um exemplo de como criar um token de acesso e configurar o chatGPT.

Para traduzir o retorno do chatGPT, foi necessário instalar o `npm i react-markdown@9.0.1`
Usamos o tailwind para estilizar o retorno do chatGPT, `npm install -D @tailwindcss/typography@0.5.15`.
