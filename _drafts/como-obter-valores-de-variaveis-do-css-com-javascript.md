---
layout: post
date: 2021-06-15 15:28:46 -0300
last_modified_at: 2021-06-15 15:28:46 -0300
color: "#FFFFFF"
title: Como obter valores de variáveis do CSS com Javascript?
image: ''
excerpt: ''
categories:
- css
- javascript
sitemap: false

---
```javascript
getComputedStyle(document.body).getPropertyValue('--color-primary')
```