---
layout: post
color: "#222222"
title: 'Como capturar a posição X e Y correta do Canvas '
image: "/uploads/covers/canvas_html5.png"
date: 2021-06-01 03:00:00 +0000
excerpt: É comum ocorrer erros ao tentar capturar as coordenadas X  e Y do ponteiro
  do mouse sobre um elemento Canvas ao utilizar transformações/redimensionamentos
  através do CSS. Veja com o solucionar isso através deste tutorial.
categories:
- canvas
- javascript
- HTML
sitemap: true

---
```javascript

canvas.addEventListener('mousemove', function (e) {
    const rect = canvas.getBoundingClientRect();
    const x = (e.clientX - rect.left) * canvas.width / rect.width;
    const y = (e.clientY - rect.top) * canvas.height / rect.height;
})
```