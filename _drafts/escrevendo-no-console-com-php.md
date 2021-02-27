---
layout: post
color: "#222222"
title: Escrevendo no Console com PHP
date: 2021-02-27 03:00:00 +0000
categories:
- php
- javascript
sitemap: false
image: ''
excerpt: ''

---
No Javascript, podemos usar o `console.log` para enviar alguma informação para a ferramenta de desenvolvedor do seu navegador web.

Seria possível enviar uma saída do PHP diretamente para lá?

Bem,  diretamente pelo PHP, não tem como, mas há um truque simples que pode ser feito.

## Enviando uma saída do PHP para o Console do Navegador

Podemos utilizar o PHP para escrever no Console através do Javascript. 

Exemplo:

```php
echo '<script>console.log("teste")</script>';
```

Isso imprimirá `1` no console do navegador. Mas precisamos de algo mais elaborado. Que tal uma função que envie os dados que você deseja depurar em formato JSON?

Exemplo:

```php
function console_log($dados)
{
	printf('<script>console.log(%s);</script>', json_encode($dados));
}
```