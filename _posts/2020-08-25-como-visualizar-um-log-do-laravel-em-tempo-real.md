---
layout: post
title: Como visualizar um log do Laravel em tempo real
date: 2020-08-25 00:00:00 -0300
categories:
- laravel
- log
sitemap: false
image: "/uploads/Laravel.jpg"

---
Muitas vezes é necessário descobrir a origem de um erro que não é visível diretamente na aplicação, por exemplo, quando estamos rodando uma aplicação em produção. Nesse caso, sempre precisamos recorrer a um log de erro para verificar o que está acontecendo na aplicação.

O Laravel por padrão armazena os logs na pasta `storage/logs`.  Se sua aplicação estiver configurada como `single`, dentro desta pasta conterá um arquivo chamado `laravel.log`. Se estiver como `daily`, que é  maneira que costumo mais usar, ela terá o formato `laravel-%Y-%m-%d.log.`

Toda vez que ocorre um erro em produção, o Laravel vai escrever todos os detalhes do erro nesse arquivo. E é com ele que vamos poder acompanhar em tempo real os logs gerados, através de um simples comando: O `tail`.

Esse comando em sistemas Unix tem como finalidade ler o trecho final de algum arquivo.  Quando adicionamos a opção `-f`, além de ler o trecho final de um arquivo, o comando fica rodando, para que toda vez que haja novas linhas as mesmas sejam exibidas imediatamente.

Você basicamente pode fazer algo como:

```bash
tail -f storage/logs/laravel.log
```

Ou

```bash
tail -f storage/logs/laravel-2020-08-25.log
```

Uma boa forma de testar isso, é deixando dois terminais abertos e, após rodar `tail -f`, produzir um erro proposital, como rodar um comando inexistente no `artisan`. Assim:

```bash
php artisan xxx
```

Você verá algo parecido com isso no terminal onde roda o `tail`:

```log
[2020-08-25 14:16:44] local.ERROR: Command "xxx" is not defined. {"exception":"[object] (Symfony\\Component\\Console\\Exception\\CommandNotFoundException(code: 0): Command \"xxx\" is not defined. at /my-directory/vendor/symfony/console/Application.php:576)
```