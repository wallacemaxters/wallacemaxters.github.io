---
layout: post
title: Como definir a senha do root ao instalar o MYSQL 8 no Linux?
date: 2020-12-03 00:29:00 -0200
categories:
- mysql
- linux
sitemap: true
image: "/uploads/mysql.png"
excerpt: Veja como definir a senha do usuário root no Mysql recém-instalado no Linux

---
Já precisei diversas vezes instalar o MYSQL numa distribuição Linux. E a dúvida que sempre rola é sobre como definir uma senha padrão para o usuário `root`.

Quando você acaba de instalar o MYSQL, geralmente você não consegue acessar o banco de dados.

Existem diversos tutoriais na internet ensinando a definir a senha do `root` para contornar esse problema, porém alguns deles chegam a ser complexos, ou as vezes não funciona, dependendo da versão usada.

Eu vou compartilhar a solução que tenho para esse problema. Tive esse problema de não conseguir me conectar ao MYSQL ao instalar a versão `8.0`.

Faça da seguinte forma. Rode o MYSQL com `sudo`. Pelo menos aqui no meu Ubuntu, quando acabo de instalar, é possível acessar o MYSQL sem colocar a senha. Mas só funciona se colocar `sudo`.

Exemplo:

```bash
sudo mysql -u root
```

Em seguida, quando o terminal do Mysql tiver aberto, defina a senha para seu usuário `root`, assim:

```sql
ALTER USER 'root'@'localhost' IDENTIFIED WITH mysql_native_password BY 'sua_senha_aqui'
```

Perfeito! Você já consegue logar no Mysql.

Exemplo:

```bash
mysql -u root -p
Enter password:
```

Ao digitar a senha definida acima, você conseguirá acessar o Mysql normalmente.