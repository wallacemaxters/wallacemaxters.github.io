---
layout: post
color: "#222222"
title: Como responder com JSON em PHP?
date: 2021-03-02 00:00:00 -0300
categories:
- PHP
- json
sitemap: false
image: ''
excerpt: ''

---
```php
header('Content-Type: application/json');
$resultado = [
'nome' => 'Maxters',
];
echo json_encode($resultado);
```