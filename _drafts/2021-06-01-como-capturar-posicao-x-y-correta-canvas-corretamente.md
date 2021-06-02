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
Quando utilizamos o HTML5 Canvas, é comum desejarmos obter as coordenadas X e Y do mouse em relação ao elemento para iteragir com o mesmo. Porém é muito comum ocorrer erros e confusões ao tentar capturar estas coordenadas quando o `<canvas>` está transformado ou dimensionado através do CSS.



## Obtendo as coordenadas relativas do mouse em um Canvas

O código mais comum para obter as coordenadas X e Y do ponteiro de um mouse em relação ao canvas, é o seguinte:

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

O código acima tem como finalidade desenhar um quadrado de 5x5px quando o mouse é movido sobre o Canvas. Precisamos obter a posição `left` e `top` do elemento, pois os valores clientX e clientY são relativos à tela e não ao elemento.

Tudo ocorre bem acima, porém,
ao utilizar a mesma lógica quando o canvas possui alguma transformação pelo CSS, o comportamento é diferente.

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


Acima, é possivel notar que o cálculo realizado anteriormente não consida o dimensionamento ocorrido no `canvas` através do CSS. Isso ocorre porque as coordenadas do canvas são relativas a altura e largura definidas diretamente no elemento ou pelo Javascript (em outras palavras, o `width` e `height`definido diretamente no canvas).


## Obtendo a coordenadas de um Canvas redimensionado pelo css


Para corrigir isso, é necessário utilizar o `getBoundingClientRect` e calcular a proporção de acordo com o tamanho do elemento no cliente. Para isto, respectivamente, vamos dividir a largura e altura original do canvas pela largura e altura visivel no cliente.


```javascript

  const rect = canvas.getBoundingClientRect();
  const x = (event.clientX - rect.left) * canvas.width / rect.width;
  const y = (event.clientY - rect.top) * canvas.height / rect.height;


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