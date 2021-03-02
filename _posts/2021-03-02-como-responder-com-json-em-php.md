---
layout: post
color: "#222222"
title: Como responder com JSON em PHP?
date: 2021-03-02 01:36:00 -0300
categories:
- PHP
- json
sitemap: true
image: "/uploads/como-responder-json-com-php.png"
excerpt: Veja como é fácil enviar uma resposta JSON com PHP!

---
Código:

```php
header('Content-Type: application/json');
$resultado = [
    'nome' => 'Maxters',
];
echo json_encode($resultado);
```

Resultado:

```json
{"nome": "Maxters"}
```

## Explicando o código

A função `header` é utilizada para definir um cabeçalho HTTP na resposta. No caso, para que o navegador entenda a resposta do servidor como JSON, é recomendável utilizar o `Content-Type: application/json`. Isso porque o PHP por padrão costuma enviar `text/html`. 

A função `json_encode` serializa os dados da variável `$resultado` para o formato `JSON`.  E, por sua vez, `echo` imprime a resposta.