---
layout: post
date: 2021-06-23 22:12:37 -0300
last_modified_at: 2021-06-23 22:12:37 -0300
color: "#222222"
title: como saber a versão do Composer?
image: "/uploads/composer.jpg"
excerpt: como saber a versão do Composer? Basta utilizar o comando "composer -V"
categories:
- composer
- PHP
sitemap: true

---
Para descobrir a versão do Composer instalada na sua máquina, basta utilizar o argumento `-V` ou `--version` junto ao comando `composer`.

Exemplo:

```bash
composer -V
```

Ou

```bash
composer --version
```

  
Se você não estiver usando o Composer globalmente, utilizando o arquivo `composer.phar`, basta fazer da seguinte forma:

```bash
php composer.phar -V 
```

A saída será algo parecido com isso:

    Composer version 2.1.3 2021-06-09 16:31:20
    

Além disso, se você simplesmente executar `composer` ou `php composer.phar`, poderá visualizar a versão utilizar nas primeiras linhas de saída: 
 ```
   ______
  / ____/___  ____ ___  ____  ____  ________  _____
 / /   / __ \/ __ `__ \/ __ \/ __ \/ ___/ _ \/ ___/
/ /___/ /_/ / / / / / / /_/ / /_/ (__  )  __/ /
\____/\____/_/ /_/ /_/ .___/\____/____/\___/_/
                    /_/
Composer version 2.1.3 2021-06-09 16:31:20
```