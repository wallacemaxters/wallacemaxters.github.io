---
layout: post
title: Como ler xml com PHP?
date: 2021-02-19T02:50:00.000+00:00
categories:
- PHP
- xml
- dom
sitemap: true
image: "/uploads/php-simple-xml.jpeg"
excerpt: Esse tutorial mostra como podemos utilizar a extensão Simple XML do PHP para
  ler um arquivo ou string XML de maneira rápida e eficiente.
color: ''

---
Para ler XML em PHP, você pode usar a  função `simplexml_load_file` ou`simple_xml_load_string`. Elas retornam uma instância da classe `SimpleXmlElement`. A primeira lê o XML a partir de um arquivo, e a seguida, através de uma string contendo o XML.

Vamos ver abaixo alguns detalhes interessantes a respeito do funcionamento dessas funções.

## Acessando os nós do XML

Para acessar os nós do XML processado, você deve usar o _Object Separator_ (`->`).

Exemplo:

```php
$xml = '<root>
<a>
   <b>
     <c>Eu sou o C</c>
   </b>
</a>
</root>';

$simple_xml = simplexml_load_string($xml);

var_dump($simple_xml->a->b->c);
```

Retorno:

```php
object(SimpleXMLElement)#2355 (1) {
  [0]=> string(1) "Eu sou o C"
}
```

## Acessando os atributos de um nó

Para acessar os atributos de um nó, você deve acessar da mesma forma que se faz com os índices do `array` em PHP.  Basta usar \['nome_atributo'\]

Exemplo:

```php
$xml = '<root>
<a>
   <b nome="valor" numero="13.55">
     <c>Eu sou o C</c>
   </b>
</a>
</root>';

$simple_xml = simplexml_load_string($xml);

var_dump($simple_xml->a->b['numero']);
```

O resultado será:

```php
object(SimpleXMLElement)#2354 (1) {
  [0]=> string(5) "13.55"
}
```

Observe que em todas as chamadas, o retorno é sempre `SimpleXmlElement`. Então, para converter os valores, você precisa fazer a conversão dos valores (cast) em cada operação.

Veja:

```php
var_dump((float) $simple_xml->a->b['numero']); // float(13.55)
var_dump((string) $simple_xml->a->b['nome']); // string(5) valor)
```

## Iterando sobre os nós

Acima, fiz uma pequena demonstração de como obter os valores de atributos e nós. Porém há alguns casos onde um nó possui vários nós filhos, como no exemplo abaixo:

```xml
<root>
    <table>
        <row>
            <cell label="ID">1</cell>
            <cell label="NOME">Wallace</cell>
            <cell label="Número">33.55</cell>
        </row>
        <row>
            <cell label="ID">2</cell>
            <cell label="NOME">Maxters</cell>
            <cell label="Número">24.12</cell>
        </row>
    </table>
</root>
```

Para percorrer esses nós filhos, devemos usar o `foreach`.

```php

$xml = 
'<root>
    <table>
        <row>
            <cell label="ID">1</cell>
            <cell label="NOME">Wallace</cell>
            <cell label="Número">33.55</cell>
        </row>
        <row>
            <cell label="ID">2</cell>
            <cell label="NOME">Maxters</cell>
            <cell label="Número">24.12</cell>
        </row>
    </table>
</root>';

$simple_xml = simplexml_load_string($xml);


foreach ($simple_xml->table->row as $row) {

    foreach ($row->cell as $cell) {
        echo $cell['label'], ':', $cell, "\n";
    }
}
```

O resultado do código acima será assim:

```text
ID:1
NOME:Wallace
Número:33.55
ID:2
NOME:Maxters
Número:24.12
```

## Atributos que possuem namespace

Para acessar os nós que possuam com namespace, você deve utilizar o método `children`. Você deve informar o `namespace` no primeiro argumento e `true`, no segundo.

Assim:

    $xml = 
    '<root>
    	<h:table xmlns:h="teste">
    	  <h:tr>
    	    <h:td>Maçãs</h:td>
    	    <h:td>Bananas</h:td>
    	  </h:tr>
    	</h:table>
    </root>';
    
    $simple_xml = simplexml_load_string($xml);
    
    
    foreach ($simple_xml->children('h', true)->table->tr->td as $item) {
    	var_dump((string) $item);
    }

O resultado será

```text
string(7) "Maçãs"
string(7) "Bananas"
```