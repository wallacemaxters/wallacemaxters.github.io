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
excerpt: "A extensão SimpleXML permite o carregamento/leitura de um documento ou uma string contendo um XML. Aprenda a utilizar todo o poder dessa extensão neste tutorial completo sobre esta extensão"
color: "#D43939"

---


A extensão SimpleXML permite que você leia um documento ou uma string contendo um XML. Você pode utilizar as funções `simplexml_load_file` ou `simple_xml_load_string` para fazer isso. Elas retornam uma instância da classe `SimpleXmlElement`. A primeira carrega o XML a partir de um arquivo, e a segunda, através de uma string contendo o XML.

Vamos ver abaixo alguns detalhes interessantes a respeito do funcionamento dessas funções. Utilizarei a função `simplexml_load_string` na maioria dos exemplos, mas mesmas operações podem ser aplicadas também ao chamar `simplexml_load_file`.

---

## Acessando os nós de um XML

Quando você carrega um XML através das funções da SimpleXML, elas retornam um objeto `SimpleXmlElement`. Cada propriedade deste objeto, corresponderá a um nó (tag) do seu XML. Sendo assim, você pode acessá-los, conforme o exemplo abaixo.

Código:

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

```text
object(SimpleXMLElement)#2355 (1) {
  [0]=> string(1) "Eu sou o C"
}
```

Como você deve ter notado, cada vez que você chama uma propriedade do objeto retornado, uma nova instância de `SimpleXmlElement` é retornada. Com isso, é sempre possível abrir o nó filho através de uma chamada encadeada. Isso porque cada instância de `SimpleXMLElement` é a representação de cada nó presente em seu documento XML.

Veja:

```php
var_dump(
    $simple_xml->a,
    $simple_xml->a->b,
    $simple_xml->a->b->c
);
```

Resultado:

```text
object(SimpleXMLElement)#2580 (1) {
  ["b"]=> object(SimpleXMLElement)#2563 (1) {
    ["c"]=> string(10) "Eu sou o C"
  }
}
object(SimpleXMLElement)#2565 (1) {
  ["c"]=> string(10) "Eu sou o C"
}
object(SimpleXMLElement)#2545 (1) {
  [0]=> string(10) "Eu sou o C"
}
```

--- 

{% include ads_article.html %}

--- 
## Acessando os atributos dos nós do XML

Você pode acessar os atributos dos nós (tags) de duas formas. 

Na primeira delas, você pode acessar como se fossem índices de um `array`. 

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

```text
object(SimpleXMLElement)#2354 (1) {
  [0]=> string(5) "13.55"
}
```

A segunda forma, você pode utilizar o método `attributes`, que permite você acessar os atributos de um nó do seu documento através de propriedades.

```php
var_dump($simple_xml->a->b->attributes()->numero);
```

O resultado será:

```text
object(SimpleXMLElement)#2354 (1) {
  [0]=> string(5) "13.55"
}
```

### Convertendo os valores de atributos e nós

Como dito anteriormente, em todas as chamadas das propriedades do objeto SimpleXMLElement, o retorno é sempre um novo `SimpleXmlElement`. E isso é ocorre tanto para os nós (tags) como para os atributos. Porém, na maioria dos casos, você pode desejar que esses valores estejam disponíveis em um tipo específico do PHP, como `int`, `float` ou `string`. Felizmente, é perfeitamente possível e simples fazer a conversão desses valores. Basta fazer um `cast` na propriedade ou nó que você deseja converter para determinado tipo.

Exemplo:

```php
var_dump((float) $simple_xml->a->b['numero']); // float(13.55)
var_dump((string) $simple_xml->a->b['nome']); // string(5) valor)
```


----

## Iterando sobre os nós

Um nó pode não conter apenas um filho, mas vários, como no exemplo abaixo:


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

O objeto `SimpleXmlElement` também permite que acessemos esses filhos através de índices numéricos, como se fosse um `array`. 

Exemplo:

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

