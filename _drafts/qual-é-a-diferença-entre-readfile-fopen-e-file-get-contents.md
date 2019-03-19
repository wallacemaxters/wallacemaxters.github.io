---
layout: post
title: Qual é a diferença entre readfile e  file_get_contents em PHP?
date: 2019-03-18 03:00:00 +0000
categories:
- PHP
sitemap: false

---
No PHP, há muitas alternativas muitas vezes para obter um mesmo resultado parecido, como é o caso da manipulação de arquivos.

Um bom exemplo disso é com arquivos. Para ler um arquivo, você poderia usar as funções `file_get_contents`, `fopen`, `readfile`, `file` ou a classe `SplFileObject`.
 
 No caso acima, eu já utilizei muito `readfile` e `file_get_contents` e, apesar de serem parecidas, é necessário informar algumas variações entre as duas
 
 
 ### `file_get_contents`
 
 A função [`file_get_contents`](http://php.net/manual/pt_BR/function.file-get-contents.php) tem como finalidade ler todo o conteúdo de um arquivo para uma `string`, sendo possível, por exemplo, armazenar todo valor de um arquivo de texto em uma variável.
 
 Por exemplo:
 
     $json_contents = file_get_contents('config.json');
     
No exemplo acima, ao fazer essa chamada, você obteria toda o valor de `config.json` em uma `string` e tratar conforme desejar.  


### `readfile`

Ela lê e exibe todo o conteúdo de um arquivo. Diferentemente do `file_get_contents`, que retorna a `string`, a função `readfile` envia para a saída todo o conteúdo do arquivo. Ela retorna um valor `int`, contendo o número de bytes contido no arquivo lido.

Você pode achar que isso é alguma desvantagem, mas em alguns casos você precisará apenas enviar o conteúdo de um arquivo direto para o output, sem guardar esses valores na memória.

Por exemplo, se quiser imprimir uma imagem através de um script PHP, você poderá fazer assim:

     header('Content-Type: image/png');
     
     readfile('/protegido/imagens/arquivo.jpg');
    

No caso acima, o `readfile` poderia ser vantajoso em relação ao `file_get_contents`, pois evitaria, por exemplo, sobrecarregar o servidor, no caso de carregar um arquivo muito grande, uma vez que `file_get_contents` armazena o valor para uma string.


### Conclusão

Use `file_get_contents` quando precisar trabalhar com os conteúdo do arquivo diretamente, como por exemplo, realizando substituições, desserializações e verificações. 

Se precisar apenas de exibir o conteúdo do arquivo para o cliente, utilize `readfile`.
