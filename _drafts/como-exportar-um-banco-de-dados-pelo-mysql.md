---
layout: post
date: 2021-06-06 11:56:17 -0300
last_modified_at: 
color: "#222222"
title: Como exportar um banco de dados pelo Mysql?
image: "/uploads/mysql.png"
excerpt: ''
categories:
- mysql
sitemap: true

---
O comando para exportação do banco de dados MYSQL é o `mysqldump`.
Caso este comando não esteja disponível no seu Linux, você precisa instalar a biblioteca `mysql-client`, conforme o exemplo abaixo:

```bash
sudo apt-get install mysql-client
```

```bash
mysqldump -u root -p nome_do_banco
```