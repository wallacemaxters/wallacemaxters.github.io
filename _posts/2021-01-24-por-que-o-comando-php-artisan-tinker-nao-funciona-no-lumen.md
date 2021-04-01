---
layout: post
title: Por que o comando 'php artisan tinker' não funciona no Lumen?
date: 2021-01-24 02:24:00 -0200
categories:
- artisan
- lumen
sitemap: true
image: "/uploads/lumen.png"
excerpt: Aprenda a resolver o erro 'Command "tinker" is not defined' no Lumen.

---
As vezes estamos acostumado a utilizar os comandos do Laravel e, de repente, sentimos falta de algum deles no Lumen.
O `php artisan tinker` é um deles.

Quando tentamos rodar esse comando no Lumen, é comum receber o seguinte erro:

 > Command "tinker" is not defined

Pelo fato de o Lumen ser um microframework, alguns comandos não estão disponíveis, mas você pode adicioná-los manualmente. 

## Instalando o Tinker no Lumen

Para instalar o comando `php artisan tinker`, basta utilizar o Composer para fazer a instalação.

```bash
composer require laravel/tinker
```

Após a instalação concluída, vá até o arquivo `bootstrap/app.php` e adicione a seguinte linha:

```php
$app->register(Laravel\Tinker\TinkerServiceProvider::class);
```

Feito isso, o comando já estará disponivel.

> **NOTA:** Se você estiver utilizando uma versão mais antiga do Lumen, como a versão `5.*`, pode ser necessário informar a versão do Tinker. Basta utilizar `composer require laravel/tinker 1.*`, por exemplo.