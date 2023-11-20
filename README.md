# ContactHub

## Descrição do Projeto

Este projeto visa proporcionar uma experiência eficiente no gerenciamento de clientes e contatos por meio de uma aplicação web. As funcionalidades básicas de CRUD (Create, Read, Update, Delete) foram implementadas, permitindo o cadastro, visualização, atualização e exclusão de clientes e seus contatos de maneira intuitiva e eficaz.

## Funcionalidades Principais

A aplicação incorpora um conjunto abrangente de funcionalidades para atender às necessidades de gestão de clientes e contatos:

1. **Cadastro de Clientes:**
   - Nome completo do cliente;
   - E-mail do cliente;
   - Telefone de contato;
   - Data de registro do cliente (data em que o cliente foi cadastrado).

2. **Cadastro de Contatos dos Clientes:**
   - Nome completo do contato;
   - E-mail do contato;
   - Telefone de contato;
   - Data de registro do contato (data em que o contato foi cadastrado).

3. **Operações do CRUD:**
   - **Criar:** Adição de novos clientes e contatos ao sistema.
   - **Ler:** Visualização detalhada das informações dos clientes e seus contatos.
   - **Atualizar:** Edição dos dados dos clientes e contatos já cadastrados.
   - **Deletar:** Exclusão de clientes e contatos do sistema.

4. **Vínculo entre Clientes e Contatos:**
   - Um cliente pode ter vários contatos vinculados, estabelecendo uma relação um-para-muitos entre clientes e contatos.

5. **Relatório de Clientes e Contatos:**
   - Disponibilização de um relatório que apresenta os dados dos clientes e seus respectivos contatos. Esse relatório pode ser visualizado na própria aplicação em formato de tela ou exportado em formato PDF.


## Tecnologias Utilizadas

O projeto foi desenvolvido utilizando as seguintes tecnologias:

