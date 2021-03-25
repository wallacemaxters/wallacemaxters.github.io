---
layout: post
color: "#222222"
title: Como formatar horas no PHP?
date: 2021-03-25 00:00:00 -0300
categories:
- php
sitemap: true
image: "/uploads/covers/php.png"
excerpt: Aprenda a formatar as horas com PHP

---
Para exibir a hora atual no PHP ou formatar uma data específica, basta utilizar a seguinte chamada:

## Exibindo a hora atual formatada pelo PHP

```php
date('H:i:s')
```

ou 

```php
$date = new Datetime();
echo $date->format('H:i:s')
```