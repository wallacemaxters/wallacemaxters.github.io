---
layout: post
date: 2021-06-15T15:28:46.000-03:00
last_modified_at: 2021-06-15T15:28:46.000-03:00
color: "#FFFFFF"
title: Como obter ou definir valores de variáveis do CSS com Javascript?
image: "/uploads/codigo-notebook-html.jpg"
excerpt: Aprenda a obter ou definir variáveis no CSS através do Javascript!
categories:
- css
- javascript
sitemap: true
max_posts: 5

---
No CSS, é possível definir variáveis, contendo valores específicos, que podem ser reutilizadas e modificadas na sua folha de estilo. Além disso ter facilitado bastante a escrever um arquivo CSS, é possível obter ou modificar os valores dessas variáveis através do Javascript.


## Obtendo o valor de uma variável CSS pelo Javascript

Primeiramente, vamos suport que você definiu pelo CSS uma variável no selector `:root`. Para acessá-la pelo Javascript, é necessário utilizar `document.documentElement`.

Veja:

```css
:root{
  --color-primary: #add555;
}
```

```javascript
const value = getComputedStyle(document.documentElement).getPropertyValue('--color-primary'); 
console.log(value); // '#add555'
```

Você também pode obter o valor da variável definida pelo CSS utilizando um elemento filho, já que no CSS é possível sobrescrever a definição de uma variável.

Veja:

```css
:root {
  --color-primary: #add555;
}

.parent > .child {
  --color-primary: #ff0000;
}
```

```javascript
const el = document.querySelector('.parent > .child');
const value = getComputedStyle(el).getPropertyValue('--color-primary');

console.log(value); // '#ff0000'
```

## Definindo ou modificando variáveis do CSS pelo Javascript

Você também pode modificar uma variável CSS através do Javascript. Você só precisa usar a boa e velha propriedade `style`, presente nos elementos dos documentos e chamar `setProperty`.

Veja:

```css
body {
  --color: pink;
}
```

```javascript
document.body.style.setProperty('--color', 'green');
```