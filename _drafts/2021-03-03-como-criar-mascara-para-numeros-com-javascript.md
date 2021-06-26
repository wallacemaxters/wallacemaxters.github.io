---
layout: post
title: Como criar máscara para números com Javascript?
date: 2021-03-03T00:00:00.000-03:00
categories:
- javascript
sitemap: false
image: "/uploads/javascript.svg"
excerpt: ''
max_posts: 0
---

```javascript
function mask ( value, placeholder, character = '#') {
   
   let result = '';
   
   for (let i = 0, j = 0; i < placeholder.length; i++) {
      if (placeholder[i] === character) {
          result += value.charAt(j++);
      } else {
         result += placeholder.charAt(i);
      }
   }
   
   return result;
}
```

Exemplos:

```javascript
mask('31999999999', '(##) #####-####'); // '(31) 99999-9999'
```
