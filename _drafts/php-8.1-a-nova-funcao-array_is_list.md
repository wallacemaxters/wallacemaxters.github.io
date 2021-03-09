---
layout: post
color: "#222222"
title: 'PHP 8.1: A nova função array_is_list'
date: 2021-03-09 00:00:00 -0300
categories:
- php
- php8.1
sitemap: true
image: "/uploads/covers/php.png"
excerpt: ''

---
O PHP 8.1 traz uma nova função `array_is_list`, que retorna se um determinado array contém chaves inteiras sequenciais começando em 0.

Em outras palavras, esta função retorna `true` se o `array`  testado for uma lista de valores. Ou seja,  um `array` cuja todas as chaves são `int` ,  que comecem do número `0` e sem "pulos" entre eles.

```php
array_is_list([]); // true
array_is_list([1, 2, 3]); // true
array_is_list(['uva', 2, 3]); // true
array_is_list(['banana', 'maçã']); // true
array_is_list([0 => 'morango', 'pêra']); // true
array_is_list([0 => 'limão', 1 => 'maracujá']); // true
```

Qualquer `array` com chaves, não começando de zero ou qualquer matriz  que não possua todas as chaves como inteiros em ordem sequencial,  serão avaliados como `false`.

Veja:

```php
array_is_list([1 => 'maçã', 'uva']); // false
array_is_list([0 => 'zero', 2 => 'dois']); // false
array_is_list([0 => 'zero', 'nome' => 'Maxters']); // false
array_is_list([1 => 'limão', 0 => 'pêra']); // false
```