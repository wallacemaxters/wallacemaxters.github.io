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

Acima, quando o valor 

```php
function validate_hour($input) 
{
    $format = 'H:i';

    $date = date_create_from_format('!'. $formato, $input);

    return $date && $date->format($format) === $input;
}
```

```php
function validate_hour($input)
{
    return date('H:i', strtotime($input)) == $input;
}
```