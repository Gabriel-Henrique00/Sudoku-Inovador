# Sudoku Application

## Visão Geral
-Sudoku Inovador - Projeto Final

Este é o projeto final da matéria Programação Para Web 2, um jogo de Sudoku inovador, inspirado no meme 'Vampetasso', com arquitetura cliente/servidor, desenvolvido como uma aplicação SPA com React no front-end e Node.js/Express no back-end. O jogo segue as regras tradicionais de Sudoku, mas inclui uma inovação na jogabilidade para tornar a experiência mais dinâmica e desafiadora. O jogo também possui um sistema de cadastro de jogadores e login com autorização baseada em JWT. O design do jogo é seguro (SFW) e adequado para todas as idades.

## Requisitos
Cliente: Desenvolvido como uma SPA usando React.
Servidor: Construído com Node.js e Express.
Comunicação: Utiliza REST para a comunicação entre cliente e servidor.
Autenticação: O login dos jogadores é controlado por JWT (JSON Web Token).
Inovação: O jogo inclui uma variação inovadora nas regras de jogabilidade, inspirada no meme 'Vampetasso'.
Design Seguro (SFW): O jogo é adequado para todas as idades, com um design seguro e acessível.
Documentação: A API é documentada, e um manual de usuário está disponível para o cliente.
## Funcionalidades
Cadastro de jogadores: Permite o registro e login de jogadores.
Jogo: Implementação do Sudoku com uma variação inovadora nas regras de jogabilidade.
Autenticação: Sistema de autenticação usando JWT.
Acessibilidade: Foco na criação de uma interface acessível e fácil de usar.

## Estrutura do Projeto
O projeto está estruturado com os seguintes principais componentes:

- **Frontend:** Desenvolvido com React.
- **Backend:** Desenvolvido com Node.js e Express.
- **Banco de Dados:** Utiliza PostgreSQL.

### Componentes do Frontend

#### Login
- **Arquivo:** `login.jsx`
- Componente de login que permite ao usuário entrar na aplicação. Utiliza axios para fazer requisições à API e react-modal para exibir mensagens de erro.

#### Register
- **Arquivo:** `register.jsx`
- Componente de registro que permite ao usuário criar uma nova conta. Também utiliza axios para fazer requisições à API e react-modal para exibir mensagens de erro.

#### Sudoku
- **Arquivo:** `sudoku.jsx`
- Componente principal do jogo de Sudoku. Inclui lógica para iniciar o jogo, preencher as células do tabuleiro, validar o Sudoku e gerenciar o tempo e eventos de jumpscare.

#### RankingModal
- **Arquivo:** `rankingModal.jsx`
- Componente modal para exibir o ranking dos melhores tempos de resolução do Sudoku.

#### App
- **Arquivo:** `app.jsx`
- Componente principal que gerencia o estado da aplicação, alternando entre os componentes de Login, Register e Sudoku conforme o estado de autenticação do usuário.

### Componentes do Backend

#### Auth Controller
- **Arquivo:** `authController.js`
- Controlador responsável por gerar e verificar tokens JWT para autenticação dos usuários.

#### Game Controller
- **Arquivo:** `gameController.js`
- Controlador que contém as funções utilitárias para o jogo de Sudoku, como geração de tabuleiro, verificação de validade e controle de dificuldade.

#### Login Controller
- **Arquivo:** `loginController.js`
- Controlador responsável por autenticar usuários e gerar tokens JWT. Utiliza PostgreSQL para armazenar dados dos usuários.

## Instalação

### Pré-requisitos
- Node.js
- PostgreSQL
- NPM ou Yarn

### Passos para Instalação

1. Instale as dependências do backend:
    ```sh
    cd backend
    npm install
    ```

2. Instale as dependências do frontend:
    ```sh
    cd ../frontend
    npm install
    ```

3. Configure o banco de dados PostgreSQL:
    - Crie uma base de dados chamada `sudoku_db`.
    - Atualize as configurações do banco de dados no arquivo `config/config.js`.
    - Execute as migrações do banco de dados (se houver).

4. Inicie o backend:
    ```sh
    cd backend
    npm start
    ```

5. Inicie o frontend:
    ```sh
    cd ../frontend
    npm start
    ```

## Uso
1. Acesse a aplicação através do navegador em [http://localhost:3000](http://localhost:3000).
2. Registre um novo usuário ou faça login com um usuário existente.
3. Escolha um nível de dificuldade e comece a jogar Sudoku.
4. Valide seu tabuleiro e veja seu tempo no ranking.
