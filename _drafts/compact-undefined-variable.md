---
layout: post
color: "#222222"
title: 'compact(): Undefined variable:'
date: 2021-03-04 00:00:00 -0300
categories: []
sitemap: false
image: ''
excerpt: ''

---
## Erro
```text
compact(): Undefined variable:
```

Para reproduzir o erro, adicionar uma variável que não existe como argumento de `compact`.

Exemplo:
```php
compact('nao_existe');
```

## Causa

No PHP 7.3, a função `compact`...


## Solução

Passar como argumento da função `compact` apenas as variáveis existentes no escopo em que esta função é chamada.