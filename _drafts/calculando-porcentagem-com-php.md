---
layout: post
color: "#222222"
title: Calculando porcentagem com PHP
date: 2021-03-04 00:00:00 -0300
categories: []
sitemap: false
image: "/uploads/covers/php.png"
excerpt: ''

---
## Descobrindo a porcentagem entre dois números

Você precisa dividir o valor A pelo B e multiplicar por 100.

## Calculando o valor baseado na porcentagem

Basta multiplicar o valor pela porcentagem desejada e dividir por 100. Suponhamos que você deseja saber quanto é 15% de 3000.

$valor = 3000;

$porcentagem = 15;

$resultado = $valor * ($porcentagem / 100);

var_dump($resultado);