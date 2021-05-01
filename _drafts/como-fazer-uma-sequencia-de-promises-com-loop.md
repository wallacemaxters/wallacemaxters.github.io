---
layout: post
last_modified_at: 2021-04-30 22:59:44 -0300
color: "#222222"
title: Como fazer uma sequência de Promises com loop?
image: ''
date: 2021-04-30 22:59:00 -0300
excerpt: Já precisou de processar um loop com  várias operações assíncronas, que precisam
  ser processadas em sequência? Neste tutorial vamos aprender isso de um jeito bem
  simples.
categories:
- javascript
sitemap: false

---
```js
async function asyncFunction ( num ) {
	return new Promise((resolve, reject) => {
    	setTimeout(() => {
           console.log(num);
           resolve(num);
        }, num * 100)
}

let promise = Promise.resolve();

for (let i = 0; i < 10; i++) {
  promise = promise.then(() => asyncFunction (i));
}
```