- **Linguagem de Programação:** [Typescript](https://www.typescriptlang.org/)
- **Banco de Dados:** [PostgreSQL](https://www.postgresql.org/)
- **Backend:** [NestJS](https://nestjs.com/)
- **Frontend:** [React](https://react.dev/)
- **Ferramentas de Estilização:** [Tailwindcss](https://tailwindcss.com/)
- Outras bibliotecas e ferramentas serão adicionadas conforme a necessidade do desenvolvimento.

## Instruções de Execução

Para executar a aplicação em ambiente local, siga os passos abaixo:

1. Clonar o repositório do projeto do GitHub: [Repositório](https://github.com/mk-nascimento/fullstack-challenge)

2. Configurar Variáveis de Ambiente:
   > Antes de iniciar a aplicação, certifique-se de configurar as variáveis de ambiente necessárias. Consulte os arquivos de exemplo `env.example` nos seguintes diretórios:
   > - **Backend:** [backend/env.example](/backend/.env.example)
      <br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; *Os arquivos devem ser duplicados ou criados com a nomenclatura `.env`.*
   > - **Frontend:** [frontend/env.example](/frontend/.env.example)
      <br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; *Os arquivos devem ser duplicados ou criados com a nomenclatura `.env`.*

3. Como Iniciar
   > Para iniciar o projeto em sistemas POSIX, execute o Makefile para obter instruções. Utilize o seguinte comando no terminal:
      ```bash
         make
      ```

### Consumo (server)

A API pode ser acessada nos seguintes ambientes:

- **Local (Desenvolvimento):** [http://localhost:3000/api](http://localhost:3000/api)
  > O ambiente local é utilizado durante o desenvolvimento da aplicação. Certifique-se de que a variável `APP_PORT` esteja configurada corretamente no arquivo [backend/.env](/backend/.env) seguindo o exemplo: [backend/env.example](/backend/.env.example). Caso não seja configurada, o valor padrão será 3000.

- **Produção:** [https://mk-node-contacthub.onrender.com/api](https://mk-node-contacthub.onrender.com/api)
  > O ambiente de produção é a versão final da API disponível para uso público.

Certifique-se de ajustar os URLs de acordo com os seus ambientes reais e fornecer as informações específicas necessárias para o uso adequado da API em cada ambiente.

### Consumo (frontend)

A aplicação frontend pode interagir com a API nos seguintes ambientes:

- **Local (Desenvolvimento):** [http://localhost:5173](http://localhost:5173)
  > Este ambiente local é usado durante o desenvolvimento da aplicação frontend. Certifique-se de que a variável `VITE_API_URL` esteja configurada corretamente no arquivo [frontend/.env](/frontend/.env) seguindo o exemplo: [frontend/env.example](/frontend/.env.example).

- **Produção:** [https://mk-contacthub.vercel.app/](https://mk-contacthub.vercel.app/)
  > O ambiente de produção representa a versão final do frontend disponível para uso público.

### Recursos Disponíveis

A API interna oferece os seguintes recursos:

|  Método   |       Endpoint       |                           Responsabilidade                           |                 Autenticação                 |
| --------- | -------------------- | -------------------------------------------------------------------- | -------------------------------------------- |
|  POST     | /auth/login          | Realiza login de usuário já cadastrado.                              | Todos os usuários, não necessita token       |
|  GET      | /auth/validate       | Valida token de usuário logado.                                      | Todos os usuários, obrigatório token         |
|  POST     | /api/users           | Cria um novo cliente.                                                | Todos os usuários, não necessita token       |
|  GET      | /api/users           | Retorna a lista de todos os clientes cadastrados.                    | Apenas administradores, obrigatório token    |
|  GET      | /api/users/profile   | Retorna os detalhes de um cliente específico com base em seu ID.     | Administradores ou dono, obrigatório token   |
|  GET      | /api/users/{id}      | Retorna os dados do usuário logado, contendo sua lista de contatos.  | Administradores ou dono, obrigatório token   |
|  PATCH    | /api/users/{id}      | Atualiza os dados de um cliente existente com base em seu ID.        | Administradores ou dono, obrigatório token   |
|  DELETE   | /api/users/{id}      | Exclui um cliente com base em seu ID.                                | Administradores ou dono, obrigatório token   |
|  POST     | /api/contacts        | Cria um novo contato.                                                | Administradores ou dono, obrigatório token   |
|  GET      | /api/contacts        | Retorna a lista de todos os contatos cadastrados.                    | Administradores ou dono, obrigatório token   |
|  GET      | /api/contacts/{id}   | Retorna os detalhes de um contato específico com base em seu ID.     | Administradores ou dono, obrigatório token   |       
|  PUT      | /api/contacts/{id}   | Atualiza os dados de um contato existente com base em seu ID.        | Administradores ou dono, obrigatório token   |
|  DELETE   | /api/contacts/{id}   | Exclui um contato com base em seu ID.                                | Administradores ou dono, obrigatório token   |

## Créditos

Este projeto foi desenvolvido por:
 > <a href="https://github.com/mk-nascimento"><img src="https://avatars.githubusercontent.com/u/114680477?v=4" width="50px;" alt="Foto de perfil GitHub:Maksuel"/><br><sub><b>Maksuel Nascimento</b></sub></a>


### Contato

Se precisar de suporte ou tiver alguma dúvida, entre em contato:

- <a href="https://www.linkedin.com/in/maksuel-nascimento" target="_blank"><img src="https://img.shields.io/badge/linkedin-%230077B5.svg?style=for-the_badge&logo=linkedin&logoColor=white"/></a>
- <a href="mailto:mk-nascimento@hotmail.com" target="_blank"><img src="https://img.shields.io/badge/Microsoft_Outlook-0078D4?style=for-the_badge&logo=microsoft-outlook&logoColor=white"/></a>

## Considerações Finais
<br>
Este projeto visa criar uma aplicação web para gerenciamento de clientes e contatos, facilitando a organização e consulta das informações. Com as operações de CRUD disponíveis e o relatório de clientes e contatos, espera-se fornecer uma ferramenta útil e funcional para o usuário.

Caso haja alguma dúvida, sugestão ou melhoria para este projeto, sinta-se à vontade para contribuir através de pull requests ou entrando em contato com a equipe de desenvolvimento.

Agradecemos o interesse em nosso projeto e esperamos que ele possa atender às suas necessidades de gestão de clientes e contatos.

[&#x2B06; Voltar ao topo](#contacthub)