---
layout: post
last_modified_at: 2021-04-30 22:59:44 -0300
title: "Could not open input file: artisan"
image: ''
date: 2021-06-29 22:30:00 -0300
excerpt: 'Veja neste tutorial como resolver o erro "Could not open input file: artisan"'
categories:
- artisan
- laravel
- PHP
sitemap: true
max_posts: 3
---


É muito comum em um projeto Laravel ocorrer o seguinte erro:

```bash
$ php artisan 
# Could not open input file: artisan
````

Existem possíveis causas para ocorrer isso:

## O diretório do projeto está incorreto
Talvez você não esteja no diretório correto do projeto. O `artisan` nada mais é do que um script PHP, sem extensão, que fica presente dentro da pasta raiz de um projeto Laravel.
Entre na pasta do projeto e em seguida execute o `php artisan`.

```bash
$ cd projeto-laravel
$ php artisan 
```

## O arquivo artisan não existe no projeto
Você deletou acidentalmente o arquivo `artisan` da raiz do seu projeto. Neste caso, você pode procurar o arquivo `artisan` no [repositório oficial do Laravel](https://github.com/laravel/laravel/blob/master/artisan)  e copiá-lo para seu projeto.

Exemplo:

```bash
$ cd projeto-laravel
$ wget https://raw.githubusercontent.com/laravel/laravel/master/artisan
```

## Permissão de execução no arquivo

Talvez, o arquivo `artisan` não tenha permissão para execução. Você pode resolver isso através do comando `chmod`. 

Exemplo:

```bash
$ chmod +x artisan
```

Ou

```bash
$ chmod 777 artisan
````
