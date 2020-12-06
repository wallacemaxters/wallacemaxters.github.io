---
layout: post
title: O que há de novo no PHP 8?
date: 2020-12-06 01:00:00 -0200
categories:
- PHP
sitemap: true
image: "/uploads/covers/php.png"
excerpt: O  PHP 8 veio cheio de novidades! Ele contém muitos novos recursos e otimizações.
  Veja algumas novidades do PHP 8 nesse artigo.

---
A versão 8.0 do PHP veio com bastante novidades.Esta versão contém muitos novos recursos e otimizações.

Vejamos alguns deles:

## Named Arguments

O PHP 8 suporta argumentos nomeados. Para funções/métodos cujo os parâmetros sejam opcionais, o PHP agora permite que você passe o nome do argumento para a função.

Versões anteriores:

```php
file_put_contents($hostname, $content, 0, $stream);
```

Versão 8:

```php8
file_put_contents($hostname, $content, context: $stream);
```

Isso é muito útil para "pular" a passagem de um parâmetro opcional e já definir o parâmetro desejado sem ter que considerar a posição do mesmo.

> Os _named arguments_ (argumentos nomeados) devem ser usado apenas após a passagem dos argumentos posicionais (os argumentos obrigatórios da função). No caso de `file_put_contents`, como no exemplo, o primeiro e segundo argumentos sempre são posicionais.

## Union Types

O PHP8 agora permite definir mais de um tipo para uma propriedade, ou parâmetros e retorno de tipos de funções/métodos.
De acordo com a documentação (tradução livre):

> Uma declaração de _union types_ aceita valores de vários tipos diferentes, em vez de um único.

Veja um exemplo:

```php
class Number {
    private int|float $number;

    public function setNumber(int|float $number): void {
        $this->number = $number;
    }

    public function getNumber(): int|float {
        return $this->number;
    }
}
```

## Match expression

O PHP 8 introduziu a expressão `match`. Ela lembra um pouco o `switch`, porém a finalidade é diferente. Uma delas é que `match` poderá ter o resultado armazenado em uma variável ou retornado. Além disso, ela pode comparar dois valores, sem a necessidade de incluir o `break` várias vezes.

Veja:

```php
$n = 5;

$resultado = match ($n) {
    1, 2 => 'um ou dois',
    3, 4 => 'três ou quatro',
    default => 'maior ou igual a 5',
};

var_dump($resultado); // 'maior ou igual a 5'
```

Caso `match` não tenha um `default` definido e o valor em questão não é compatível com as condições definidas, será lançado um `UnhandledMatchError`.

Ainda assim, há casos onde você não precisa saber exatamente se um valor é igual, mas apenas se ele é verdadeiro ou falso. Nesses casos, você pode usar `match`, passando `true` como parâmetro e analisando a variável dentro do mesmo para tal fim.

```php
$idade = 23;

$resultado = match (true) {
    $idade >= 65 => 'idoso',
    $idade >= 25 => 'adulto',
    $idade >= 18 => 'jovem adulto',
    default => 'criança',
};

var_dump($resultado); // 'jovem adulto'
```

## Consistência para tipos de erros em funções internas do PHP

Nas versões anteriores do PHP, geralmente, quando se passava um argumento com valor não esperado para uma função, o mesmo gerava um _"Warning"_.

Exemplo:

```php
strlen([]);
// PHP Warning:  strlen() expects parameter 1 to be string, array given in script.php on line 3
```

Porém, a versão PHP 8.0 introduziu melhorias para esses casos. No exemplo acima, ao executar no PHP 8, receberíamos o lançamento de `TypeError`.

Exemplo:

```php
strlen([]);

// PHP Fatal error:  Uncaught TypeError: strlen(): Argument #1 ($str) must be of type string, array given in script.php:3
```

Sendo assim, é possível ainda capturar o `TypeError`, conforme desejado.

Exemplo:

```php
try{
    strlen([]);
} catch (\TypeError $e) {
    var_dump($e);
}
```

## Novas funções

O PHP 8 introduziu algumas funções novas. Entre elas destaco
`str_contains`, `str_starts_with`, `str_ends_with`, que são funções para verificação de strings presente em muitas linguagens, como Python e Javascript.

### Exemplo da função str_contains

Nas versões anteriores do PHP, para verificar se uma string possuia determinada correspondência, utilizávamos a função `strpos`. 

Veja:

```php
foreach(['rato', 'barata', 'gato'] as $animal) {
    var_dump(strpos($animal, 'to') !== false);
}
```

Note que era necessário verificar se o retorno era diferente de `false`, pois `strpos` retornava o número referente a posição encontrada na string.

Porém, a função `str_contains` simplesmente retornará `boolean` caso a string seja ou não encontrada.

Exemplo:

```php
foreach(['rato', 'barata', 'gato'] as $animal) {
    var_dump(str_contains($animal, 'to'));
}

// Resultado:
// bool(true)
// bool(false)
// bool(true)
```