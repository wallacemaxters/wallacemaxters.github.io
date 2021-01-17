---
layout: post
title: 'Pt-Br-Validator: Uma biblioteca para adicionar validações em português no
  Laravel'
date: 2021-01-17 11:46:00 -0200
categories:
- laravel
sitemap: true
image: "/uploads/Laravel.jpg"
excerpt: 'O Pt-Br-Validator é uma biblioteca criada por Wallace Maxters para adicionar
  validações em português em Laravel. Aprenda como utilizá-la neste tutorial. '

---
Volta e meia me deparava com situações onde eu precisava validar alguns "dados brasileiros" nas minhas aplicações escritas no framework Laravel. Constantemente, precisava validar o formato do telefone, ou se em CPF ou CNPJ era válido. E é comum nesses casos você querer criar um [Validator](https://laravel.com/docs/8.x/validation) personalizado para fazer isso.

Foi pensando nisso que, há alguns anos, eu criei a biblioteca chamada [LaravelLegends/PT-BR-Validator](https://github.com/LaravelLegends/pt-br-validator)