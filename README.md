# Criar o projeto

`npx create-next-app@14.2.16`

# Criar a modelagem de dados

Usar o eraser para criar o diagrama de entidade e relacionamento.

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
