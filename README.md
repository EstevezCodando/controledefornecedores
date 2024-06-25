# Controle de Fornecedores

Este projeto é um sistema de Controle de Fornecedores que permite o cadastro de fornecedores, o contato do fornecedor, os produtos fornecidos por cada fornecedor, as cotações de preços e consultas dessas cotações. O projeto foi inicializado com [Create React App](https://github.com/facebook/create-react-app).

## Funcionalidades

- **Cadastro de Fornecedores**: Adicione novos fornecedores ao sistema.
- **Contato do Fornecedor**: Mantenha informações de contato atualizadas para cada fornecedor.
- **Produtos do Fornecedor**: Cadastre e gerencie produtos fornecidos por cada fornecedor.
- **Cotações**: Registre cotações de preços para produtos e consulte cotações existentes.
- **Consultas de Cotações**: Pesquise cotações por produto e fornecedor.

## Histórias de Usuários

### 1. Cadastro de Fornecedores

**História de Usuário:**

- Como gerente de compras,
- Quero cadastrar novos fornecedores no sistema,
- Para que eu possa manter um registro atualizado de todos os fornecedores e suas informações de contato.

**Critérios de Aceitação:**

1. O sistema deve permitir o cadastro de fornecedores com campos obrigatórios como nome, CNPJ, endereço, e contato principal.
2. Deve ser possível editar as informações de um fornecedor já cadastrado.
3. O sistema deve validar o CNPJ para garantir que é válido.
4. Deve haver uma lista de fornecedores cadastrados com opção de busca por nome ou CNPJ.

### 2. Cadastro de Contatos

**História de Usuário:**

- Como gerente de compras,
- Quero cadastrar contatos (pessoas de contato) ligados a um fornecedor,
- Para que eu possa ter acesso rápido e fácil aos responsáveis de cada fornecedor para negociações e esclarecimentos.

**Critérios de Aceitação:**

1. O sistema deve permitir o cadastro de contatos com campos obrigatórios como nome, telefone, e email.
2. Cada contato deve estar associado a um fornecedor específico.
3. Deve ser possível editar as informações de um contato já cadastrado.
4. A lista de contatos deve ser exibida na página do fornecedor associado.

### 3. Cadastro de Produtos

**História de Usuário:**

- Como gerente de compras,
- Quero cadastrar novos produtos no sistema,
- Para que eu possa gerenciar o inventário e as cotações de cada produto de maneira organizada.

**Critérios de Aceitação:**

1. O sistema deve permitir o cadastro de produtos com campos obrigatórios como nome, descrição, categoria, e especificações técnicas.
2. Deve ser possível editar as informações de um produto já cadastrado.
3. O sistema deve validar a unicidade do nome do produto para evitar duplicatas.
4. Deve haver uma lista de produtos cadastrados com opção de busca por nome ou categoria.

### 4. Cadastro de Cotações

**História de Usuário:**

- Como gerente de compras,
- Quero cadastrar cotações ligadas a produtos com data da cotação e preço,
- Para que eu possa comparar diferentes ofertas e tomar decisões informadas sobre as compras.

**Critérios de Aceitação:**

1. O sistema deve permitir o cadastro de cotações com campos obrigatórios como produto, fornecedor, data da cotação, preço, e meio de comunicação utilizado.
2. Deve ser possível editar as informações de uma cotação já cadastrada.
3. As cotações devem ser associadas a produtos específicos.
4. Deve haver uma lista de cotações cadastradas com opção de busca por produto ou fornecedor.

### 5. Consulta de Cotações por Produto

**História de Usuário:**

- Como gerente de compras,
- Quero poder consultar rapidamente todas as cotações para um produto específico,
- Para que possa comparar e escolher a melhor oferta disponível sem perder tempo.

**Critérios de Aceitação:**

1. O sistema deve permitir que o gestor de compras selecione um produto para ver todas as cotações relacionadas.
2. A consulta deve retornar resultados em menos de 5 segundos.
3. Os resultados devem incluir o preço, data da cotação, fornecedor, e a forma de contato utilizada.
4. Deve ser possível filtrar os resultados por data, preço, ou fornecedor.
5. A funcionalidade deve ser acessível tanto na versão web quanto móvel.

## Scripts Disponíveis

No diretório do projeto, você pode executar:

### `npm start`

Executa o aplicativo no modo de desenvolvimento.\
Abra [http://localhost:3000](http://localhost:3000) para visualizá-lo no navegador.

A página será recarregada quando você fizer alterações.\
Você também verá quaisquer erros de lint no console.

### `npm test`

Inicia o executor de testes no modo interativo de observação.\
Veja a seção sobre [executando testes](https://facebook.github.io/create-react-app/docs/running-tests) para mais informações.

### `npm run build`

Compila o aplicativo para produção na pasta `build`.\
Ele agrupa corretamente o React no modo de produção e otimiza a compilação para o melhor desempenho.

A compilação é minificada e os nomes dos arquivos incluem os hashes.\
Seu aplicativo está pronto para ser implantado!

Veja a seção sobre [implantação](https://facebook.github.io/create-react-app/docs/deployment) para mais informações.
