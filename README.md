# Controle de Fornecedores e Requisições de Compras

Este projeto é um **Sistema de Controle de Fornecedores e Requisições de Compras** que permite o cadastro de fornecedores, contatos de fornecedores, produtos, cotações e requisições de compras, além de consultas detalhadas de cotações e controle de permissões de colaboradores e administradores. O sistema foi desenvolvido com [Create React App](https://github.com/facebook/create-react-app) para a web e com suporte para [React Native](https://reactnative.dev/) para dispositivos móveis.

## Funcionalidades

- **Cadastro de Fornecedores**: Adicione e gerencie fornecedores no sistema.
- **Cadastro de Contatos**: Mantenha informações de contato atualizadas para cada fornecedor.
- **Cadastro de Produtos**: Registre e gerencie os produtos fornecidos por cada fornecedor.
- **Cadastro de Cotações**: Registre cotações de preços para produtos e gerencie o histórico de cotações.
- **Consulta de Cotações**: Pesquise e compare cotações de produtos por fornecedor e por data.
- **Requisição de Compras**: Permita que colaboradores façam requisições de compras, acompanhem o status e consultem cotações.
- **Exportação de Cotações**: Exporte cotações em formato CSV para análises e relatórios externos.
- **Gerenciamento de Contas**: Controle a criação de contas de colaboradores e administradores. Os administradores podem bloquear contas de colaboradores.

## Histórias de Usuários

### 1. Cadastro de Fornecedores

**História de Usuário:**

- Como gerente de compras,
- Quero cadastrar novos fornecedores no sistema,
- Para manter um registro atualizado de todos os fornecedores e suas informações de contato.

**Critérios de Aceitação:**

1. O sistema deve permitir o cadastro de fornecedores com nome, CNPJ, endereço, e contato principal.
2. Deve ser possível editar as informações de um fornecedor já cadastrado.
3. O CNPJ deve ser validado para garantir que é válido.
4. Deve haver uma lista de fornecedores com busca por nome ou CNPJ.

### 2. Cadastro de Contatos

**História de Usuário:**

- Como gerente de compras,
- Quero cadastrar contatos de fornecedores,
- Para ter acesso rápido aos responsáveis de cada fornecedor.

**Critérios de Aceitação:**

1. O sistema deve permitir o cadastro de contatos com nome, telefone e e-mail.
2. Cada contato deve estar associado a um fornecedor específico.
3. Deve ser possível editar as informações de um contato já cadastrado.
4. A lista de contatos deve ser exibida na página do fornecedor associado.

### 3. Cadastro de Produtos

**História de Usuário:**

- Como gerente de compras,
- Quero cadastrar novos produtos no sistema,
- Para gerenciar o inventário e as cotações de cada produto.

**Critérios de Aceitação:**

1. O sistema deve permitir o cadastro de produtos com nome, descrição, categoria, e especificações técnicas.
2. Deve ser possível editar as informações de um produto já cadastrado.
3. O nome do produto deve ser único para evitar duplicatas.
4. Deve haver uma lista de produtos com busca por nome ou categoria.

### 4. Cadastro de Cotações

**História de Usuário:**

- Como gerente de compras,
- Quero cadastrar cotações para produtos,
- Para comparar diferentes ofertas e tomar decisões informadas.

**Critérios de Aceitação:**

1. O sistema deve permitir o cadastro de cotações com produto, fornecedor, data da cotação, preço e meio de comunicação utilizado.
2. Deve ser possível editar as informações de uma cotação já cadastrada.
3. As cotações devem ser associadas a produtos específicos.
4. Deve haver uma lista de cotações com busca por produto ou fornecedor.

### 5. Consulta de Cotações por Produto

**História de Usuário:**

- Como gerente de compras,
- Quero consultar todas as cotações para um produto,
- Para comparar e escolher a melhor oferta disponível.

**Critérios de Aceitação:**

1. O sistema deve permitir que o gestor selecione um produto para ver todas as cotações relacionadas.
2. A consulta deve retornar resultados rapidamente.
3. Os resultados devem incluir preço, data da cotação, fornecedor e meio de contato.
4. Deve ser possível filtrar os resultados por data, preço ou fornecedor.
5. A funcionalidade deve ser acessível na versão web e móvel.

### 6. Requisição de Compras

**História de Usuário:**

- Como colaborador,
- Quero fazer requisições de compras no sistema,
- Para que eu possa solicitar compras para produtos necessários.

**Critérios de Aceitação:**

1. O colaborador deve poder fazer requisições de compras e acompanhar seu estado.
2. O administrador pode mudar o estado da requisição conforme a cotação for recebida.
3. As requisições podem ser ordenadas por data.

## Scripts Disponíveis

No diretório do projeto, você pode executar:

### `npm start`

Executa o aplicativo no modo de desenvolvimento.\
Abra [http://localhost:3000](http://localhost:3000) para visualizá-lo no navegador.

A página será recarregada quando você fizer alterações.\
Você também verá quaisquer erros de lint no console.
