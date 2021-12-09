# Desafio Donus-Code

## Sobre o projeto

Desafio Técnico para processo seletivo, este projeto consiste na implementação de um sistema de banco, onde o cliente pode criar conta com apenas seu nome completo e CPF, fazer login assim sendo autenticado, já autenticado o cliente poderá fazer depositos em contas validas em até R$2.000,00 e fazer transferências ilimitadas para outras contas.

## Tecnologias Utilizadas

#### :link: [Node.js](https://nodejs.org/en/)
#### :link: [Express](https://expressjs.com/pt-br/)
#### :link: [MongoDB](https://docs.mongodb.com/)
#### :link: [JsonWebToken](https://jwt.io/introduction)
#### :link: [Joi](https://joi.dev/api/?v=17.5.0)
#### :link: [cpf-validator](https://github.com/carvalhoviniciusluiz/cpf-cnpj-validator#readme)


## Pré-Requisitos

Este projeto Utiliza o banco de dados MongoDB, para o perfeito funcionamento é necessário ter o banco de dados em sua máquina. Para instruções sobre a instalação do banco de dados acesse [MongoDB](https://docs.mongodb.com/manual/installation/).

## Instalação

-Clone o repositório através da seguinte chave https: `https://github.com/devwelljr/devwelljr-donus-code-challenge.git`

-Instale as dependências através do `npm install`.

-Para iniciar a aplicação rode o comando `npm start` em seu terminal.

## Como utilizar

### POST: http://localhost:3000/users

O projeto começa com o cliente tendo que criar conta no `Donus Bank`, onde deve passar para o `Body` da requisição seu nome completo no campo `name` com no mínimo 4 caracteres e CPF brasileiro válido com formatação ou sem no campo `cpf`.

![DemonstraçaoCriaçãoUser](/images/createUser.png)

### POST: http://localhost:3000/users/login

Após isto o cliente deverá efetuar o login, onde deve passar para o `Body` da requisição seu CPF, assim será verificado se o cliente existe no banco de dados e gerado um token JWT para o cliente fazer operações de transferência, deposito e saldo da conta.

![DemonstraçãoLogin](/images/loginUser.png)

O token deve ser inserido no `header` no campo `Authorization` para fazer as operações a seguir:

![DemonstraçãoAutorização](/images/authorization.png)

### POST: http://localhost:3000/operations/deposit

Para fazer deposito é necessário inserir no `Body` o CPF do beneficiário no campo `beneficiary` e valor no campo `value` sendo maior que 1 e por questões de segurança menor do que R$2000.00.

![DemonstraçãoDeposito](/images/depositOp.png)

### PUT: http://localhost:3000/operations/transfer

Para fazer transferência é necessário inserir no `Body` o CPF do beneficiário no campo `beneficiary` e valor no campo `value` sendo maior que 1.

![DemonstraçãoTransferencia](/images/transferOp.png)

### GET: http://localhost:3000/operations/current

Para olhar o saldo da conta é necessário apenas o token no `header` no campo `Authorization`.

![DemonstraçãoTransferencia](/images/currentOp.png)

## Contato 

Wellington Gregorio - junior.wel02@gmail.com
