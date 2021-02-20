---
layout: post
title: Como gerar cores aleatórias no Javascript?
date: 2021-02-20 15:59:00 -0200
categories:
- javascript
sitemap: true
image: ''
excerpt: Nesse tutorial, aprenda como gerar cores aleatórias com Javascript, seja
  rgba ou hexadecimal.

---
## Gerando cor RGBA

```javascript
function gerar_cor(opacidade = 1) {
   let r = Math.random() * 255;
   let g = Math.random() * 255;
   let b = Math.random() * 255;
   
   return `rgba(${r}, ${g}, ${b}, ${opacidade})`;
}
```

### Explicação

A função `Math.random()` retorna um número float aleatório de `0` a `1`. Ao multiplicar por `255`, estamos dizendo que o valor máximo para o valor de qualquer elemento do `rgb` seja de `0` a `255`.

O parâmetro `opacity` tem como finalidade definir qual será a opacidade da cor. Por padrão deixamos o valor como `1`, para não ter opacidade. No RGBA, a intensidade da opacidade varia de `0` a `1`.

Sendo assim, poderíamos fazer:

```javascript
gerar_cor(1); // rgba(205.2355, 123.0555, 52.116, 1)
gerar_cor(0.5); // rgba(123.456, 51.323, 203.123, 0.5) 
```