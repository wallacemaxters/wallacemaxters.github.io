---
layout: post
title: Como definir a porta usada no php artisan serve?
date: 2020-12-24 01:00:00 -0200
categories:
- laravel
sitemap: true
image: "/uploads/laravel-terminal.png"
excerpt: Aprenda como rodar o php artisan serve em uma porta específica.

---
Quando rodamos o comando `php artisan serve`, ele inicia o servidor embutido do PHP para rodar a aplicação Laravel. Por padrão, o `artisan serve` utiliza a porta `8000`. Porém, as vezes, por questão da porta já estar ocupada ou por simples convenciência, precisamos que a aplicação rode em outra porta.


## Mudando a porta do artisan serve

O comando `artisan serve` aceita o parâmetro `--port`. Basta adicionar a porta desejada para rodar o comando.

Exemplo:

```bash
php artisan serve --port=9000
```

Ao fazer isso, a sua aplicação estará disponível em `http://localhost:9000`.

Se quer saber outras opções disponíveis no comando `artisan serve`, você pode ler [Truques com o comando PHP ARTISAN SERVE](/blog/2019/08/17/truques-com-o-comando-php-artisan-serve) publicado aqui.