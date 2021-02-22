---
layout: post
color: "#5772D4"
title: 'Como resolver o erro: "Array and string offset access syntax with curly braces
  is no longer supported"?'
date: 2021-02-22 00:00:00 -0300
categories:
- php
sitemap: false
image: ''
excerpt: Na versão 8 do PHP, você pode receber o erro "Array and string offset access
  syntax with curly braces is no longer supported". Isso ocorre porque o suporte a
  sintaxe de acesso aos índices de arrays ou strings foi removido.

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