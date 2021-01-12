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


Código:

No PHP, podemos usar a função `session_set_cookie_params`. Ela define parâmetros do cookie utilizado na sessão. O 

Is necessary calling this function before `session_start()` call.

Try this:

    $lifetime = strtotime('+30 minutes', 0);
    
    session_set_cookie_params($lifetime);
    
    session_start();


> **Nota**: Você precisa chamar `session_set_cookie_params` em cada requisição e antes que `session_start()` seja chamado.

See more in: http://php.net/manual/function.session-set-cookie-params.php