---
layout: post
color: "#222222"
title: Capturando a cor do pixel de uma imagem com HTML5 Canvas
image: "/uploads/covers/canvas_html5.png"
date: 2021-05-31T03:00:00.000+00:00
excerpt: Veja como capturar a cor de um píxel de uma imagem através do HTML5 canvas
  e Javascript
categories:
- canvas
- javascript
- HTML
sitemap: true
last_modified_at: 

---
```html
<canvas id="canvas"></canvas>
```

```javascript
const canvas = document.querySelector('#canvas');
const context = canvas.getContext('2d');

function drawImage(src)
{
    const img = document.createElement('img');

    img.src = src;

    img.addEventListener('load', () => {
        canvas.width  = image.width;
        canvas.height = image.height;
        context.drawImage(0, 0, canvas.width, canvas.height)
    })

}

drawImage('minha-imagem.jpg')
```

O objetivo agora é fazer com que, toda vez que o mouse passe sobre o canvas, a cor do pixel atual seja exibido. Podemos utilizar a captura do evento `mousemove` para fazer isso.

Veja:

```javascript
canvas.addEventListener('mousemove', function (e) {
    const rect = canvas.getBoundingClientRect();
    const x = (e.clientX - rect.left) * canvas.width / rect.width;
    const y = (e.clientY - rect.top) * canvas.height / rect.height;
})
```

Veja que acima, utilizamos o `getBoundingClientRect` e fizemos alguns cálculos para que a posição X e Y do canvas seja capturada corretamente. Isso garante que, caso ocorra  transformações do canvas com CSS, não haja erros na lógica da captura da posição do mouse.


## Capturando a cor do pixel do HTML5 Canvas

Agora que temos a posição X e Y do mouse, a única coisa que precisamos é extrair a informação do pixel desejado para descobrimos qual a cor do mesmo. Podemos fazer isso através da função `getImageData`


{% raw %}
<canvas id='canvas' width="300" style="width: 100%"></canvas>
<script>
const canvas = document.querySelector('#canvas');
const context = canvas.getContext('2d');
context.fillStyle = '#202020'
context.fillRect(0, 0, canvas.width, canvas.height);
canvas.addEventListener('mousemove', function (e) {
    const rect = canvas.getBoundingClientRect();
    const x = (e.clientX - rect.left) * canvas.width / rect.width;
    const y = (e.clientY - rect.top) * canvas.height / rect.height;
    context.fillStyle = 'red'
    context.fillRect(x, y, 1, 1)
    console.log({x, y})
    
})
</script>
{% endraw %}