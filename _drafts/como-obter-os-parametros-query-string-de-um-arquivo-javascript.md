---
layout: post
date: 2021-06-15 13:39:00 -0300
last_modified_at: 2021-06-15 13:39:00 -0300
color: "#222222"
title: Como obter os parâmetros query string de um arquivo Javascript?
image: "/uploads/javascript.svg"
excerpt: ''
categories:
- javascript
sitemap: true

---
No Javascript, é possivel obter os valores de query string passados para um determinado script declarado no atributo `src`, como no exemplo abaixo:

```<script src="app.js?campo=valor"></script>```

No exemplo acima, para obter a query string informada, basta usar o código abaixo:

```javascript
const url = new URL(document.currentScript.getAttribute('src'));
const scriptParams = Object.fromEntries(url.searchParams)
console.log(scriptParams);
```

Através de `searchParams`, você pode obter opcionamente apenas um parâmetro.

```javascript
// ./script.js?campo=valor
console.log(url.searchParams.get('campo')); // 'valor'
```

## O que é o document.currentScript?

A propriedade `document.currentScript` retorna o elemento `<script>` cujo o script está sendo executado.