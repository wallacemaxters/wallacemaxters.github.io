---
layout: post
color: "#222222"
title: 'Resolvendo o erro "compact(): Undefined variable"'
date: 2021-03-04 00:00:00 -0300
categories:
- php
sitemap: true
image: "/uploads/covers/php.png"
excerpt: ''

---
## Erro e Causa

O erro em questão é esse:

```text
compact(): Undefined variable
```

A mensagem na verdade é um `E_NOTICE` (mensagem de erro do PHP) disparado quando você tenta chamar compact em uma variável não existente no escopo atual. **Esse erro ocorre apenas em versões igual ou superiores ao php 7.3**.

## Reproduzindo o erro

Para reproduzir o erro, basta adicionar uma variável que não existe como argumento de `compact`.

```php
$existe = 'exsite';

compact('existe', 'nao_existe');
```

No PHP 7.3, a função `compact`...


## Possíveis soluções

Para resolver esse problema, podemos utilizar algumas alternativas.

1. Passar como argumento da função `compact` apenas as variáveis existentes no escopo em que esta função é chamada. 

2. Caso esteja utilizando uma biblioteca que não possa ser atualizada, talvez seja melhor fazer o downgrade para a versão 7.2 do PHP.

### Desative o `E_NOTICE`

Alternativamente, você pode desativar o `E_NOTICE` para suprimir a mensagem de erro causada pelo `compact`.

Veja:

```php
error_reporting(E_ALL ^ E_NOTICE);
$existe = 'existe';
compact('nao_existe', 'existe');	// ['existe' => 'existe']
```