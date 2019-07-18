---
layout: post
title: Não confunda os métodos da Collection com os do Eloquent!
date: 2019-07-17 00:00:00 -0300
categories:
- laravel
- eloquent
sitemap: false
image: ''

---
No Laravel, temos o Eloquent que, na minha opnião, é uma das melhores coisas existentes no Laravel. Sua forma de trabalhar com os relacionamentos e com as consultas ajudam bastante a agilizar o desenvolvimento.  

Algumas coisas no Eloquent parece funcionar como se fosse mágica. E eu confesso que, sempre que tenho essa impressão, costumo a querer investigar a fundo para ver como as coisas funcionam "por baixo dos panos".

Eu tenho a \[boa\] mania de sempre olhar o código-fonte para ver como os frameworks funcionam. E percebi que tem algumas coisas sobre o Eloquent que pode fazer algumas pessoas caírem em uma armadilha por não saber o que estão fazendo.

Por exemplo, alguém que está começando a usar o Laravel agora, talvez não soubesse responder qual é a diferença entre as duas chamadas abaixo:

```
Usuario::count();
Usuario::get()->count();
```

Ou mesmo dessa:

```
Usuario::where('idade', '>', 18)->count();
Usuario::where('idade', '>', 18)->get()->count();
```


Pode parecer óbvio para alguns, mas eu já vi muitas pessoas usarem as duas formas com se fosse a mesma coisa. 

**Qual é a diferença?**

Eu creio que é preciso explicar as diferenças aqui.No primeiro exemplo, ao chamar `Usuario::count()`, você está fazendo uma consulta no banco de dados para trazer quantos registros a tabela vinculada aquele model tem.

Em outras palavras, será executado uma SQL para contar os registros. Algo como:

```SELECT COUNT(*) FROM usuarios```

Na segunda chamada, ao usar `Usuario::get()->count()` você está fazendo algo muito diferente do primeiro exemplo. Você está simplesmente chamando TODOS os registros existentes no banco de dados e contando cada um deles pelo PHP.

Para entender melhor: `Usuario::get()` vai trazer uma lista de usuários presente no banco de dados. Essa lista não vem em um `array`, e sim dentro de uma instância da classe interna do Laravel chamada `Illuminate\Database\Eloquent\Collection`. Essa classe por sua vez **também tem um método chamado `count`**. E o `count` dessa `Collection` não conta os itens através de uma SQL Query, mas através da função `count` do PHP, contando cada item trazido nessa coleção.

Eis aqui um problema: Se as pessoas usam `Usuario::get()->count()` achando que isso está fazendo uma consulta no banco, isso pode gerar um sério problema. Pois, se a consulta retornar `10000` registros, isso estará carregando 10000 registros para a memória apenas para contá-lo, ao invés de simplesmente retornar um número inteiro, como no caso de `Usuario::count()`.

Isso pode parecer algo inocente, mas ao meu ver é um erro grave.

E para variar, além do exemplo citado acima, existem outros métodos dentro da classe `Collection` que possuem os mesmos nomes dos métodos que fazem operações com queries.

Posso citar os que lembro nominalmente: `sum`, `pluck`, `find`, `first`, `avg`, `where` ... e é bem provável que tenha outros...

Por exemplo, no caso do `sum`, poderíamos ter o mesmo problema mostrado anteriormente.

Veja:

```
// SELECT avg(idade) FROM usuarios

Usuario::avg('idade'); 

// Carrega todos os usuários para a memória 
// e soma a média da idade pelo PHP
Usuario::get()->avg('idade'); 

``` 

## Como distiguir esses métodos?

A primeira coisa que é necessário reparar é que os métodos no Eloquent porem ser chamados tanto como estático como dinâmicos. Exemplo:

```
Usuario::count()
Usuario::where('valor', '=', 1)->count();
```

A primeira coisa que é preciso entender nesse caso: O método `count` na verdade não pertence ao `Model` em si, e sim a uma classe interna chamada de `Illuminate\Database\Eloquent\Builder`.

O que chamo de `Eloquent` é a classe `Model`, que é na verdade `Illuminate\Database\Eloquent\Model`, que é uma classe abstrata que usamos para herdar em nossos models, para realizamos consultas.

Internamente, a classe `Model` tem definido os métodos `__call` e `__callStatic`. Estes são dois métodos mágicos do PHP, que tem como finalidade *definir o comportamento da classe ao tentar chamar um método não declarado na mesma*.

O `Model` se vale desse comportamento e, ao chamar o método `count`, ou `where`, ou `sum`, ele chama esses métodos de `Illuminate\Database\Eloquent\Builder`, pois na realizade eles **não percentem à classe Model**.

Dessa forma, as duas chamadas abaixo são equivalentes:

```
Usuario::sum('idade');  // 'sum' como método estático
Usuario::query()->sum('idade');  // 'sum' como método dinamico
```

Como o próprio nome indica, a classe `Builder` tem como objetivo "montar" a SQL de acordo que os métodos são chamados. Cada chamada "monta" uma parte da SQL. E por fim, quando você chama `get`, `first`, `sum` ou `count`, você está fazendo uma operação no banco de dados.

Desses citados, o `get` é o que retorna uma coleção (a `Collection`). E é esta `Collection` que tem os métodos que possuem os nomes parecidos com as da `Builder`.

Sendo assim, entendemos que, enquanto não charmamos o método `get`, estamos na verdade trabalhando com *query builder* do Laravel, cuja função é montar a SQL. E ao chamar `get`, estamos trazendo os resultados do `SELECT` em uma coleção.

Exemplo:
```
$query = Usuario::where('idade', '>', 18); // Builder
$usuarios = $query->get(); // Collection

$usuarios->count(); // contagem vinda da coleção
$query->count();    // contagem vinda do banco 
```


Além disso, nada impede que você descubra quem é quem através de um simples debug. Você pode tentar a função `get_class`, por exemplo, para saber a classe do objeto utilizado.

 ```
 $query = Usuario::where('nome', 'Wallace');
 
 var_dump(get_class($query)); // Builder
 
 var_dump(get_class($query->get())); // Collection
 ```
 
 