---
layout: post
date: 2021-06-06 11:56:17 -0300
last_modified_at: 
color: "#222222"
title: Como exportar um banco de dados Mysql pela linha de comando?
image: "/uploads/mysql.png"
excerpt: ''
categories:
- bash
- mysql
sitemap: true

---
O comando para exportação do banco de dados MYSQL é o `mysqldump`.

## Instalando o mysql-client

Caso este comando não esteja disponível no seu Linux, você precisa instalar a biblioteca `mysql-client`, conforme o exemplo abaixo:

```bash
sudo apt-get install mysql-client
```

## Exportando o banco de dados pela linha de comando

Para exportar o banco de dados, execute o seguinte comando:

```bash
mysqldump -u root -p nome_do_banco
```

O argumento `-u` informa o usuário do banco de dados e o `-p` solicita a digitação da senha após a confirmação do comando. O último argumento é o banco de dados que vai ser exportado.

O comando vai gerar uma saída na própria tela, mas precisamos que essa saída seja redirecionada para um arquivo. 

Para fazermos isso, basta utilizamos o operador de redirecionamento de saída `>`.

Veja:

```bash
mysqldump -u root -p nome_do_banco > dump.sql
```

Após fazer isso, o arquivo `dump.sql` será criado no diretório atual com todos os dados do seu banco.
