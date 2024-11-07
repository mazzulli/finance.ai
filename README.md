# Links Uteis

Modelagem de dados:
https://www.drawdb.app/
https://drawsql.app/

# Criar o projeto

`npx create-next-app@14.2.16`

# Criar a modelagem de dados

Usar o eraser para criar o diagrama de entidade e relacionamento.
A modelagem está em: https://app.eraser.io/workspace/C3HphDLMJA9jzuCzqR6L

# Banco de Dados

O banco de dados utilizado é o PostgreSQL.
Ele está hospedado no NeonDB em: https://console.neon.tech/app/projects/gentle-paper-35030639?database=neondb

# Instalar o Prisma

Usar o Prisma como ORM.

`npm install prisma@5.21.1 typescript ts-node @types/node --save-dev`
`npx prisma init --datasource-provider postgresql`
`npx prisma migrate dev --name init`

Dentro do arquivo prisma.shcema contem a modelagem de dados que ao rodar o npx prisma migrate dev --name init irá criar as tabelas no banco de dados.

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
