---
layout: post
color: "#222222"
title: Utilizando ngrok com Laravel
date: 2021-03-04 00:00:00 -0300
categories:
- laravel
sitemap: false
image: ''
excerpt: ''

---

## Instalando o ngrok

## Configurando as urls do Laravel 

```bash
php artisan serve
```

```bash
ngrok http 8000
```

Edite seu arquivo `.env` e modifique a variável `APP_URL`
```env
APP_URL=https://seu-hash.ngrok.io/
```

```php
\URL::forceRootUrl(config('app.url'));
```