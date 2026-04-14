Sistema de Controle de Gastos Residenciais

Implementação de um sistema para controle de gastos residenciais, permitindo o gerenciamento de pessoas, categorias e transações financeiras.

Como executar o projeto
Back-end (.NET)
cd GastosResidenciais.Api
dotnet restore
dotnet run

A documentação da API estará disponível em:
[http://localhost:5101/swagger](http://localhost:5101/swagger/index.html)


Front-end (React)
cd frontend
npm install
npm run dev

O sistema foi dividido em duas camadas principais:

Back-end (Web API)
Desenvolvido com C# e .NET, responsável pelas regras de negócio e persistência de dados.

Front-end
Desenvolvido com React + TypeScript, responsável pela interface com o usuário.

Estrutura do Back-end
A API segue uma arquitetura em camadas:

API (Controllers), Business e Data.

Controllers
Responsáveis por expor os endpoints da API e delegar as ações para a camada de negócio.

Exemplo:
PessoaController
CategoriaController
TransacaoController

Camada Business
Contém toda a lógica de negócio, garantindo que as regras do sistema sejam respeitadas.

Exemplo:
IPessoaBusiness
ICategoriaBusiness
ITransacaoBusiness

Data
A persistência foi implementada utilizando Entity Framework Core + SQLite
Os dados são armazenados de forma persistente.

Funcionalidades
Cadastro de Pessoas
Permite:

Criar
Editar
Deletar
Listar
Regras:
Nome com até 200 caracteres
Ao deletar uma pessoa, todas as suas transações são removidas
Endpoints:
GET /api/pessoa
GET /api/pessoa/{id}
POST /api/pessoa
PUT /api/pessoa/{id}
DELETE /api/pessoa/{id}
GET /api/pessoa/TotaisTransacoes

Cadastro de Categorias
Permite:
Criar
Listar
Campos:
Descrição (até 400 caracteres)
Finalidade:
Receita
Despesa
Ambas
Regras:
A categoria deve ser compatível com o tipo da transação
Endpoints:
GET /api/categoria
POST /api/categoria
GET /api/categoria/TotaisTransacoes

Cadastro de Transações
Permite:
Criar
Listar
Campos:
Descrição (até 400 caracteres)
Valor (positivo)
Tipo:
Receita
Despesa
Categoria
Pessoa
Regras de Negócio:
Menores de idade (< 18 anos):
Só podem ter despesas
Validação de categoria:
Transações do tipo despesa não podem usar categorias de receita
Transações do tipo receita não podem usar categorias de despesa
Endpoints:
GET /api/transacao
POST /api/transacao
Consultas
Totais por Pessoa

Retorna:

Total de receitas
Total de despesas
Saldo (receitas - despesas)

Inclui também:

Total geral consolidado

Endpoint:

GET /api/pessoa/TotaisTransacoes
Totais por Categoria (Opcional)

Retorna:

Total de receitas
Total de despesas
Saldo

Inclui total geral.

Endpoint:

GET /api/categoria/TotaisTransacoes
Regras de Negócio (Resumo)
Pessoa menor de idade → não pode ter receita
Categoria deve ser compatível com o tipo da transação
Exclusão de pessoa → remove todas as transações relacionadas
Valores de transações devem ser positivos
Tratamento de Erros

A API utiliza tratamento padrão com try/catch nos controllers:

400 BadRequest → erros de validação/regra de negócio
404 NotFound → recurso não encontrado
201 Created → criação com sucesso

Exemplo de resposta de erro:

{
  "mensagem": "Descrição do erro"
}
