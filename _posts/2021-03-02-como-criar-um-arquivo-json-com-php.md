---
layout: post
color: "#4A90E2"
title: Como criar um arquivo JSON com PHP?
date: 2021-03-02 02:21:00 -0300
categories:
- PHP
- json
sitemap: true
image: "/uploads/escrever-json-php.jpeg"
excerpt: 'Veja como criar um arquivo JSON através do PHP neste tutorial!

'

---
No PHP, a função `json_encode` retorna uma string contendo uma representação JSON de um valor informado.

Mas, as vezes, além de convertermos para JSON,  precisamos salvá-lo em um arquivo. Nem todo mundo sabe, mas essa é uma tarefa simples de ser realizada no PHP!

## Criando um arquivo JSON

Como já dito, a função `json_encode`retorna uma string que  correspondente ao formato JSON de um determinado valor. Pelo fato de ser retornada uma `string`, é fácil salvá-la em algum arquivo, bastando apenas utilizar a função `file_put_contents`.

Veja:

```php
$dados = [
	'nome' => 'Wallace',
    'linguagens' => [
    	'PHP',
        'Javascript',
        'Python',
        'C#'
    ]
];

$arquivo = __DIR__ . '/arquivo.json';

file_put_contents($arquivo, json_encode($dados));
```

Isso vai gerar um arquivo `arquivo.json` na pasta onde o script é executado, com o seguinte conteúdo:

```json
{"nome":"Wallace","linguagens":["PHP","Javascript","Python","C#"]}
```

Note que o JSON escrito no arquivo, que foi gerado a partir dos valores presentes na variável `$dados`, contém apenas uma linha, sem nenhuma identação. Esse é o comportamento padrão da função `json_encode`

Isso ajuda a salvar alguns bytes na hora de escrever o seu arquivo pelo PHP. Porém, caso você precise que o seu JSON esteja formatado, você pode fazê-lo tranquilamente!


<hr/>
{% include ads_common.html %}![](/uploads/codeimg-instagram-photo-thumbnail-1.jpeg)![](/uploads/escrever-json-php-1.jpeg)
<hr/>
## Criando um arquivo JSON formatado

A função `json_encode`, além de converter os dados passados para JSON, também pode receber outros parâmetros, que permitem modificar o comportamento da função. No nosso caso, utilizaremos a constante `JSON_PRETTY_PRINT`. Ao utilizarmos ela no segundo parâmetro de `json_encode`, ela mudará a saída, para que o JSON seja retornado em um formato "mais amigável visualmente".

Veja:

```php
$dados = [
	'nome' => 'Wallace',
    'linguagens' => [
    	'PHP',
        'Javascript',
        'Python',
        'C#'
    ]
];

$arquivo = __DIR__ . '/arquivo_formatado.json';
$json_formatado = json_encode($dados, JSON_PRETTY_PRINT);
file_put_contents($arquivo, $json_formatado);
```

O arquivo `arquivo_formatado.json` será criado com o seguinte conteúdo:

```json
{
    "nome": "Wallace",
    "linguagens": [
        "PHP",
        "Javascript",
        "Python",
        "C#"
    ]
}
```