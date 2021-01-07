---
layout: post
title: Como listar pastas e subpastas no PHP?
date: 2020-11-23T14:31:00.000-03:00
categories:
- PHP
sitemap: true
image: "/uploads/covers/php_pastas.png"
excerpt: Aprenda como listar pastas e subpastas no PHP

---
Para listar pastas e subpastas no PHP, você pode utilizar simplesmente a classe `RecursiveDirectoryIterator`.  Essa classe provê a capacidade de listar recursivamente pastas e arquivos de uma determinado diretório.

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

Ao rodar o código abaixo:

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

O resultado será:

    pasta-raiz/pasta/3.jpg
    pasta-raiz/pasta/2.jpg
    pasta-raiz/pasta/subpasta/3.jpg
    pasta-raiz/pasta/subpasta/2.jpg
    pasta-raiz/pasta/subpasta/1.jpg
    pasta-raiz/pasta/1.jpg

Note que o `RecursiveDirectoryIterator`, além do caminho da pasta que desejamos listar, passamos no segundo argumento uma flag chamada `FilesystemIterator::SKIP_DOTS`. Essa flag faz com retornos como `.` e `..` sejam ignorados, já que por padrão também são listados pelo iterador.

## Como ordenar os arquivos pelo nome ?

Como pode ser notado acima, os iteradores de sistema de arquivos no PHP não retornam as pastas ordenadas pelo nome. Mas podemos contornar isso. Basta convertermos a nossa instância de `RecursiveIteratorIterator` para um `array` e aplicamos a função `ksort`.

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

> **Nota** : Os iteradores em PHP têm o método `key`, que retornam a chave da iteração atual no `foreach`. No nosso exemplo,  por padrão, a chave é o caminho completo do arquivo. Para alterar o comportamento, podemos utilizar as flags `FilesystemIterator::KEY_AS_PATHNAME` ou
> `FilesystemIterator::KEY_AS_FILENAME` no segundo argumento para `RecursiveDirectoryIterator`.