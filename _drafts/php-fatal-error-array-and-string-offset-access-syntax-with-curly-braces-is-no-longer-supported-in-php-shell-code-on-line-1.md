---
layout: post
color: "#5772D4"
title: 'PHP Fatal error:  Array and string offset access syntax with curly braces
  is no longer supported in php shell code on line 1'
date: 2021-02-22 00:00:00 -0300
categories:
- php
sitemap: false
image: ''
excerpt: ''

---
## Erro

```text
PHP Fatal error:  Array and string offset access syntax with curly braces is no longer supported
```

## Causa

A partir da versão 7.4 o PHP tornou _depretacted_ o acesso a `string` e `array` via _curly brackets_ (colchetes)

## Solução

Você precisa atualizar seu código. Atualize:

```php
$string = 'Teste';
echo $string{0};
```

Para:

```php
$string[0]
```