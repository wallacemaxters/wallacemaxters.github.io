---
layout: post
color: "#222222"
title: Removendo caracteres não numéricos de uma string com Javascript?
date: 2021-03-03 00:00:00 -0300
categories:
- javascript
sitemap: false
image: ''
excerpt: ''

---
```javascript
function somenteNumeros(string) {
    return string.replace(/\D+/g, '');
}
```