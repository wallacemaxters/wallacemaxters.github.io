---
layout: post
title: Como formatar horas no PHP?
date: 2021-04-21T15:00:00.000-03:00
categories:
- PHP
sitemap: true
image: "/uploads/covers/php.png"
excerpt: Aprenda como formatar horas com PHP através da função date e da classe DateTime.
color: "#000000"

---
O formato para horas em PHP é representado pelos caracteres `H:i:s`. Onde:

- `H` retorna a hora de 0 a 23
- `i` retorna o minuto
- `S` retorna o segundo

## Exibindo a hora atual formatada pelo PHP

Para exibir a hora atual em PHP, basta utilizamos a função `date` ou o método `DateTime::format`.

Exemplo:

```php
date('H:i:s')
```

ou 

```php
$date = new Datetime();
echo $date->format('H:i:s');

// ou 
echo (new Datetime)->format('H:i:s');
```

{% include ads_article.html %}

--- 
## Formatando hora de uma determinada data

Para formatar a horas específica de uma determinada data, você pode realizar a mesma operação anterior.

No nosso exemplo, vamos supor que temos a data `2017-02-31 23:10:58`.

Utilizando a classe `DateTime`, ficaria dessa forma.

```php

$entrada = '2017-02-31 23:10:58';

(new DateTime($entrada))->format('H:i:s'); // 23:10:58
```

Já no caso da função `date`, você precisa utilizar também o `strtotime`, para que o PHP converta a data para um *unix timestamp*; 

Veja:

```php

$entrada = '2017-02-31 23:10:58';
echo date('H:i:s', strtotime($entrada)); // 23:10:58
```

## Exibindo horas com AM e PM

Para exibir datas contendo a identificação `AM` <span title="Antes de meio-dia">(*ante meridiem*)</span> e `PM` <span title="Após medio-dia">(*post meridiem*)</span>, você deve utilizar o formato `h:i:s A` ou `h:i:s a`.

Explicando melhor os caracteres acima significam:

- `h` a hora de 0 a 12
- `a` retorna se a hora é AM ou PM (em minúsculo)
- `A` retorna se a hora é AM ou PM (em maiúsculo)


Exemplos:

```php
echo date('h:i:s A'); // 10:02:55 AM
echo date('h:i:s a'); // 10:02:55 am
echo (new DateTime)->format('h:i:s A');
```

### Dica: padronize o formato utilizado

Pode ser que você precise utilizar o mesmo formato em vários lugares no seu projeto. Neste caso, para fins de manutenção de padrões e evitar repetições desnecessárias, sugiro a utilização de uma constante para armazenar o valor de formatação das horas.

```php
define('TIME_FORMAT', 'h:i:s A');
echo date(TIME_FORMAT); // 03:18:41 PM
```