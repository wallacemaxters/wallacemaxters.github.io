---
layout: post
title: Como verificar se uma hora é válida no PHP?
date: 2020-11-09T01:00:00.000-02:00
categories: []
sitemap: false
image: ''
excerpt: ''

---
As vezes precisamos saber se uma hora específica está correta ou não. Podemos fazer isso no PHP através das funções de manipulação de data.

Por exemplo, você tem uma aplicação que possa um campo onde é possível preencher uma determinada hora e você precisar validar se as datas são válidas. 

Imagine um cenário onde você possua as seguintes datas:

```
22:30
24:44
06:77
07:30
```

Observe que acima, temos duas datas válidas e duas datas inválidas. Para saber se são válidas ou não pelo PHP, podemos utilizar o método `DateTime::createFromFormat`. O formato de horas acima no PHP é equivalente a `H:i`.

Poderíamos fazer simplesmente isso:

```
$datas = [
    '22:30',
    '24:44',
    '06:77',
    '07:30',
];
foreach ($datas as $data) {
   $datetime = DateTime::createFromFormat('!H:i', $data);
   
   var_dump($datetime instanceof DateTime);
}
```

> **Nota**: Acima usamos `!` no início para o PHP inciar a data a partir da data do Unix.

O método `createFromFormat` retornará uma instância de `DateTime` se tudo estiver correto com o formato. Caso seja inválido, retornará `false`. Porém, se observar o código acima, vai notar que todas as datas foram validadas como verdadeiras.

Exemplo de saída:
```
bool(true)
bool(true)
bool(true)
bool(true)
```

Isso acontece porque, quando a data ultrapassa o valor normal de minutos ou horas, o PHP corrige isso tanto na data como na hora.

Veja um exemplo.

```php

var_dump(DateTime::createFromFormat("!H:i", "24:44"));
```

A saída será:

```
object(DateTime)#2372 (3) {
  ["date"]=>
  string(26) "1970-01-02 00:44:00.000000"
  ["timezone_type"]=>
  int(3)
  ["timezone"]=>
  string(17) "America/Sao_Paulo"
}
```

Observe que a data foi alterada para `02/01/1970` e a hora foi alterada para `00:44`. Da mesma forma `06:77` seria alterado para `07:17` pelo PHP. 

Isso dificulta o pouco a nossa validação. Porém há um pequeno truque que pode ser aplicado para contornar isso.

# Validando a hora com o PHP

Para resolvermos o problema acima, podemos fazer algo simples. Podemos simplesmente chamar o método `DateTime::format` para transformar o objeto `DateTime` que acabamos de criar para uma `string` no formato de hora.

Veja um exemplo de utilização do método `DateTime::format`:

```php
$datetime = new DateTime;
echo $datetime->format('H:i');
```

O método `format` irá basicamente retornará a hora que está registrada no `DateTime`. 
O que vamos fazer aqui basicamente é criar uma função que recebe a hora e comparar com o valor formatado em `DateTime`.

Assim:

```php
function validate_hour($input) 
{
    $format = 'H:i';

    $date = DateTime::createFromFormat('!'. $formato, $input);

    return $date && $date->format($format) === $input;
}
```

**Mas para que isso?**

Isso ocorre porque, ao aplicarmos `'H:i'` em `'24:44'` é convertido para `'1970-01-02 00:44:00'`. Quando chamamos `format('H:i')` no `DateTime` que criamos a partir de `DateTime::createFromFormat`, o valor retornado será `00:44`, que é diferente do valor do parâmetro passado em `validate_hour`.


```php
function validate_hour($input)
{
    return date('H:i', strtotime($input)) == $input;
}
```