# Projeto Entrega SOS

## Objetivo

O objetivo deste projeto é fornecer aos pequenos comerciantes uma plataforma de venda gratuita durante o período de crise do Corona Virus, para que os mesmos possam continuar ofertando produtos/serviços de maneira remota e contínua.

## Instruções para executar o projeto

* Instale o nodejs (versão 10 mínima)
* Instale o cliente angular mais recente:
  ```
  npm install -g @angular/cli
  ```
* No diretório da aplicação, instale todos os pacotes e dependências:
  ```
  npm install
  ```
* Após isto, basta rodar o comando para rodar em modo de desenvolvimento:
  ```
  npm start
  ```

## Imagem Docker
Para este projeto, foi criado um ```Dockerfile``` que servirá de base para a publicação em qualquer servidor que suporte containers dockers.

### Compilação
Com o comando abaixo, compilamos a nossa imagem docker e deixamos pronta para executar.
```
docker build -t entregasos/frontend:$VERSAO .
```

### Testando a imagem

Podemos testar a imagem, rodando o comando abaixo:
```
docker run -d -p 8080:80 entregasos/frontend:$VERSAO

```
E depois acessar o navegador em http://localhost:8080/ para testar.

### Publicação
A imagem docker será publicada no DockerHub, para facilitar a publicação
```
docker push entregasos/frontend:$VERSAO
```

### API
```
https://api-entrega-sos.herokuapp.com/v1/empresas
```
