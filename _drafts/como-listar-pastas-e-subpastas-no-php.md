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

```
listar_arquivos.php
pasta/
   1.jpg
   2.jpg
   3.jpg
   subpasta/
      1.jpg
      2.jpg
      3.jpg
      
```

Ao rodar o código abaixo:

```php
$directory_iterator = new RecursiveDirectoryIterator(__DIR__ . '/pasta', RecursiveDirectoryIterator::SKIP_DOTS);

$iterator = new RecursiveIteratorIterator($directory_iterator);


foreach ($iterator as $file) {

	echo $file, "\n";
}
```

O resultado será:

```
pasta-raiz/pasta/3.jpg
pasta-raiz/pasta/2.jpg
pasta-raiz/pasta/subpasta/3.jpg
pasta-raiz/pasta/subpasta/2.jpg
pasta-raiz/pasta/subpasta/1.jpg
pasta-raiz/pasta/1.jpg
```