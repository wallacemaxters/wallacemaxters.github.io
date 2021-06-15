---
layout: post
date: 2021-06-15 15:28:46 -0300
last_modified_at: 2021-06-15 15:28:46 -0300
color: "#FFFFFF"
title: Como obter valores de variáveis do CSS com Javascript?
image: "/uploads/javascript.svg"
excerpt: ''
categories:
- css
- javascript
sitemap: true

---
```css
:root{
  --color-primary: #add555;
}
```

```javascript
const value = getComputedStyle(document.documentElement).getPropertyValue('--color-primary'); 
console.log(value); // '#add555'
```