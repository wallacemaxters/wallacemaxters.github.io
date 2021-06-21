---
layout: post
title: Como verificar se o objeto é vazio em Javascript?
date: 2021-01-29T02:35:00.000-02:00
categories:
- javascript
sitemap: true
image: "/uploads/javascript-objeto-vazio.jpeg"
excerpt: Em Javascript, Object não possui a propriedade length. Porém há muitas maneiras
  de se verificar se um objeto é vazio. Aprenda neste tutorial.
last_modified_at: 2021-06-20 21:36:00 -0300
color: ''

---
Em Javascript, sabemos que é possível saber se um `Array` é vazio simplesmente utilizando a propriedade `length`. Se ela for `0`, significa que o `Array` está vazio.

Exemplo:

```javascript
var arr1 = [1, 2, 3];
var arr2 = [];

console.log(arr1.length === 0); // false
console.log(arr2.length === 0); // true
```

Porém `Object` não possui `length`. Ou seja, não há maneira de saber o tamanho de um Object, da maneira que fazemos com o `Array`. Sendo assim, como podemos saber se o mesmo é vazio ou não?

## Verificando se o objeto é vazio

Para fazer isso em Javascript, existem diversas maneiras. Vejamos algumas delas, nas versões mais recentes e nas mais antigas.

### Nas versões de navegadores mais recentes

Em navegadores mais atuais, podemos utilizar alguns método presentes em `Object`. Entre eles, podemos destacar os seguintes:

#### Utilizando Object.values

O método `Object.values` retorna todos os valores de um objeto em um `Array`.

```javascript
console.log(Object.values({"nome": "Wallace", "nick": "Maxters"})); 
// ['Wallace', 'Maxters']
```

Sendo assim, é possível utilizar a mesma abordagem do Array para checar se o mesmo é vazio.

Exemplo:

```javascript
var vazio = {};
var nao_vazio = {"nome": "Wallace"};
if (Object.values(vazio).length === 0) {
  console.log('objeto está vazio');
}

if (Object.values(nao_vazio).length > 0) {
  console.log('objeto não está vazio');
}
```

#### Utilizando Object.keys

Da mesma forma acima, o `Object.keys` retorna um `Array` de chaves de um objeto.

Exemplo:

```javascript
console.log(Object.keys({"nome": "Wallace", "nick": "Maxters"})); 
// ['nome', 'nick']
```

Sendo assim, basta usar a mesma abordagem de `Object.values`:

```javascript
var vazio = {};
var nao_vazio = {"nome": "Wallace"};
console.log(Object.keys(vazio).length === 0); // true
console.log(Object.keys(nao_vazio).length === 0); // false
```

#### Utilizando Object.entries

O método `Object.entries` retorna um `Array` contendo a chave e o valor do objeto em um `Array`.

Por exemplo:

```javascript
var user = {
  "nome": "Wallace",
  "nick": "Maxters"
};
Object.entries(user); // [['nome', 'Wallace'], ['nick', 'Maxters']]
```

Sendo assim, também podemos usar  `length`.

```javascript
var nao_vazio = {"valor": 5};
var vazio = {};
if (Object.entries(vazio).length === 0) {
  console.log('vazio');
}

if (Object.entries(nao_vazio).length > 0) {
  console.log('não vazio');
}
```

----

### Versões mais antigas

Nas versões mais antigas dos navegadores, confesso que o código talvez não possa parecer tão elegante.

#### Utilizando JSON.stringify

O método `JSON.sringify` converte um valor em Javascript para `JSON`. Sendo assim, um objeto vazio sempre seria equivalente a string `"{}".`

Então, bastaria comparar:

```javascript
if (JSON.stringify(vazio) === '{}') {
  console.log('Objeto está vazio');
}

if (JSON.stringify(nao_vazio) !== '{}') {
   console.log('Objeto não está vazio');
}
```

#### Utilizando um Loop

Em Javascript, o `Object` pode ser iterado com o laço de repetição `for`.  Basicamente, podemos criar uma função que faça um loop no `Object`, retornando `false` caso entre no `for` e `true` caso não entre.

Basta fazer assim:

```javascript
function isEmptyObject(object) {
    for (var name in object) return false;
    return true;
}

if (isEmptyObject({})) {
    console.log('Object vazio');
}

if (! isEmptyObject({nome: "wallace"}) {
    console.log('Objeto não está vazio');
}
```