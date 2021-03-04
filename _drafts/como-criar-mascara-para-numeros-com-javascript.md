---
layout: post
color: "#4A4A4A"
title: Como criar máscara para números com Javascript?
date: 2021-03-03T00:00:00.000-03:00
categories:
- javascript
sitemap: false
image: "/uploads/javascript.svg"
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