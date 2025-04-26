# Documentação do Sistema de Gerenciamento de Alunos de TCC

## Visão Geral
Este sistema foi desenvolvido com o objetivo de facilitar o gerenciamento de alunos que participam de trabalhos de conclusão de curso (TCC), especialmente em contextos onde o uso de ferramentas como o Microsoft Excel está limitado. A motivação principal para a criação desta aplicação surgiu da necessidade de organizar e compartilhar informações dos alunos de maneira eficiente, já que o Excel Online estava indisponível devido à falta de espaço no OneDrive e a versão desktop do Office não estava instalada.

A aplicação supre totalmente essa carência, oferecendo uma solução leve, rápida e funcional para cadastrar, filtrar, editar, importar/exportar dados e visualizar estatísticas dos alunos que realizaram a devolutiva de mensagens, facilitando a comunicação com a professora responsável.

A aplicação é composta por dois principais módulos:
- Backend: Desenvolvido em Java com Spring Boot
- Frontend: Desenvolvido em Angular 19 com standalone components

---

## Backend - https://github.com/ThaisScheiner/estagio-tcc-back-end

### Tecnologias Utilizadas
- **Java 17**
- **Spring Boot 3**
- **Spring Web**
- **Spring Data JPA**
- **H2 Database (em memória)**
- **Apache POI** (para leitura/escrita de arquivos Excel)
- **Lombok** (para reduzir boilerplate)
- **CORS configurado** para permitir acesso ao frontend Angular

### Estrutura de Entidades
- **Aluno**: representa um aluno e possui os atributos: `ra`, `ano`, `nome`, `equipe`, `orientador`, `tema`, `observacoes`, `disciplina`

### Principais Funcionalidades
- **CRUD de Alunos**: endpoints para criação, leitura, atualização e exclusão
- **Filtro por nome, equipe e ano**
- **Importação de Excel**: substitui todos os dados existentes por novos registros do Excel
- **Exportação para Excel**: gera planilha com coloração por equipe
- **Estatísticas**: endpoint que retorna dados agregados para construção de gráficos

### Endpoints Principais
- `GET /alunos`
- `POST /alunos`
- `PUT /alunos/{ra}`
- `DELETE /alunos/{ra}`
- `GET /alunos/nome/{nome}`
- `GET /alunos/equipe/{equipe}`
- `GET /alunos/ano/{ano}`
- `POST /alunos/importar`
- `GET /alunos/exportar`
- `GET /alunos/estatisticas`

---

## Frontend

### Tecnologias Utilizadas
- **Angular 19**
- **Standalone Components** (sem NgModules)
- **TypeScript**
- **RxJS** (para gerenciamento reativo de dados)
- **Bootstrap 5** (para estilo)
- **HTML5/CSS3/SCSS**

### Estrutura de Componentes
- `alunos-list`: componente principal com CRUD, filtros, ordenação e formulário
- `upload`: importa arquivos Excel
- `estatisticas`: exibe gráficos com dados agregados

### Funcionalidades
- **Listagem de alunos** com opção de ordenação clicando nos cabeçalhos
- **Formulário de inserção e edição**:
  - RA e Ano ficam em modo somente leitura durante edição com fundo cinza escuro para indicar a restrição
  - Ano calculado automaticamente a partir do RA
- **Filtros** por nome, equipe e ano
- **Mensagens de sucesso e erro** com `window.alert`, como "Aluno salvo com sucesso" ou mensagens de falha
- **Tabela com dados e ações de editar/excluir**
- **Destaque visual para arquivos Excel importados**

### Integração com Backend
Todos os dados são obtidos dinamicamente por meio de chamadas HTTP aos endpoints Spring Boot. Os dados atualizados automaticamente são propagados com `Subject` via serviço (`alunoService`).

---

## Considerações Finais
Este sistema foi planejado para ser leve, funcional e extensível. Ele resolve de forma prática um problema real enfrentado pelo autor, eliminando a dependência de software de planilhas local e permitindo manter e compartilhar dados organizados de forma eficaz com a professora.

Com a separação clara entre frontend e backend, é fácil evoluir para novos recursos como autenticação, gerenciamento de professores e equipes.

### Possíveis melhorias futuras:
- Substituir `alert()` por um sistema de `toast`
- Adicionar autenticação JWT
- Persistir banco em PostgreSQL ou MySQL
- Testes unitários (JUnit/Angular)
- Deploy em nuvem (Render/Heroku/Vercel)

