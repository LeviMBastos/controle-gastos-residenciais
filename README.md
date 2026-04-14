# Gastos Residenciais (Sistema de Controle de Despesas Residenciais)

Este projeto implementa um sistema de controle de despesas residenciais, projetado para gerenciar finanças pessoais através do acompanhamento de receitas e despesas. O sistema é dividido em uma Web API (backend) e uma aplicação frontend baseada em React.

## Tecnologias Utilizadas

- **Backend**: C# e .NET
- **Frontend**: React com TypeScript
- **Persistência**: SQLite.

## Funcionalidades

O sistema oferece as seguintes funcionalidades principais:

### 1. Cadastro de Pessoas

Este módulo permite o gerenciamento de indivíduos dentro do sistema. Inclui as operações básicas de CRUD (Criar, Ler, Atualizar, Excluir).

- **Campos**:
    - `Id`: Um valor único, gerado automaticamente.
    - `Nome`: Campo de texto com comprimento máximo de 200 caracteres.
    - `Idade`: Campo numérico.
- **Regras de Negócio**:
    - A exclusão de uma pessoa resultará na exclusão automática de todas as transações associadas a essa pessoa.

### 2. Cadastro de Categorias

Este módulo permite o gerenciamento de categorias de transação. Inclui funcionalidades de criação e listagem.

- **Campos**:
    - `Id`: Um valor único, gerado automaticamente.
    - `Descrição`: Campo de texto com comprimento máximo de 400 caracteres.
    - `Finalidade`: Define o uso da categoria (despesa, receita ou ambas).

### 3. Cadastro de Transações

Este módulo gerencia a criação e listagem de transações financeiras. Inclui funcionalidades de criação e listagem.

- **Campos**:
    - `Id`: Um valor único, gerado automaticamente.
    - `Descrição`: Campo de texto com comprimento máximo de 400 caracteres.
    - `Valor`: Um valor numérico positivo.
    - `Tipo`: Especifica se a transação é uma despesa ou uma receita.
    - `Categoria`: Deve ser restrita com base em seu campo `Finalidade`. Por exemplo, uma transação de despesa não pode usar uma categoria com finalidade 'receita'.
    - `Pessoa`: O Id da pessoa associada à transação.
- **Regras de Negócio**:
    - Para indivíduos menores de 18 anos, apenas transações de despesa são permitidas.

### 4. Consulta de Totais por Pessoa

Esta funcionalidade fornece um resumo das atividades financeiras por pessoa.

- **Detalhes**:
    - Lista todas as pessoas cadastradas.
    - Exibe o total de receitas, total de despesas e o saldo líquido (receita – despesa) para cada pessoa.
    - Fornece totais gerais para todas as pessoas, incluindo o total de receitas, total de despesas e o saldo líquido geral.

### 5. Consulta de Totais por Categoria (Opcional)

Esta funcionalidade opcional fornece um resumo das atividades financeiras por categoria.

- **Detalhes**:
    - Lista todas as categorias cadastradas.
    - Exibe o total de receitas, total de despesas e o saldo líquido (receita – despesa) para cada categoria.
    - Fornece totais gerais para todas as categorias, incluindo o total de receitas, total de despesas e o saldo líquido geral.

## Endpoints da API

A Web API de backend expõe os seguintes endpoints:

### `CategoriaController`

Gerencia operações relacionadas às categorias de transação.

- `GET /api/Categoria`
    - **Descrição**: Recupera uma lista de todas as categorias registradas.
    - **Resposta**: `IList<CategoriaPesquisaDto>`
- `GET /api/Categoria/TotaisTransacoes`
    - **Descrição**: Recupera o total de transações por categoria.
    - **Resposta**: `CategoriaConsultaTotalDto`
- `POST /api/Categoria`
    - **Descrição**: Cria uma nova categoria.
    - **Corpo da Requisição**: `CategoriaDto`
    - **Resposta**: Mensagem de sucesso após a criação.

### `PessoaController`

Gerencia operações relacionadas às pessoas.

- `GET /api/Pessoa`
    - **Descrição**: Recupera uma lista de todas as pessoas registradas.
    - **Resposta**: `IList<PessoaPesquisaDto>`
- `GET /api/Pessoa/{id}`
    - **Descrição**: Recupera uma pessoa específica pelo seu Id.
    - **Parâmetros**: `id` (int)
    - **Resposta**: `PessoaPesquisaDto` ou 404 se não encontrada.
- `GET /api/Pessoa/TotaisTransacoes`
    - **Descrição**: Recupera o total de transações por pessoa.
    - **Resposta**: `PessoaConsultaTotalDto`
- `POST /api/Pessoa`
    - **Descrição**: Cria uma nova pessoa.
    - **Corpo da Requisição**: `PessoaDto`
    - **Resposta**: Mensagem de sucesso após a criação.
- `PUT /api/Pessoa/{id}`
    - **Descrição**: Atualiza uma pessoa existente.
    - **Parâmetros**: `id` (int)
    - **Corpo da Requisição**: `PessoaDto`
    - **Resposta**: Mensagem de sucesso após a atualização ou 404 se não encontrada.
- `DELETE /api/Pessoa/{id}`
    - **Descrição**: Exclui uma pessoa pelo seu Id.
    - **Parâmetros**: `id` (int)
    - **Resposta**: Mensagem de sucesso após a exclusão ou 404 se não encontrada.

### `TransacaoController`

Gerencia operações relacionadas às transações financeiras.

- `GET /api/Transacao`
    - **Descrição**: Recupera uma lista de todas as transações registradas.
    - **Resposta**: `IList<TransacaoPesquisaDto>`
- `POST /api/Transacao`
    - **Descrição**: Cria uma nova transação.
    - **Corpo da Requisição**: `TransacaoDto`
    - **Resposta**: Mensagem de sucesso após a criação.