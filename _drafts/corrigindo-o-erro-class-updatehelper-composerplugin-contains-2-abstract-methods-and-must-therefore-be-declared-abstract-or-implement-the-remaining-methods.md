---
layout: post
last_modified_at: 2021-06-02 02:26:07 +0000
color: "#222222"
title: Corrigindo o erro "Class UpdateHelper\ComposerPlugin contains 2 abstract methods
  and must therefore be declared abstract or implement the remaining methods"
image: "/uploads/composer.jpg"
date: 2021-06-02 02:26:00 +0000
excerpt: ''
categories:
- composer
- php
sitemap: true

---
Ao tentar executar o comando `composer install`, você pode ser surpreendido com o seguinte erro:

> Class UpdateHelper\\ComposerPlugin contains 2 abstract methods and must therefore be declared abstract or implement the remaining methods

Para solucionar isso, basta executar os seguintes comandos:

```bash
rm -rf vendor/
rm composer.lock
composer install
```