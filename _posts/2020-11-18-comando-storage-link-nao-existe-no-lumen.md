---
layout: post
title: Comando "storage link" não existe no Lumen
date: 2020-11-18T01:00:00.000-02:00
categories:
- lumen
- PHP
sitemap: false
image: "/uploads/lumen-2.png"
excerpt: O comando "php storage link" não existe no micro framework Lumen? Aprenda
  a resolver esse problema!

---
O Lumen é um microframework baseado no Laravel. E por ser um microframework, ele tem menos recursos, como demonstrei [nesse artigo](blog/2020/11/18/por-que-o-comando-artisan-serve-nao-funciona-no-lumen-framework).

Ao tentar rodar o comando `php artisan storage:link` no Lumen, é comum receber esse erro:

```
There are no commands defined in the "storage" namespace.
```

Esse comando tem como finalidade de criar um link simbólico `public/storage` apontando para pasta `storage/app/public`.

Sabendo disso, podemos contornar essa situação através do comando `ln`.

Basta fazer o seguinte na pasta do projeto Lumen:

```bash
cd public
ln -s ../storage/app/public storage
```

Isso criará uma "pasta" chamada storage dentro da pasta public. 

Para ver se está tudo correto, basta executar:

```bash
cd projeto-lumen/public
readlink storage
```


A saída deverá ser algo parecido com:
```bash
...storage/app/public
```