var_dump($simple_xml->table->row[1]); // Acessa o segundo nó "table > row"
```
Resultado:

```text
object(SimpleXMLElement)#2591 (1) {
  ["cell"]=> array(3) {
    [0]=> string(1) "2"
    [1]=> string(7) "Maxters"
    [2]=> string(5) "24.12"
  }
}

```

Também podemos iterar sobre eles através do `foreach`.

```php
foreach ($simple_xml->table->row as $row) {

    foreach ($row->cell as $cell) {
        echo $cell['label'], ':', $cell, "\n";
    }
}
```

```text

ID:1
NOME:Wallace
Número:33.55
ID:2
NOME:Maxters
Número:24.12
```


Além disso, é possível retornar a quantidade de nós filhos do seu documento XML, através da função ou método `count`.

Veja:

```php
var_dump(count($simple_xml->table->row)); // int(2)
var_dump($simple_xml->table->row->count()); // int(2)

var_dump($simple_xml->table->row->cell->count()); // int(3)
var_dump(count($simple_xml->table->row->cell)); // int(3)
```

> **Nota**: Embora pareça óbvio que as operações de iteração e acesso a nós filhos devam ocorrer, o SimpleXMLElement **não se comporta** exatamente como um `array` nesses aspectos, por isso achei importante destacar bem esse trecho.

---

{% include ads_article.html %}

---


## Acessando nós que possuem namespace

Para acessar os nós que possuam namespace, você deve utilizar o método `children`. Deve ser informado o _namespace_ no primeiro argumento e `true`, no segundo.

Assim:

```php
$xml = '<root>
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
```

O resultado será

```text
string(7) "Maçãs"
string(7) "Bananas"
```

----

## Como tratar erros de carregamento do XML?

As funções da extensão SimpleXML por padrão emitem uma mensagem `E_WARNING` caso haja erro durante o processo de carregamento do XML.

Por exemplo, ao executar o seguinte código:

```php
simplexml_load_string('inválido');
```

Você receberá o seguinte erro:

```text
PHP Warning:  simplexml_load_string(): Entity: line 1: parser error : Start tag expected, '<' not found
```

Mas, na maioria dos caso, essas mensagens de erro são indesejáveis, precisando de uma validação melhor para esses casos.

Existem duas formas de fazermos isso.

### Usando o operador de supressão de erro

Você pode tratar essa mensagem `E_WARNING` utilizando o operador de supressão de mensagens de erro (o famoso `@` no PHP). Apesar da mensagem ser suprimida, o `simplexml_load_string` retornará `false` caso ocorra algum erro de leitura.

```php
$xml = @simplexml_load_string('inválido');

if ($xml === false) {
    throw new \RuntimeException('Ocorreu um erro ao processar o XML');
}
```

### Tratando os erros com a função libxml_use_internal_errors

Outra maneira de tratar os erros de carregamento do XML é utilizando a função `libxml_use_internal_errors`. Esta função desabilita as mensagens de erro caso seja passado `true` como argumento e faz com que as informações dos erros sejam internamente armazenados. É possível recuperar o erro ocorrido na última tentativa de carregar um documento XML através da função `libxml_get_last_error`.

Sendo assim, podemos verificar se o carregamento do SimpleXML retornou `false` e, em seguida, exibir as informações do erro.

Veja:

```php
libxml_use_internal_errors(true);

$xml = simplexml_load_string('inválido');

if ($xml === false) {
    $error = libxml_get_last_error();
    var_dump($error);
    exit($error->message);
}

// processa seu XML
```

O resultado será:

```text
object(LibXMLError)#2358 (6) {
  ["level"]=> int(3)
  ["code"]=> int(4)
  ["column"]=> int(1)
  ["message"]=> string(34) "Start tag expected, '<' not found"
  ["file"]=> string(0) ""
  ["line"]=> int(1)
}

""Start tag expected, '<' not found"
```

**Nota**: Após o tratamento de erro, em alguns cenários, você pode desejar chamar `libxml_clear_errors` para limpar os últimos erros reportados ao tentar chamar alguma função da extensão Simple XML.