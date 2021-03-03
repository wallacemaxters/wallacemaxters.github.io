---
layout: post
color: "#222222"
title: Como criar máscara para números com Javascript?
date: 2021-03-03 00:00:00 -0300
categories: []
sitemap: false
image: ''
excerpt: ''

---
```javascript
function mask ( value, placeholder, character = '#') {
   
   var result = '';
   
   for (var i = 0, j = 0; i < placeholder.length; i++) {
      if (placeholder[i] === character) {
          result += value.charAt(j++);
      } else {
         result += placeholder.charAt(i);
      }
   }
   
   return result;
}
```