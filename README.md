# realidade-virtual

# Meu Projeto

Este projeto contém um backend e um frontend que precisam ser configurados e executados.

## Pré-requisitos

Certifique-se de ter os seguintes softwares instalados em sua máquina:

- [Node.js](https://nodejs.org/) (inclui o npm)
- [Git](https://git-scm.com/)

## Como clonar o repositório

Primeiro, clone o repositório para sua máquina local usando o Git:

```bash
git clone https://github.com/seu-usuario/seu-repositorio.git
cd seu-repositorio
````
Configuração e Execução
Este projeto possui dois diretórios principais: backend e frontend. Vamos configurar e executar ambos.

1. Backend
Navegue até o diretório do backend e instale as dependências:

```bash
cd backend
npm install
````
Para iniciar o servidor backend:
```bash
npm run dev
````
2. Frontend
Em outra janela do terminal, navegue até o diretório do frontend e instale as dependências:
```bash
cd ../frontend
npm install
````
Para iniciar o servidor frontend:

```bash
npm run dev
````
#Executando ambos os servidores com um script
Você também pode usar um script .bat para instalar as dependências e iniciar ambos os servidores automaticamente.

Certifique-se de que o arquivo paths.txt contém os caminhos corretos para os diretórios backend e frontend:

C:\caminho\para\seu\projeto\backend
C:\caminho\para\seu\projeto\frontend
Execute o script start_projects.bat para instalar as dependências e iniciar ambos os servidores:
Inicializador.bat

Estrutura do Projeto:
````plain-text
seu-projeto/
│
├── backend/
│   ├── node_modules/
│   ├── src/
│   ├── package.json
│   └── ...
│
├── frontend/
│   ├── node_modules/
│   ├── src/
│   ├── package.json
│   └── ...
│
├── paths.txt
├── Inicializador.bat
└── README.md

