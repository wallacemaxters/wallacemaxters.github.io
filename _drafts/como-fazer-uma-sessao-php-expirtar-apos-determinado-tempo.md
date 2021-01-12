---
layout: post
title: Como fazer uma sessão PHP expirtar após determinado tempo?
date: 2021-01-11 17:59:00 -0200
categories:
- php
sitemap: true
image: "/uploads/covers/php.png"
excerpt: ''

---


No PHP, podemos usar a função `session_set_cookie_params`. Ela define parâmetros do cookie utilizado na sessão. 
Essa função precisa ser chamada antes que `session_start()` seja chamada.

Por exemplo, se você quiser definir que a sessão dure apenas 10 minutos, você pode fazer da seguinte forma:

```php
$lifetime = 10 * 60;

session_set_cookie_params($lifetime);

session_start();
 ```
 
 Se desejar usar outros valores, sugiro utilizar a função `strtotime`, definindo `0` no segundo argumento. Ela facilita bastante a definição de tempo.
 
 