---
layout: post
title: Qual é a diferença entre readfile e  file_get_contents em PHP?
date: 2019-03-18T03:00:00.000+00:00
categories:
- PHP
sitemap: true
image: "/uploads/php-leader.png"
excerpt: 'Veja nesse artigo quais as principais diferenças entre as funções de leitura
  de arquivo readfile e file_get_contents. '
color: "#BD10E0"

---
O PHP é uma linguagem que tem uma grande quantidade de funções que, as vezes, parecem fazer as mesmas coisas. Um bom exemplo disso é funções que manipulam  arquivos.

Por exemplo, para ler um arquivo, você poderia escolher entre as funções `file_get_contents`, `fopen`, `readfile`, `file` ou a classe `SplFileObject`. É claro que cada uma delas é usado em cenários diferentes.

Por exemplo, das funções que citei acima, eu costumo utilizar muito `readfile` e `file_get_contents`. E é importante sabermos a diferença entre delas, para saber melhor em qual centário utilizadas.

## Como funciona a função file_get_contents?

A função [`file_get_contents`](http://php.net/manual/pt_BR/function.file-get-contents.php) tem como finalidade ler todo o conteúdo de um arquivo para uma `string`, sendo possível, por exemplo, armazenar todo valor de um arquivo de texto em uma variável.

Por exemplo:

```php
$json_contents = file_get_contents('config.json');
```

No exemplo acima, ao fazer essa chamada, você obteria toda o valor de `config.json` em uma `string` e tratar conforme desejar.

## Como funciona a função readfile?

Ela lê e exibe todo o conteúdo de um arquivo. Diferentemente do `file_get_contents`, que retorna a `string`, a função `readfile` envia para a saída todo o conteúdo do arquivo. Ela retorna um valor `int`, contendo o número de bytes contido no arquivo lido.

É como se o PHP tivesse percorrido cada linha e executado um `echo` em cada uma delas.

Você pode achar que isso é alguma desvantagem, mas em alguns casos você precisará apenas enviar o conteúdo de um arquivo direto para o output, sem guardar esses valores na memóriaDas funções que citei acima, eu costumo utilizar muito `readfile` e `file_get_contents`. É necessário informar que ess.

Por exemplo, se quiser imprimir uma imagem através de um script PHP, você poderá fazer assim:

```php
header('Content-Type: image/png');     
readfile('/protegido/imagens/arquivo.jpg');
```

No caso acima, o `readfile` poderia ser vantajoso em relação ao `file_get_contents`, pois evitaria, por exemplo, sobrecarregar o servidor, no caso de carregar um arquivo muito grande, uma vez que `file_get_contents` armazena o valor para uma string.

### Conclusão

Resumindo todo o artigo, a diferença entre `file_get_contents` e `readfile` é que a primeira retorna o conteúdo de um arquivo em uma `string` e a segunda apenas lê o conteúdo de um arquivo.

Sendo assim, use `file_get_contents` quando precisar trabalhar com os conteúdo do arquivo diretamente. Por exemplo, `file_get_contents` será ideal ser você precisar realizar substituições, desserializações, ou qualquer outra necessidade que seja o conteúdo inteiro do arquivo.

No caso do `readfile`, utilize-o se você precisar de apenas exibir o conteúdo do arquivo para o cliente, ou mesmo escrevê-lo na saída do seu terminal/shell/console.