---
layout: post
color: "#222222"
title: Calculando porcentagem com PHP
date: 2021-03-05T23:26:00.000-03:00
categories:
- PHP
- matematica
sitemap: true
image: "/uploads/matematica.jpg"
excerpt: Aprenda como fazer fazer as operações mais comuns para o cálculo de porcentagem
  com PHP.

---
Uma coisa muito comum para qualquer programador é uma hora ter que fazer cálculos matemáticos. Dentre eles, o mais comum é o cálculo de porcentagens.

Nesse tutorial, estarei falando sobre como calcular porcentagem através do PHP.

## Descobrindo a porcentagem entre dois números

Você precisa dividir o valor que deseja descobrir a porcentagem pelo valor base e multiplicar por 100. Por exemplo, se você deseja saber a porcentagem de 500 sobre 4000, basta dividir `500` por `4000` e multiplicar o resultado por `100`. O resultado esperado é 12.5%.

```php
$valor_base = 4000;
$valor = 500;
$resultado = ($valor / $valor_base) * 100;

var_dump($resultado); // int(12.5)
```

Podemos criar então uma função que faça esse trabalho:

```php
function descobrir_porcentagem(float $valor_base, float $valor): float
{
     return $valor / $valor_base * 100;
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

Por exemplo, um desconto de 15% sobre 1000 será de 150, o que fará com que o valor final seja 850. Sendo assim, precisamos encontrar a porcentagem do valor base e subtrair o valor base pelo resultado da porcentagem encontrada.

Podemos fazer esse cálculo assim:

```php
$valor = 1000;
$porcentagem = 15;
$resultado = $valor - ($valor * $porcentagem / 100);
var_dump($resultado); // float(850)
```

Opcionalmente, você pode até criar uma função para facilitar cálculos futuros.

Código:

```php
function calcular_desconto(float $valor, float $p_desconto): float 
{
    return $valor - ($valor * $p_desconto / 100); 
}
```

### Observação importante

O BRL (moeda Real Brasileiro) possui apenas duas casas decimais, que representam os Centavos. Talvez seja interessante arredondar o resultado para não ocorrer imprevistos.

Para fazer isso, basta utilizar a função `round`

```php
function calcular_desconto(float $valor, float $p_desconto): float 
{
    $resultado = $valor - ($valor * $p_desconto / 100);
    return round($resultado, 2);
}

var_dump(calcular_desconto(1000, 5.4321)); // float(945.68)
```