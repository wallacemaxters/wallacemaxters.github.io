---
layout: post
date: 2021-07-05 20:13:46 +0000
last_modified_at: 2021-07-05 20:13:46 +0000
color: "#222222"
max_posts: 2
title: Como verificar se um Array é vazio em Javascript?
image: ''
excerpt: ''
categories:
- javascript
sitemap: true

---
No Javascript, o objeto global `Array` não possui um método específico para checar se o mesmo está vazio ou não.
Mas podemos verificar o tamanho do `Array` e comparar o valor com zero para saber se o mesmo é vazio. Podemos obter o tamanho do `Array` no javascript através da propriedade `length`.

Exemplo:

```javascript
const naoVazio = [1, 2, 3];
const vazio = [];

console.log(naoVazio.length === 0); // false
console.log(vazio.length === 0); // true
```

Desta forma, podemos utilizar a estrutura condicional para executar uma ação quando o `Array` não for vazio.

```javascript
const naoVazio = [1, 2, 3];

if (naoVazio.length > 0) {
    console.log('Não está vazio');  
} else {
    console.log('Está vazio');  
}
```