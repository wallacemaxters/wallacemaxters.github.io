---
layout: post
color: "#222222"
title: 'Como resolver o erro "compact (): Undefined variable"'
date: 2021-03-04T00:00:00.000-03:00
categories:
- PHP
sitemap: true
image: "/uploads/covers/php.png"
excerpt: 'Aprenda como resolver o erro "compact(): Undefined variable ''variavel''
  "'

---
## Erro e Causa

O erro em questão é esse:

```text
compact(): Undefined variable "variavel" in script.php on line 3
```

A mensagem na verdade é um `E_NOTICE` (mensagem de erro do PHP) disparado quando você tenta chamar  a função `compact` em uma variável não existente no escopo atual. **Esse erro ocorre apenas em versões igual ou superiores ao php 7.3**.

### Reproduzindo o erro

Para reproduzir o erro, basta adicionar uma variável que não existe como argumento de `compact`.

```php

$existe = 'exsite';

compact('existe', 'nao_existe');
```

***

## Possíveis soluções

Para resolver esse problema, podemos utilizar algumas alternativas.

### Atualizar o código

Se possível, você deve atualizar o código, passando a usar como argumento da função `compact` apenas as variáveis existentes no escopo em que esta função é chamada. Dessa forma, você estará adequanto seu código ao novo comportamento da função, evitando a mensagem de erro.

Exemplo:

```php
$existe = 'existe';
compact('existe');
```

### Fazer o downgrade para a versão 7.2 do PHP

Caso esteja utilizando uma biblioteca que não possa ser atualizada, talvez seja melhor fazer o downgrade para a versão 7.2 do PHP. Pois esse comportamento de `compact` passou a ocorrer a partir da versão 7.3.

### Desativar o E_NOTICE

Alternativamente, você pode desativar o `E_NOTICE` para suprimir a mensagem de erro causada pelo `compact`.

Veja:

```php
error_reporting(E_ALL ^ E_NOTICE);
$existe = 'existe';
compact('nao_existe', 'existe');	// ['existe' => 'existe']
```

### Utilizar a supressão de erro do PHP

Bem, não é uma das minhas alternativas favoritas, mas você pode utilizar o `@` antes de chamar `compact`. Isso vai suprimir a mensagem de erro, fazendo com que o PHP simplesmente ignore a variável não existente.

```php
// Fazer o que né?
$existe = 'existe';
@compact('nao_existe', 'existe'); // ['existe' => 'existe']
```