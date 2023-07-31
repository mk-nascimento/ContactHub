# Proposta de Projeto: Sistema de Cadastro de Clientes e Contatos

## Descrição do Projeto

O objetivo deste projeto é desenvolver uma aplicação web que permita o cadastro de clientes e seus respectivos contatos. A aplicação oferecerá as funcionalidades básicas de um CRUD (Create, Read, Update, Delete) para ambos os recursos, ou seja, será possível cadastrar, visualizar, atualizar e excluir clientes e seus contatos de forma intuitiva e eficiente.

## Funcionalidades Principais

A aplicação web deverá conter as seguintes funcionalidades:

1. Cadastro de Clientes:
   - Nome completo do cliente;
   - E-mail do cliente;
   - Telefone de contato;
   - Data de registro do cliente (data em que o cliente foi registrado).

2. Cadastro de Contatos dos Clientes:
   - Nome completo do contato;
   - E-mail do contato;
   - Telefone de contato;
   - Data de registro do contato (data em que o contato foi cadastrado).

3. Operações do CRUD:
   - Criar: Possibilidade de adicionar novos clientes e contatos ao sistema.
   - Ler: Visualizar informações detalhadas dos clientes e seus contatos.
   - Atualizar: Permitir a edição dos dados dos clientes e contatos já cadastrados.
   - Deletar: Excluir clientes e contatos do sistema.

4. Vínculo entre Clientes e Contatos:
   - Um cliente poderá ter mais de um contato vinculado a ele, estabelecendo assim uma relação um-para-muitos entre clientes e contatos.

5. Relatório de Clientes e Contatos:
   - Disponibilizar um relatório que apresente os dados dos clientes e seus respectivos contatos. Esse relatório poderá ser visualizado na própria aplicação em formato de tela ou exportado em formato PDF.

## Tecnologias Utilizadas

O projeto será desenvolvido utilizando as seguintes tecnologias:

- Linguagem de Programação: [Typescript]
- Framework Web: [Front: React, Back: Node/Express]
- Banco de Dados: [PostgreSQL]
- Ferramentas de Estilização: [Tailwindcss]
- Outras bibliotecas e ferramentas serão adicionadas conforme a necessidade do desenvolvimento.

## Instruções de Execução

Para executar a aplicação em ambiente local, siga os passos abaixo:

1. Clonar o repositório do projeto do GitHub: [https://github.com/mk-nascimento/fullstack-challenge]
- 1.2 Mude para a pasta da stack [backend/frontend] ```cd backend/``` ou ```cd frontend/```
2. Instalar as dependências necessárias utilizando ```npm i```.
3. Configurar as variáveis de ambiente, se necessário.[.env.example gerada para cada stack]
4. Iniciar o servidor da aplicação utilizando o comando ```npm run dev```.
5. Acessar a aplicação pelo navegador através da URL fornecida no terminal.

## Considerações Finais

Este projeto visa criar uma aplicação web para gerenciamento de clientes e contatos, facilitando a organização e consulta das informações. Com as operações de CRUD disponíveis e o relatório de clientes e contatos, espera-se fornecer uma ferramenta útil e funcional para o usuário.

Caso haja alguma dúvida, sugestão ou melhoria para este projeto, sinta-se à vontade para contribuir através de pull requests ou entrando em contato com a equipe de desenvolvimento.

Agradecemos o interesse em nosso projeto e esperamos que ele possa atender às suas necessidades de gestão de clientes e contatos.
