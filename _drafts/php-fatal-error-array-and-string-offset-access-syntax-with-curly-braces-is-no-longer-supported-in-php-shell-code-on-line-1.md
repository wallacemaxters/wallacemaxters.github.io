---
layout: post
color: "#222222"
title: 'PHP Fatal error:  Array and string offset access syntax with curly braces
  is no longer supported in php shell code on line 1'
date: 2021-02-22 00:00:00 -0300
categories: []
sitemap: false
image: ''
excerpt: ''

---
## Erro

```text
PHP Fatal error:  Array and string offset access syntax with curly braces is no longer supported
```

## Causa
A partir da versão 7.4 o PHP tornou *depretacted* o acesso a `string` e `array` via *curly brackets* (colchetes)

## Solução

Altere:

```php
$string = 'Teste';
echo $string{0};
```

Para:
```php
$string[0]
```