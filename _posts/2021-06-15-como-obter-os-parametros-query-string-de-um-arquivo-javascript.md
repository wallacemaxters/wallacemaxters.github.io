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
Para obter a query string passada para um script, basta usar o código abaixo:

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