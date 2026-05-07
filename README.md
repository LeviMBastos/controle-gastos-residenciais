# Sistema de Controle de Gastos Residenciais

<div align="center">

**Escolha o idioma / Choose language:**

[![pt-br](https://img.shields.io/badge/PT--BR-Português-green)](#pt-br) [![en-us](https://img.shields.io/badge/EN--US-English-blue)](#en-us)

</div>

---

<a name="pt-br"></a>

## 🇧🇷 Português (Brazilian Portuguese)

# Sistema de Controle de Gastos Residenciais

Implementação de um sistema para controle de gastos residenciais, permitindo o gerenciamento de pessoas, categorias e transações financeiras.

### Como executar o projeto a partir da PASTA RAÍZ

#### Back-end (.NET)

```bash
cd backend/GastosResidenciais.Api
dotnet restore
dotnet run
```

A documentação da API estará disponível em:
[http://localhost:5101/swagger](http://localhost:5101/swagger/index.html)

#### Front-end (React)

```bash
cd frontend/gastos_residenciais_web
npm install
npm run dev
```

### Arquitetura

O sistema foi dividido em duas camadas principais:

- **Back-end (Web API)**
  Desenvolvido com C# e .NET (persistência de dados - SQLite + EF Core).

- **Front-end**
  Desenvolvido com React + TypeScript.

#### Estrutura do Back-end

A API segue uma arquitetura em camadas:

- API (Controllers)
- Business
- Data

##### Controllers

Responsáveis por expor os endpoints da API e delegar as ações para a camada de negócio.

**Exemplo**:
- PessoaController
- CategoriaController
- TransacaoController

##### Camada Business

Contém toda a lógica de negócio, garantindo que as regras do sistema sejam respeitadas.

**Exemplo**:
- IPessoaBusiness
- ICategoriaBusiness
- ITransacaoBusiness

##### Data

A persistência foi implementada utilizando Entity Framework Core + SQLite. Os dados são armazenados de forma persistente.

### Funcionalidades

#### Cadastro de Pessoas

**Permite**:
- Criar
- Editar
- Deletar
- Listar

**Regras**:
- Nome com até 200 caracteres
- Ao deletar uma pessoa, todas as suas transações são removidas

**Endpoints**:
- `GET /api/pessoa`
- `GET /api/pessoa/{id}`
- `POST /api/pessoa`
- `PUT /api/pessoa/{id}`
- `DELETE /api/pessoa/{id}`
- `GET /api/pessoa/TotaisTransacoes`

#### Cadastro de Categorias

**Permite**:
- Criar
- Listar

**Campos**:
- Descrição (até 400 caracteres)
- Finalidade:
  - Receita
  - Despesa
  - Ambas

**Regras**:
- A categoria deve ser compatível com o tipo da transação

**Endpoints**:
- `GET /api/categoria`
- `POST /api/categoria`
- `GET /api/categoria/TotaisTransacoes`

#### Cadastro de Transações

**Permite**:
- Criar
- Listar

**Campos**:
- Descrição (até 400 caracteres)
- Valor (positivo)
- Tipo:
  - Receita
  - Despesa
- Categoria
- Pessoa

**Regras de Negócio**:
- Menores de idade (< 18 anos):
  - Só podem ter despesas
- Validação de categoria:
  - Transações do tipo despesa não podem usar categorias de receita
  - Transações do tipo receita não podem usar categorias de despesa

**Endpoints**:
- `GET /api/transacao`
- `POST /api/transacao`

### Consultas

#### Totais por Pessoa

**Retorna**:
- Total de receitas
- Total de despesas
- Saldo (receitas - despesas)

**Inclui também**:
- Total geral consolidado

**Endpoint**:
- `GET /api/pessoa/TotaisTransacoes`

#### Totais por Categoria (Opcional)

**Retorna**:
- Total de receitas
- Total de despesas
- Saldo

**Inclui total geral.**

**Endpoint**:
- `GET /api/categoria/TotaisTransacoes`

### Regras de Negócio (Resumo)

- Pessoa menor de idade → não pode ter receita
- Categoria deve ser compatível com o tipo da transação
- Exclusão de pessoa → remove todas as transações relacionadas
- Valores de transações devem ser positivos

### Tratamento de Erros

A API utiliza tratamento padrão com try/catch nos controllers:

- `400 BadRequest` → erros de validação/regra de negócio
- `404 NotFound` → recurso não encontrado
- `201 Created` → criação com sucesso

---

<a name="en-us"></a>

## 🇺🇸 English (English)

# Residential Expense Management System

Implementation of a system for controlling residential expenses, enabling the management of people, categories, and financial transactions.

### How to run the project from the ROOT FOLDER

#### Back-end (.NET)

```bash
cd backend/GastosResidenciais.Api
dotnet restore
dotnet run
```

The API documentation will be available at:
[http://localhost:5101/swagger](http://localhost:5101/swagger/index.html)

#### Front-end (React)

```bash
cd frontend/gastos_residenciais_web
npm install
npm run dev
```

### Architecture

The system is divided into two main layers:

- **Back-end (Web API)**
  Developed with C# and .NET (data persistence - SQLite + EF Core).

- **Front-end**
  Developed with React + TypeScript.

#### Back-end Structure

The API follows a layered architecture:

- API (Controllers)
- Business
- Data

##### Controllers

Responsible for exposing the API endpoints and delegating actions to the business layer.

**Example**:
- PessoaController
- CategoriaController
- TransacaoController

##### Business Layer

Contains all business logic, ensuring that system rules are respected.

**Example**:
- IPessoaBusiness
- ICategoriaBusiness
- ITransacaoBusiness

##### Data

Persistence was implemented using Entity Framework Core + SQLite. Data is stored persistently.

### Features

#### People Registration

**Allows**:
- Create
- Edit
- Delete
- List

**Rules**:
- Name with up to 200 characters
- When deleting a person, all their transactions are removed

**Endpoints**:
- `GET /api/pessoa`
- `GET /api/pessoa/{id}`
- `POST /api/pessoa`
- `PUT /api/pessoa/{id}`
- `DELETE /api/pessoa/{id}`
- `GET /api/pessoa/TotaisTransacoes`

#### Category Registration

**Allows**:
- Create
- List

**Fields**:
- Description (up to 400 characters)
- Purpose:
  - Income
  - Expense
  - Both

**Rules**:
- The category must be compatible with the transaction type

**Endpoints**:
- `GET /api/categoria`
- `POST /api/categoria`
- `GET /api/categoria/TotaisTransacoes`

#### Transaction Registration

**Allows**:
- Create
- List

**Fields**:
- Description (up to 400 characters)
- Value (positive)
- Type:
  - Income
  - Expense
- Category
- Person

**Business Rules**:
- Minors (< 18 years old):
  - Can only have expenses
- Category validation:
  - Expense-type transactions cannot use income categories
  - Income-type transactions cannot use expense categories

**Endpoints**:
- `GET /api/transacao`
- `POST /api/transacao`

### Queries

#### Totals by Person

**Returns**:
- Total income
- Total expenses
- Balance (income - expenses)

**Also includes**:
- Consolidated total

**Endpoint**:
- `GET /api/pessoa/TotaisTransacoes`

#### Totals by Category (Optional)

**Returns**:
- Total income
- Total expenses
- Balance

**Includes overall total.**

**Endpoint**:
- `GET /api/categoria/TotaisTransacoes`

### Business Rules (Summary)

- Minor person → cannot have income
- Category must be compatible with the transaction type
- Person deletion → removes all related transactions
- Transaction values must be positive

### Error Handling

The API uses standard error handling with try/catch in controllers:

- `400 BadRequest` → validation/business rule errors
- `404 NotFound` → resource not found
- `201 Created` → successful creation

---

<div align="center">

[⬆ Back to top](#-sistema-de-controle-de-gastos-residenciais) | [Voltar ao topo](#pt-br)

</div>