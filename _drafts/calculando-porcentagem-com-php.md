---
layout: post
color: "#222222"
title: Calculando porcentagem com PHP
date: 2021-03-04T00:00:00.000-03:00
categories:
- PHP
sitemap: false
image: "/uploads/covers/php.png"
excerpt: ''

---
## Descobrindo a porcentagem entre dois números

Você precisa dividir o valor A pelo B e multiplicar por 100. Por exemplo, se você deseja saber a porcentagem de 500 sobre 4000, basta fazer. O resultado esperado é 12.5%.

```php
$valor1 = 4000;
$valor2 = 500;
$resultado = ($valor2 / $valor1) * 100;

var_dump($resultado); // int(12.5)
```

Podemos criar então uma função que faça esse trabalho:

```php
function descobrir_porcentagem($a, $b) {
     return ($b/$a) * 100;
}

var_dump(descobrir_porcentagem (4000, 500)); // float(12.5)
```

## Calculando o valor baseado na porcentagem

Para obtermos um valor com base na porcentagem, basta multiplicar o valor pela porcentagem desejada e dividir por 100.
Suponhamos que você deseja saber quanto é 15% de 3000.

```php
$valor = 3000;
$porcentagem = 15;
$resultado = $valor * ($porcentagem / 100);
var_dump($resultado); // float(450)
```

## Calculando a porcentagem de desconto

Se quisermos subtrair o desconto de uma determinada porcentagem, basta fazer o mesmo cálculo anterior e subtrair pelo valor base.

Por exemplo, um desconto de 15% de 5000