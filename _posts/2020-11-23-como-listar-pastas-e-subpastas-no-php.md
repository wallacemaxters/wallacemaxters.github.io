---
layout: post
title: Listando arquivos de uma pasta com PHP
date: 2020-11-23T14:31:00.000-03:00
categories:
- PHP
sitemap: true
image: "/uploads/covers/php_pastas.png"
excerpt: Aprenda como listar pastas e subpastas no PHP

---
O PHP possui diversas classes padrões, dentre elas os iteradores, que possuem algumas finalidades muito úteis. Uma dela são os iteradores de diretório de arquivos do PHP. Temos opções como `DirectoryIterator`, `FilesystemIterator` e `RecursiveDirectoryIterator`.

Neste tutorial, vamos utilizar a classe `RecursiveDirectoryIterator`.  Essa classe fornece uma interface simples para visualização de conteúdo de diretórios de arquivos recursivamente. Isso porque ela provê a habilidade de listar tanto os arquivos de uma pasta tanto das subpastas da mesma.

## Listando os pastas e subpastas com seus arquivos

Suponha que você tenha a seguinte estrutura:

    listar_arquivos.php
    pasta/
       1.jpg
       2.jpg
       3.jpg
       subpasta/
          1.jpg
          2.jpg
          3.jpg

Com esse pequeno código abaixo, podemos listar todos as pastas e subpastas, com seus arquivos.

Veja:

```php

$dir = __DIR__ . '/pasta';

$directory_iterator = new RecursiveDirectoryIterator(
	$dir, 
    FilesystemIterator::SKIP_DOTS
);

$iterator = new RecursiveIteratorIterator($directory_iterator);

foreach ($iterator as $file) {
	echo $file, "\n";
}
```

A saída do script acima é a seguinte:

    pasta-raiz/pasta/3.jpg
    pasta-raiz/pasta/2.jpg
    pasta-raiz/pasta/subpasta/3.jpg
    pasta-raiz/pasta/subpasta/2.jpg
    pasta-raiz/pasta/subpasta/1.jpg
    pasta-raiz/pasta/1.jpg

### Explicando o código

Note que o `RecursiveDirectoryIterator`, além do caminho da pasta que desejamos listar, passamos no segundo argumento uma flag chamada `FilesystemIterator::SKIP_DOTS`. Essa flag faz com retornos como `.` e `..` sejam ignorados, já que por padrão também são listados pelo iterador.

Além disso, utilizamos a classe `RecursiveIteratorIterator` e passamos para ela a instância de `RecursiveDirectoryIterator`. Isso porque `RecursiveIteratorIterator` precisa ser utilizado para percorrer iteratores recursivos.

## Como a listagem de arquivos pelo nome ?

Como pode ser notado acima, o iterador não retornou as pastas ordenadas pelo nome. Mas podemos contornar isso. Basta convertermos a nossa instância de `RecursiveIteratorIterator` para um `array` e, em seguida, ordenarmos os valores pela chave do array.

Veja:

```php
$dir = __DIR__ . '/pasta';

$iterator = new RecursiveIteratorIterator(
  new RecursiveDirectoryIterator(
      $dir, 
      FilesystemIterator::SKIP_DOTS
  )
);

$array = iterator_to_array($iterator);

ksort($array);

foreach ($array as $file) {
  echo $file, "\n";
}
```

Os iteradores em PHP têm o método `key`, que é responsável por retornar as chaves da iteração atual no `foreach`. No nosso exemplo,  por padrão, a chave é o caminho completo do arquivo. 

> **Nota**: Para alterar o comportamento, podemos utilizar as flags `FilesystemIterator::KEY_AS_PATHNAME` ou `FilesystemIterator::KEY_AS_FILENAME` no segundo argumento para `RecursiveDirectoryIterator`.

No código acima, usamos a função [iterator_to_array](https://www.php.net/manual/pt_BR/function.iterator-to-array), que copia o `iterator` para um `array`, incluindo as chaves e respectivo valores. Em seguida, chamamos a função [ksort](https://www.php.net/manual/pt_BR/function.ksort), que ordenará o `array` pelas chaves. Em `ksort`, não precisamos capturar o retorno, já que a mesma funciona internamente com [passagem por referência](https://www.php.net/manual/pt_BR/language.references.pass.php).

>**Nota**: Se por algum motivo você precisar ordenar em ordem reversa, você pode usar a função `krsort` no lugar de `ksort`.