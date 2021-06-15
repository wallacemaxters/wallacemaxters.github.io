---
layout: post
date: 2021-06-15 13:39:00 -0300
last_modified_at: 2021-06-15 13:39:00 -0300
color: "#222222"
title: Como obter os parâmetros query string de um arquiov Javascript?
image: ''
excerpt: ''
categories: []
sitemap: false

---
```javascript
const url = new URL(document.currentScript.getAttribute('src'));
const scriptParams = Object.fromEntries(url.searchParams)
console.log(scriptParams);
```