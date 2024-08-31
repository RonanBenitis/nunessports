<h1 align="center">Aplicação: Nunes Sports</h1>

![tela inicial preenchida](asset_readme\nunessports_telapreenchida.png)

## Sobre o projeto
Este projeto é um sistema de gerenciamento de produtos vendidos. Ele foi construído utilizando .NET 8.0 no backend e Angular 18.2 no frontend, com SQLite como banco de dados. A escolha do banco de dados em SQLite tem como objetivo facilitar na distribuição a quem for testar a aplicação, porém, comenda-se a utilização de ferramentas mais robustas como PostgreSQL.

## Tecnologias Utilizadas
<table>
  <thead align="center">
    <tr border: none;>
      <td><b>BACKEND</b></td>
      <td><b>FRONTEND</b></td>
      <td><b>BANCO DE DADOS</b></td>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>
        <img alt="" src="https://img.shields.io/badge/dotnet-sdk8.0-black?style=for-the-badge&logo=dotnet&logoColor=white&labelColor=blue&color=black"/>
      </td>
      <td>
        <img alt="" src="https://img.shields.io/badge/angular-18.2-black?style=for-the-badge&logo=angular&logoColor=white&labelColor=red&color=black"/>
      </td>
      <td>
        <img alt="" src="https://img.shields.io/badge/sqlite-black?style=for-the-badge&logo=sqlite&logoColor=white&labelColor=%236cb2e4&color=%236cb2e4"/>
      </td>
    </tr>
  </tbody>
</table>

## Pré-requisitos
Para rodar este projeto, você precisará ter instalado:

- [.NET 8.0 SDK](https://dotnet.microsoft.com/pt-br/download/dotnet/8.0)
- [Node.js (inclui o npm)](https://nodejs.org/pt)
- Angular CLI
  - Rode no terminal o comando `npm install -g @angular/cli`

## Configuração do Ambiente e rodando aplicação
_Os comandos estarão no padrão CMD_
1. No terminal, clone o repositório e navegue até o diretório da aplicação:
```bash
git clone https://github.com/RonanBenitis/nunessports.git
cd nunessports
cd _NunesSportsApp
```

### Configurando e incializando Backend (.NET)
_Partindo do diretório raiz da aplicação (`_NunesSportsApp`)_
1. Acessando o diretório do banco de dados:
```bash
cd NunesSports
```

2. Restaure as ferramentas do .NET (incluindo dotnet-ef):
```bash
dotnet restore
dotnet tool restore
```

3. Inicialize o servidor de banco de dados:
```bash
dotnet run --launch-profile https
```
O backend estará disponível em [https://localhost:7196](https://localhost:7196)
- Atenção, protoclo HTTPS

### Configurando inicializando Frontend (Angular)
_Partindo do diretório raiz da aplicação (`_NunesSportsApp`)_ 
1. Acessando o diretório do banco de dados:
```bash
cd angular-nunessports
```
2. Instale as dependências do projeto Angular
```bash
npm install
```
3. Execute o servidor de desenvolvimento Angular:
```bash
ng serve --open
```
O frontend estará disponível em [http://localhost:4200](http://localhost:4200/).
- _Atenção, protocolo HTTP_