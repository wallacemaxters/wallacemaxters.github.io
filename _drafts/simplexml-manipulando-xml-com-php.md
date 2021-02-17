---
layout: post
title: 'SimpleXML: Manipulando xml com PHP'
date: 2021-02-17 01:00:00 -0200
categories:
- php
sitemap: false
image: ''
excerpt: ''

---
Para manilupar XML em PHP, você pode usar a  função `simplexml_load_file` ou `simple_xml_load_string`. Ela retorna uma instância da classe `SimpleXmlElement`.

Você usa o object separator (o ->) apenas para acessar os nós.

Exemplo:

```xml
<root>
<a>
   <b>
     <c>Eu sou o C</c>
   </b>
</a>
</root>
```

```php
var_dump($xml->a->b->c);
```

Isso vai gerar:

    object(SimpleXMLElement)#2355 (1) {
      [0]=>
      string(1) "Eu sou o C"
    }

Para acessar os atributos, você deve acessar como se faz com os índices do `array`, usando \['nome_atributo'\]

Exemplo:

```php
$str = '<root>
<a>
   <b nome="valor" numero="13.55">
     <c>Eu sou o C</c>
   </b>
</a>
</root>';

$xml = simplexml_load_string($str);

var_dump($xml->a->b['numero']);
```

O resultado será:

```object(SimpleXMLElement)#2354 (1) {
  [0]=>
  string(5) "13.55"
}
```

Nota: Tudo que é retornado vem como `SimpleXmlElement`. Então, para converter o valor, você precisa fazer um cast, conforme necessário:

```php
var_dump((float) $xml->a->b['numero']); // float(13.55)
```

Para acessar os valores com namespace, segue a mesma regra:

```php
echo (float) $xml->a->b['ss:numero'];
```

## Exibindo nome e atributos usando foreach

Para exemplificar melhor, criei o seguinte XML.

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
            <cell label="NOME">Wayne</cell>
            <cell label="Número">21</cell>
        </row>
    </table>
</root>
```

Como percebi que você está confuso também quanto ao uso do `foreach`, criei um exemplo de como acessar os nós filhos através dele.

Veja:

```php
$xml = simplexml_load_file('./dados.xml');


foreach ($xml->table->row as $row) {

    foreach ($row->cell as $cell) {
        echo $cell['label'], ':', $cell, "\n";
    }
}
```

O resultado é

```text
ID:1
NOME:Wallace
Número:33.55
ID:2
NOME:Wayne
Número:20.21
```