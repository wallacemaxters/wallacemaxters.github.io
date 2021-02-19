---
layout: post
title: Problemas de permissão ao executar o "php artisan serve" na porta 80
date: 2020-12-24T15:05:00.000-02:00
categories:
- laravel
- linux
- php
sitemap: true
image: "/uploads/laravel-terminal.png"
excerpt: O linux não permite a execução do "php artisan serve"  em algumas portas
  com valores abaixo de 1024, como no caso da famosa porta 80, por exemplo. Aprenda
  a solucionar esse problema.

---
## Introdução

O `artisan serve` tem como finalidade rodar o servidor embutido para uma aplicação que utiliza o framework Laravel. Eu já ensinei aqui no blog como [Rodar o artisan serve em uma porta específica](/blog/2020/12/24/como-definir-a-porta-usada-no-php-artisan-serve).

As vezes é necessário executar o `php artisan server` em uma porta específica, como a porta `80` e afins, porém alguns problemas podem surgir.

## O problema

Em distribuições Linux, costuma acontecer um bloqueio ao tentar rodar o `artisan serve` na porta `80`.

Exemplo, ao rodar o comando `php artisan serve --port=80`, recebemos o seguinte erro:

> \[Thu Dec 24 14:24:07 2020\] Failed to listen on 127.0.0.1:80 (reason: Permission denied).

Isso acontece porque, no Linux, somente o usuário `root` pode abrir conexões da porta `1` até `1024`.

## Solução

Para resolver esse problema, basta utilizar o `sudo` ao rodar o comando.

Assim:

```bash
sudo php artisan serve --port=80
```

### Outras dicas

Existem algumas opções disponíveis ao rodar o comando `artisan serve`. Você pode conferir alguns truques [aqui](/blog/2019/08/17/truques-com-o-comando-php-artisan-serve).