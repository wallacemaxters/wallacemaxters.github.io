---
layout: post
title: O que há de novo no PHP 8?
date: 2020-12-06 01:00:00 -0200
categories:
- php
sitemap: true
image: "/uploads/covers/php.png"
excerpt: O  PHP 8 veio cheio de novidades! Ele contém muitos novos recursos e otimizações.
  Veja algumas novidades do PHP 8 nesse artigo.

---
PHP 8.0 é uma atualização importante da linguagem PHP.

Ele contém muitos novos recursos e otimizações, incluindo argumentos nomeados, tipos de união, atributos, promoção de propriedade do construtor, expressão de correspondência, operador nullsafe, JIT e melhorias no sistema de tipo, tratamento de erros e consistência.

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
> Uma declaração de *union types* aceita valores de vários tipos diferentes, em vez de um único.


Veja um exemplo:

```
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

var_dump($resultado);
```