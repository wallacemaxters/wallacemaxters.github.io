---
layout: post
title: O que há de novo no PHP 8?
date: 2020-12-06 01:00:00 -0200
categories:
- php
sitemap: false
image: ''
excerpt: ''

---
PHP 8.0 é uma atualização importante da linguagem PHP.

Ele contém muitos novos recursos e otimizações, incluindo argumentos nomeados, tipos de união, atributos, promoção de propriedade do construtor, expressão de correspondência, operador nullsafe, JIT e melhorias no sistema de tipo, tratamento de erros e consistência.

## Named Arguments

O PHP 8 suporta argumentos nomeados. Para funções/métodos cujo os parâmetros sejam opcionais, o PHP agora permite que você passe o nome do argumento para a função. 

Versões anteriores:

```php
file_put_contents($hostname, $content, 0, $stream);
```

Versão 8:

```php8
file_put_contents($hostname, $content, context: $stream);
```

Isso é muito útil para "pular" a passagem de um parâmetro opcional e já definir o parâmetro desejado sem ter que considerar a posição do mesmo.

> Os *named arguments* (argumentos nomeados) devem ser usado apenas após a passagem dos argumentos posicionais (os argumentos obrigatórios da função). No caso de `file_put_contents`, como no exemplo, o primeiro e segundo argumentos sempre são posicionais.