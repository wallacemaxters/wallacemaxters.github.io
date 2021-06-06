---
layout: post
title: Como importar um banco de dados MYSQL pela linha de comando?
date: 2021-06-05 22:18:35 -0300
categories:
- bash
- mysql
sitemap: true
image: "/uploads/mysql.png"
excerpt: Cansado de usar PHPMyAdmin, Mysql Workbench, ou outras ferramentas, para
  importar um dump para seu banco de dados? Aprenda a fazer tudo isso pela linha de
  comando neste tutorial!

---
É muito comum a utilização de ferramentas, como PHPMyAdmin ou Mysql Workbench,  para importar um dump para uma base de dados nova. Porém existe uma maneira mais simples e rápida, para quem é fã de fazer tudo pela linha de comando.

## Criando um  banco de dados pela linha de comando

Primeiramente, se você ainda não tem um banco de dados vazio para o qual deseja fazer a importação de um arquivo Sql, você pode simplesmente criá-lo através do seguinte comando abaixo:

```bash
mysql -u usuario -p -e 'create database nome_do_banco'
```
Os argumentos passados acima são os seguintes:

A opção `-u` informa o usuário da conexão. 

A opção `-p` solicita a digitação de senha após a confirmação do comando.

A opção `-e` executa um comando SQL e em seguida encerra a conexão com o MYSQL.

## Importando um dump para o banco de dados através da linha de comando

Em seguida, você pode simplesmente executar a seguinte linha para realizar a importação.

```bash
mysql -u usuario -p nome_do_banco < ~/caminho/do/dump.sql
```

No comando executado acima, estamos especificando que todos os comandos SQLs presentes em `dump.sql` serão executados no banco de dados `nome_do_banco`. 

> **NOTA**: Se o seu dump for muito grande, talvez você precise esperar algum tempo até que a importação seja concluída.

## Verificando os dados importados pela linha de comando

Para verificar se os dados foram importados, basta executar o seguinte comando:

```bash
 mysql -u usuario -p -e 'use nome_do_banco; show tables;'
```

O resultado será parecido com esse:

```text
+-------------------------------------+
| Tables_in_nome_do_banco             |
+-------------------------------------+
| tabela_1                            |
| tabela_2                            | 
| tabela_3                            |
| tabela_4                            |
+-------------------------------------+
```