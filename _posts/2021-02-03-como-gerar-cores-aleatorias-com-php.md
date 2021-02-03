---
layout: post
title: como gerar cores aleatórias com PHP?
date: 2021-02-03 01:00:00 -0200
categories:
- php
sitemap: true
image: "/uploads/covers/php.png"
excerpt: Aprenda a gerar cores hexadecimais aleatórias através do PHP

---
Muitas vezes, precisamos gerar cores aleatoriamente para utilizar no HTML ou CSS. Nesse tutorial vou ensinar uma maneira de fazer isso com o PHP.

## Criando a função para gerar cores aleatórias

Não é algo complicado. Podemos simplesmente uma função para gerar cores hexadecimais aleatórias no PHP utilizando as funções `mt_rand` e `sprintf`.

Código:

```php
function random_color($start = 0x000000, $end = 0xFFFFFF) {
   return sprintf('#%06x', mt_rand($start, $end));
}
```

Utilização:

```php
echo random_color(); // #add555
```

## Explicando a função

A função `sprintf` tem como finalidade formatar uma string. O caractere `%` atua como o formatador da string.

O caractere `#` é utilizado para cores em hexadecimal em HTML ou CSS.

O trecho `%06` significa que os valores aleatórios serão preenchidos com `0` até 6 vezes caso não chegue a 6 caracteres nossa cor hexadecimal. Fazemos isso porque no CSS é permitido apenas 3 caracteres ou 6 após o `#`.

O `x` converte o valor para a notação hexadecimal. O `x` converte os caracteres alfabéticos para minúsculo. Se utilizasse `X`, seria maísculo, mas isso não interfece em nada para o CSS, que utiliza as duas formas.

A função  `mt_rand` se encarregará de gerar um  número aleatório desde `0` até `16777215`. O número `16777215` é proveniente da expressão hexadecimal `0xFFFFFF`. Sabemos que no CSS, o valor para uma cor vai de `#000000` (preto) até `#FFFFFF` (branco). Por essa razão, utilizamos o valor `0xFFFFFF`. Uma expressão hexadecimal em PHP pode ser representada através de `0x[0-9a-fA-F]`.

### Limitando as cores geradas

Nossa função possui o parâmetro `$start` e `$end` para o caso de você querer limitar a aleatoriedade das cores geradas. Por exemplo, se quisermos que gerar cores entre `#DDDDDD` e `#FFFFFF`, podemos fazer assim:

    random_color (0xDDDDDD, 0xFFFFFF); // #e8bc3d

## Usando no HTML

Você poderia tranquilamente inserir esse valor em um elemento HTML. Basta apenas fazer isso:

```php
<div style="color: <?= random_color()?>;">Texto colorido aleatóriamente</div>
```