---
layout: post
color: "#222222"
title: 'Como capturar a posição X e Y correta do Canvas '
image: "/uploads/covers/canvas_html5.png"
date: 2021-06-01 03:00:00 +0000
excerpt: É comum ocorrer erros ao tentar capturar as coordenadas X  e Y do ponteiro
  do mouse sobre um elemento Canvas ao utilizar transformações ou redimensionamentos
  através do CSS. Veja como corrigir!
categories:
- canvas
- javascript
- HTML
sitemap: true

---
É comum ocorrer erros ao tentar capturar as coordenadas X  e Y do ponteiro do mouse sobre um elemento Canvas ao utilizar transformações ou redimensionamentos através do CSS.

Ao tentar utilizar o `event.clientX` ou `event.clientY`, o valor retornado é incorreto.

Isso ocorre porque o `event.clientX` e `event.clientY` não considera as transformações ocorridas em um `canvas` através do CSS.

Para corrigir isso é necessário utilizar o `getBoundingClientRect` e realizar alguns cálculos para descobrir a coordenada correta do `canvas` em relação a sua transformação ou redimensionamento pelo CSS.

Veja:

```javascript
canvas.addEventListener('mousemove', function (e) {
    const rect = canvas.getBoundingClientRect();
    const x = (e.clientX - rect.left) * canvas.width / rect.width;
    const y = (e.clientY - rect.top) * canvas.height / rect.height;
})
```