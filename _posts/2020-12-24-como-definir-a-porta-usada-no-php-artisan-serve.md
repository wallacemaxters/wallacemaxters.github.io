---
layout: post
title: Como mudar a porta do comando php artisan serve?
date: 2020-12-24T01:00:00.000-02:00
categories:
- laravel
- php
sitemap: true
image: "/uploads/laravel-terminal.png"
excerpt: Nesse tutorial, você vai aprender como executar o comando php artisan server
  em uma porta diferente.

---
## Introdução

Quando executamos o comando `php artisan serve`, ele inicia o servidor embutido do PHP para executar a aplicação Laravel. Por padrão, o `artisan serve` utiliza a porta `8000`. Porém, as vezes, pelo fato de a porta já estar ocupada ou por simples conveniência, precisamos que o `artisan serve` seja executado em uma porta específica.

## Mudando a porta do artisan serve

O comando `artisan serve` aceita o parâmetro `--port`. Basta adicionar a porta desejada para rodar o comando.

Exemplo:

```bash
php artisan serve --port=9000
```

Ao fazer isso, a sua aplicação estará disponível em `http://localhost:9000`.

### Como executar o artisan serve na porta 80?

Se você for usuário de uma distribuição Linux e tentar usar a opção `--port`, em portas com valores abaixo de `1024`, você precisa adicionar `sudo` para executar o comando.

Por exemplo, se rodar o `artisan serve` na porta 80, precisa adicionar o `sudo`.

Veja:

```bash
sudo php artisan serve --port=80
```

Se você não utilizar o `sudo`, poderá receber um erro de permissão, conforme explicado no artigo [Como resolver o problema de permissão ao rodar o artisan na porta 80](/blog/2020/12/24/como-resolver-o-problema-de-permissao-ao-rodar-o-artisan-na-porta-80).

### Outras dicas

Se quer saber outras opções disponíveis no comando `artisan serve`, você pode ler [Truques com o comando PHP ARTISAN SERVE](/blog/2019/08/17/truques-com-o-comando-php-artisan-serve) publicado aqui.