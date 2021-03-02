---
layout: post
color: "#222222"
title: Como responder com JSON em PHP?
date: 2021-03-02 00:00:00 -0300
categories:
- PHP
- json
sitemap: false
image: ''
excerpt: ''

---

Código
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

### Explicando o código 

A função `header` é utilizada para definir um cabecalho HTTP na resposta. No caso, para que o navegador entenda a resposta do servidor como JSON, é recomendável utilizar o `Content-Type: application/json`.  

A função `json_encode` serializa os dados da variável `$resultado` para o formato `JSON`.  E, por sua vez, `echo` imprime a resposta.