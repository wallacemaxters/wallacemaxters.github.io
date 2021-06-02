---
layout: post
color: "#222222"
title: Como capturar corretamente as coordenadas de um Canvas em HTML5?
image: "/uploads/covers/canvas_html5.png"
date: 2021-06-01T03:00:00.000+00:00
excerpt: Veja como obter as coordenadas do mouse em relação ao Canvas quando o mesmo
  é afetado pelas transformações do CSS.
categories:
- canvas
- javascript
- HTML
sitemap: true

---
Quando utilizamos o HTML5 Canvas, é comum desejarmos obter as coordenadas X e Y do mouse em relação ao elemento para iteragir com o mesmo. Porém é muito comum ocorrer erros e confusões ao tentar capturar essas coordenadas X e Y em um `<canvas>` que foi transformado ou dimensionado através do CSS.

## Obtendo as coordenadas relativas do ponteiro do mouse em um Canvas

O código mais comum para obter as coordenadas X e Y do ponteiro de um mouse em relação a um elemento, é o seguinte:

```html
<canvas id='canvas' width="300" height="100"></canvas>
```

```javascript
const canvas = document.querySelector('#canvas');
const context = canvas.getContext('2d');
context.fillStyle = '#000000'
context.fillRect(0, 0, canvas.width, canvas.height);
canvas.addEventListener('mousemove', function (event) {
    // captura a posição X e Y do CANVAS 
    const rect = canvas.getBoundingClientRect();
    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;

    context.fillStyle = '#ffffff'
    context.fillRect(x, y, 5, 5)
    console.log({x, y})  
})
```


Resultado:
<canvas title="Passe o mouse sobre o Canvas" id='canvas-normal' width="500" height="100"></canvas>


<script>
document.addEventListener('DOMContentLoaded', function () {
    const canvas = document.querySelector('#canvas-normal');
    const context = canvas.getContext('2d');
    context.fillStyle = '#000000'
    context.fillRect(0, 0, canvas.width, canvas.height);
    canvas.addEventListener('mousemove', function (event) {
        const rect = canvas.getBoundingClientRect();
        const x = event.clientX - rect.left;
        const y = event.clientY - rect.top;
        context.fillStyle = '#ffffff'
        context.fillRect(x, y, 5, 5)
        
    })
})
</script>

***

O código acima tem como finalidade desenhar um quadrado de 5x5 px nas coordenadas em que o ponteiro do mouse é movido sobre o Canvas. Note que tudo ocorre bem acima, sem nenhum problema.

Porém, ao utilizar a mesma lógica quando o canvas possui alguma transformação pelo CSS, o comportamento é inesperado.

Veja:

```html
<canvas style="width: 100%" id='canvas' width="300" height="100"></canvas>
```


Resultado:

<canvas style="width:  100%" id='canvas-errado' width="500" height="100"></canvas>


<script>
document.addEventListener('DOMContentLoaded', function () {
    const canvas = document.querySelector('#canvas-errado');
    const context = canvas.getContext('2d');
    context.fillStyle = '#000000'
    context.fillRect(0, 0, canvas.width, canvas.height);
    canvas.addEventListener('mousemove', function (event) {
        const rect = canvas.getBoundingClientRect();
        const x = event.clientX - rect.left;
        const y = event.clientY - rect.top;
        context.fillStyle = '#ffffff'
        context.fillRect(x, y, 5, 5)
        
    })
});
</script>

---


Isso ocorre porque o cálculo realizado anteriormente não considera as transformações ocorridas em um `canvas` através do CSS.


## Obtendo as coordenadas do mouse em relação ao canvas corretamente


Para corrigir isso, é necessário utilizar o `getBoundingClientRect` e realizar alguns cálculos para descobrir a coordenada correta do `canvas` em relação a sua transformação ou redimensionamento pelo CSS.

O código mínimo é o seguinte:

```javascript
canvas.addEventListener('mousemove', function (event) {
  const rect = canvas.getBoundingClientRect();
  const x = (event.clientX - rect.left) * canvas.width / rect.width;
  const y = (event.clientY - rect.top) * canvas.height / rect.height;

})
```

Veja:

```html
<canvas id="canvas" width="600" style="width: 100%"></canvas>
```

```javascript

const canvas = document.querySelector('#canvas');
const context = canvas.getContext('2d');
context.fillStyle = '#202020'
context.fillRect(0, 0, canvas.width, canvas.height);

canvas.addEventListener('mousemove', function (event) {
    const rect = canvas.getBoundingClientRect();
    const x = (event.clientX - rect.left) * canvas.width / rect.width;
    const y = (event.clientY - rect.top) * canvas.height / rect.height;

    context.fillStyle = '#ffffff';
    context.fillRect(x, y, 5, 5)
})
```

Resultado:

<canvas id='canvas-correto' width="600" style="width: 100%"></canvas>

<script>
document.addEventListener('DOMContentLoaded', function (e) {
    const canvas = document.querySelector('#canvas-correto');
    const context = canvas.getContext('2d');
    context.fillStyle = '#202020'
    context.fillRect(0, 0, canvas.width, canvas.height);
    canvas.addEventListener('mousemove', function (event) {

        const rect = canvas.getBoundingClientRect();

        const x = (event.clientX - rect.left) * canvas.width / rect.width;
        const y = (event.clientY - rect.top) * canvas.height / rect.height;

        context.fillStyle = '#ffffff'
        context.fillRect(x, y, 5, 5)

        
    })
});
</script>