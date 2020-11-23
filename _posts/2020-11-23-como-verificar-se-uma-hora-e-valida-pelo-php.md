---
layout: post
title: Como verificar se uma hora é válida no PHP?
date: 2020-11-23T23:31:00.000-02:00
categories:
- PHP
sitemap: true
image: "/uploads/validar_hora_php-1.png"
excerpt: Aprenda como verificar se uma hora/horário é válido ou não pelo PHP

---
As vezes precisamos saber se uma hora específica está correta ou não. Podemos fazer isso no PHP através das funções de manipulação de data.

Por exemplo, você tem uma aplicação que possa um campo onde é possível preencher uma determinada hora e você precisar validar se as datas são válidas. 


## Como o PHP trata horas?

Imagine um cenário onde você possua as seguintes datas:

```
22:30
24:44
06:77
07:30
```

Observe que acima temos duas horas válidas e duas horas inválidas. Para trabalharmos com as horas em PHP, podemos utilizar o método `DateTime::createFromFormat`. Essa função converte uma entrada para Data e Hora a partir de um formato específico. No caso, o formato equivalente a horas em PHP é `H:i`.

Sendo assim, para começarmos a montar nossa validação, podemos testar a entrada dessas horas acima utilizando o seguinte código:

```php
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

> **Nota**: Acima usamos `!` no início para o PHP iniciar a data a partir da data do Unix (01/01/1970).

O método `createFromFormat` retornará uma instância de `DateTime` se tudo estiver correto com o formato. Caso seja inválido, retornará `false`. 

Você vai notar que, no código acima, todas as chamadas de `createFromFormat` são instâncias de `DateTime`.

Veja:
```
bool(true)
bool(true)
bool(true)
bool(true)
```

Você pode se perguntar: Mas 24:44 e 06:77 não são horas inválidas?

Sim, porém, quando a data ultrapassa o valor normal de minutos ou horas, o PHP corrige isso tanto na data como na hora. Ele faz uma espécie de "arrendondamento" da data.

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

Isso dificulta o pouco a nossa validação que desejamos fazer, porém há um pequeno truque que pode ser aplicado para contornar isso.

## Validando a hora com o PHP

Para resolvermos o problema acima, podemos fazer algo simples. Podemos simplesmente chamar o método `DateTime::format` para transformar o objeto `DateTime` que acabamos de criar para uma `string` no formato de hora.

Veja um exemplo de utilização do método `DateTime::format`:

```php
$datetime = new DateTime;
echo $datetime->format('H:i');  // 09:51
```

O método `format` irá basicamente retornará a hora que está registrada no `DateTime`. 

O que vamos fazer aqui basicamente é criar uma função que recebe a hora e comparar com o valor formatado em `DateTime`.

Podemos criar a seguinte função:

```php
function validate_hour($input) 
{
    $format = 'H:i';

    $date = DateTime::createFromFormat('!'. $format, $input);

    return $date && $date->format($format) === $input;
}
```

E validar as horas dessa maneira:

```php
$horas = [
    '22:30',
    '24:44',
    '06:77',
    '07:30',
];
foreach ($horas as $hora) {
   var_dump(validate_hour($hora));
}
```

O resultado será:

```
bool(true)
bool(false)
bool(false)
bool(true)
```



### Como funciona essa função de validação de horas?

**Hora Inválida**
Ao aplicarmos `'!H:i'` em `'24:44'`, esse valor convertido para uma instância `DateTime` com o valor `'1970-01-02 00:44:00'`. Quando chamamos `format('H:i')` no `DateTime` que criamos a partir de `DateTime::createFromFormat`, o valor retornado será `00:44`. O valor é diferente do valor do parâmetro passado no argumento `$input`.

Ou seja, `00:44` retornado pelo `format` não é igual ao argumento `24:44`. Por isso o valor retornado será inválido.

**Hora válida**
Ao aplicarmos `'!H:i'` em `'22:30'`, esse valor convertido para uma instância `DateTime` com o valor `'1970-01-01 22:30:00'`. Quando chamamos `format('H:i')` no `DateTime` que criamos a partir de `DateTime::createFromFormat`, o valor retornado será `22:30`. Esse valor é igual ao valor que passamos no argumento `$input`. Ou seja, temos uma hora válida.


> **Nota**: É preciso explicar que a expressão `$date && $date->format($format) === $input` foi usada porque quando o formato passado para `DateTime::createFromFormat` não é válido, o PHP vai retornar `false`.  

### Versão simplificada da função de validação de horas

Criei uma versão simplificada da função de validação de horas. Basicamente, utilizamos o mesmo truque acima, porém utilizamos aqui as funções `date` e `strtotime`. 

Veja:

```php
function validate_hour($input)
{
    return date('H:i', strtotime($input)) == $input;
}
```

A função `strtotime` converte uma `string` para um valor inteiro (que é o timestamp da data).  A função `date` se encarregará de formatar o `timestamp`. Então, comparamos os dois, da mesma forma que fizemos acima com a outra função.