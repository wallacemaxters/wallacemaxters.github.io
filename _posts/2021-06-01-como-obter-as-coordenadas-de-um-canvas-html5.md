---
layout: post
color: "#222222"
title: Como obter as coordenadas de um Canvas em HTML5?
image: "/uploads/covers/canvas_html5.png"
date: 2021-06-02 12:30:00 +0000
excerpt: Veja como obter as coordenadas X e Y relativas a um elemento Canvas no HTML5
categories:
- canvas
- javascript
- HTML
sitemap: true

---
Quando utilizamos o HTML5 Canvas, é comum desejarmos obter as coordenadas X e Y do mouse em relação ao elemento para iteragir com o mesmo. Porém é muito comum ocorrer erros e confusões ao tentar capturar estas coordenadas quando o `<canvas>` está transformado ou dimensionado através do CSS.

Através desse passo a passo, vamos aprender como capturar as coordenadas do canvas de maneira eficiente!

## Obtendo as coordenadas do mouse relativo ao Canvas

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


Como pode ser ver no exemplo anterior, é possivel notar que o cálculo realizado anteriormente não considera o tamanho do `canvas` pelo CSS. Isso ocorre porque as coordenadas do canvas são relativos ao tamanho definido diretamente no elemento ou pelo Javascript - em outras palavras, o `width` e `height`definido diretamente no `canvas`.


## Obtendo a coordenadas de um Canvas redimensionado pelo CSS


Para corrigir isso, é necessário corrigir o valor das coordenadas X e Y considerando o tamanho computado do Canvas no cliente. Basicamente, vamos dividir as dimensões originais do canvas pelas dimensões computadas no cliente e multiplicar pelas respectivas coordenadas.

Veja:

```javascript
const rect = canvas.getBoundingClientRect();
const x = (event.clientX - rect.left) * canvas.width / rect.width;
const y = (event.clientY - rect.top) * canvas.height / rect.height;
```

Como visto, utilizamos os valores `width` e `height` retornados por `canvas.getBoundingClientRect()`, que são as dimensões do `canvas` computadas no cliente. Assim, podemos aplicar a proporção sobre as coordenadas X e Y do elemento para efetuar a correção desejada.


O código final e o resultado são estes:

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