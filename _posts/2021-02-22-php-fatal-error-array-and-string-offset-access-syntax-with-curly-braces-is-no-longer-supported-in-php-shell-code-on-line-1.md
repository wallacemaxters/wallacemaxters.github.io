---
layout: post
color: "#5772D4"
title: 'Como resolver o erro: "Array and string offset access syntax with curly braces
  is no longer supported"?'
date: 2021-02-23 09:15:00 -0300
categories:
- php
sitemap: true
image: "/uploads/covers/php.png"
excerpt: Na versão 8 do PHP, você pode receber o erro "Array and string offset access
  syntax with curly braces is no longer supported". Isso ocorre porque o suporte a
  sintaxe de acesso aos índices de arrays ou strings foi removido.

---
## O erro

O erro abaixo pode acontecer com você caso esteja executando um script no PHP 8.0 ou superior.

```text
PHP Fatal error:  Array and string offset access syntax with curly braces is no longer supported
```

## Causa

A partir da versão 7.4, o PHP tornou depreciada o uso da sintaxe de acesso a `string` e `array` via _curly brackets_ (chaves `{}`) . Na versão 8.0 do PHP, ela foi removida.

## Solução

Você precisa atualizar seu código. Você deve trocar as chaves `{}` por colchetes `[]`. 

Se seu código tiver algo parecido com isso:

```php
$string = 'Teste';
echo $string{0};
```

Precisa mudar para isso:

```php
echo $string[0];
```