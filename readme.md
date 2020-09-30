# Lab

[![Commitizen friendly](https://img.shields.io/badge/commitizen-friendly-brightgreen.svg)](http://commitizen.github.io/cz-cli/)
[![Inline docs](http://inch-ci.org/github/marciofmjr/lab.svg?branch=master)](http://inch-ci.org/github/marciofmjr/lab)
[![Inline docs](http://inch-ci.org/github/marciofmjr/agrimin-backend.svg?branch=master)](http://inch-ci.org/github/marciofmjr/agrimin-backend)


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

npm run start
```

## Testes
- Para executar os testes do projeto execute os comandos abaixo:
```bash
# Entrar na pasta do projeto: ex: cd ~/dev/projetos/lab

# Testar projeto client
cd client
npm run test

# Testar projeto server
cd ../server
npm run test
```