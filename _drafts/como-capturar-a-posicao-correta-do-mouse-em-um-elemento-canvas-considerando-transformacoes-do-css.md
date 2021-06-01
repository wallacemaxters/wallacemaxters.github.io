---
layout: post
color: "#222222"
title: Como capturar a posição correta do mouse em um elemento canvas transformado
  com CSS?
image: "/uploads/covers/canvas_html5.png"
date: 2021-06-01 03:00:00 +0000
excerpt: Aprenda como capturar a posição correta do mouse em um elemento canvas transformado
  com CSS
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