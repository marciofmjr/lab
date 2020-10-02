# Lab

[![Commitizen friendly](https://img.shields.io/badge/commitizen-friendly-brightgreen.svg)](http://commitizen.github.io/cz-cli/)


:hospital: (Laboratório) é um projeto para demonstrar habilidades de desenvolvimento. Ele é um painel de uma clínica que deve cadastrar ordens de serviço de pacientes que vão fazer exames médicos.

Esse repositório é divido em 2 projetos:
- Client: Projeto usado no client (browser) do usuário, feito com Vue.js
- Server: Api consumida pelo client, construída com Node.js/Express

## Pré-requisitos
- Node.js (>= 12.18.1)
- Postgres

## Configuração
- Necessário configurar os arquivos: `.env`, `.env.test` com as credenciais de acesso ao banco de dados postgres

## Instalação
- Necessário instalar as dependências dos projetos
```bash
# Entrar na pasta do projeto: ex: cd ~/dev/projetos/lab

# Instala as dependências do client
cd client
npm install

# Instala as dependências do server
cd ../server
npm install
```

## Execução
- Após configurar as credenciais de acesso ao banco de dados e instalar as dependências dos projetos, execute o comando abaixo
```bash
# Entrar na pasta do projeto: ex: cd ~/dev/projetos/lab

# Inicia o projeto do client
cd client
npm run start # o terminal ficara travado executando o processo

# abra uma nova aba no terminal para não parar o processo do client e iniciar o processo do servidor:

# Inicia o projeto do server
cd ../server
npm run start

# Após os 2 projetos estiverem rodando, acesse no navegador o endereço:
# http://localhost:8080
# O usuário e senha para fazer login no painel é:
# email: marcio@laboratorio.com
# senha: admin123
```

## Testes
- Para executar os testes do projeto execute os comandos abaixo:
```bash
# Entrar na pasta do projeto: ex: cd ~/dev/projetos/lab

# Testar projeto client
cd client
npm run test # testes unitários
npm run cypress # testes e2e

# PARA RODAR OS TESTES DO CYPRESS, OS DOIS PROJETOS PRECISAM ESTAR RODANDO (client e server)

# Testar projeto server
cd ../server
npm run test
```

## Adicionais

### Husky
- Os projetos tem o husky configurado, para quando for feito um commit ou um push, ele primeiro rodar as validações de lint e os testes para ver se tudo está passando certinho. Somente se tudo estiver OK ele prossegue com a ação de commit ou push

### Github Actions (CI)
- Também foi configurado o Github Actions como CI para rodar as validações de lint e todos os testes

### Commitizen
- Foi usado o commitizen para padronizar as mensagens dos commits

### Cypress
- Foi adicionado o cypress para fazer os testes e2e, toda vez que é feito um push, ele roda esses testes