---
layout: post
title: Exemplos de file_get_contents no PHP
date: 2020-10-16T00:00:00.000-03:00
categories:
- PHP
sitemap: true
image: "/uploads/captura-de-pantalla-de-2020-10-16-10-37-48.png"
excerpt: 'Nesse tutorial,  veremos exemplos práticos de como usar a função file_get_contents
  no PHP para abrir arquivos e urls. '

---
## Lendo arquivos com file_get_contents

O `file_get_contents` tem como finalidade ler o conteúdo de um arquivo e retornar em uma `string`. 

Na sua forma mais simples de uso, basta apenas passar como primeiro argumento o caminho do arquivo (seja absoluto ou relativo). Assim, o valor de `file_get_contents` poderá armazenado numa variável.

Exemplo:

```php
// script.php

$caminho = __DIR__ . '/index.html';
$conteudo = file_get_contents($caminho);

echo $conteudo;
```

Se o arquivo tiver na mesma pasta onde o `script.php` é executado, não é necessário usar o caminho absoluto (caminho completo, que criamos ao concatenar o nome do arquivo com `__DIR__` no exemplo anterior). Basta apenas passar o nome relativo do arquivo.

Exemplo:

```php
// script.php

$caminho = 'index.html';
// ou 
$caminho = './index.html';

$conteudo = file_get_contents($caminho);

echo $conteudo;
```

## Executando requisições HTTP com `file_get_contents`

Com o `file_get_contents` também é possível fazer chamadas `HTTP`. 
Isso mesmo! Através dessa função podemos abrir o conteúdo remoto de uma url.

Para fazer requisições `GET` simples, basta apenas passar a url que você deseja obter o conteúdo e o mesmo será retornado.

Exemplo:

```php
echo file_get_contents('http://exemplo.com');
// ou 
echo file_get_contents('https://exemplo.com');
```