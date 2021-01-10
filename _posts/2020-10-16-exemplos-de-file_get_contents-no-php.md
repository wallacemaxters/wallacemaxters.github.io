---
layout: post
title: Exemplos de uso do file_get_contents no PHP
date: 2020-10-16T00:00:00.000-03:00
categories:
- PHP
sitemap: true
image: "/uploads/captura-de-pantalla-de-2020-10-16-10-37-48.png"
excerpt: 'Nesse tutorial,  veremos exemplos práticos de como usar a função file_get_contents
  no PHP para abrir arquivos e urls. '

---
O `file_get_contents` é uma função bastante utilizada no PHP. Ela tem como finalidade ler todo o conteúdo de um arquivo para uma `string`, além de ter a capacidade de fazer outras coisas.

Vejamos alguns exemplos práticos de como utilizar essa função.

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

***

## Executando requisições HTTP com file_get_contents

Com o `file_get_contents` também é possível fazer chamadas `HTTP`.
Isso mesmo! Através dessa função podemos abrir o conteúdo remoto através de uma url.

Para fazer requisições `GET` simples, basta apenas passar a url que você deseja obter o conteúdo e o mesmo será retornado.

Exemplo:

```php
echo file_get_contents('http://exemplo.com');
// ou 
echo file_get_contents('https://exemplo.com');
```

### Requisições com método POST

É possível também enviar um POST no `file_get_contents` ao fazer uma requisição HTTP. Para isso, é preciso informar um _context_ como terceiro argumento da função.

> **Nota**: Na [documentação do file_get_contents](https://www.php.net/manual/pt_BR/function.file-get-contents.php) podemos ver a lista de parâmetros aceitos pela função.

Para criar um _context_, usamos a função [stream_context_create](https://www.php.net/manual/pt_BR/function.stream-context-create). Vamos usar especificamente o [contexto de http](https://www.php.net/manual/pt_BR/context.http.php).

Exemplo mínimo:

    $context = stream_context_create([
        'http' => [
            'method' => 'POST'
        ]
    ]);
    
    $resultado = file_get_contents('https://httpbin.org/post', false, $context);
    
    var_dump($resultado);

#### Enviando cabeçalho e corpo em uma requisição

Além disso, podemos enviar cabeçalhos e o corpo na requisição. As opções de contexto para fazer isso são, respectivamente, `header` e `content`. Em `header`, podemos usar um `array` com a lista de cabeçalhos que serão enviados. Em `content` é necessário informar uma `string`.

##### Enviando JSON

Vejamos um exemplo mínimo de como enviar uma requisição cujo corpo da mesma seja em formato JSON. Podemos usar a função `json_encode`para serializar os dados e informá-los em `content`. Da mesma forma, na opção `header`, temos que informar o content-type `application/json`.

Exemplo:

```php
$context = stream_context_create([
    'http' => [
        'method' => 'POST',
        'header' => [
            'Content-Type: application/json'
        ],
        'content' => json_encode([
            'nome' => 'Wallace'
        ])
    ]
]);

$resultado = file_get_contents('https://httpbin.org/post', false, $context);

var_dump($resultado);
```

##### Enviando um formulário

Você também consegue enviar os dados de forma semelhante a um formulário HTML. Basta informamos em `header` o Content-Type `application/www-form-urlencoded`. Em seguida, também precisamos informar o `content`, usando a função [`http_build_query`](https://www.php.net/manual/pt_BR/function.http-build-query.php). 


Exemplo:

```php
$context = stream_context_create([
    'http' => [
        'method' => 'POST',
        'header' => [
            'Content-Type: application/x-www-form-urlencoded'
        ],
        'content' => http_build_query([
            'nome' => 'Wallace'
        ])
    ]
]);

$resultado = file_get_contents('https://httpbin.org/post', false, $context);

var_dump($resultado);
```

> **Nota:** a função `http_build_query` transforma um `array` em uma `string` contendo um formato que geralmente é utilizado em *query strings* ou corpo de formulários.
