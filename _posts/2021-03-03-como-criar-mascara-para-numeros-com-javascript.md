---
layout: post
title: Como criar máscara para números com Javascript?
date: 2021-06-26T17:35:15.000-03:00
categories:
- codigo
- javascript
sitemap: true
image: "/uploads/javascript.svg"
excerpt: Função javascript para criar máscaras para número
max_posts: 0
last_modified_at: 
color: ''

---
```javascript
/**
 * Cria máscara para um número para o formato informado
 * 
 * @param string value
 * @param string placeholder
 * @param character 
 * @return string
 * 
 * */
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