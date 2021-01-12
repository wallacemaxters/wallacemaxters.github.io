---
layout: post
title: Como redimensionar uma imagem com Javascript?
date: 2020-05-18T00:00:00.000-03:00
categories:
- javascript
- imagem
- canvas
sitemap: true
image: "/uploads/covers/canvas_html5.png"
excerpt: 'HTML5: Aprenda a redimensionar uma imagem com Javascript e a tag canvas.'

---
Nesse tutorial, estarei ensinando uma maneira de redimensionar a imagem através do Javascript.

## A tag <canvas/>

Utilizaremos a tag `<canvas>`, que está disponível no HTML5. De maneira resumida, a tag `<canvas>` permite desenharmos algo nela através do Javascript. Ela também permite você exporte o desenho para o formato de imagem. E é isso que vamos utilizar para redimensionar uma imagem.

Para facilitar as coisas, neste tutorial,  vamos criar algumas funções, separando melhor o código, para entendermos melhor os passos que precisamos para efetuar essa operação.

## Criando a função para carregar a imagem

Para iniciar,  vamos criar uma função que carregue a imagem desejada.  Ela retorna uma `Promise`, que devole uma tag `<img>`  já carregada.

A imagem precisa estar completamente carregada para que possamos passar ao próximo passo, pois só assim conseguimos obter valores de largura e altura da mesma. Usaremos a altura e largura para redimensionar a imagem posteriormente.

Código da função:

```javascript
function loadImage(img, src) {
    return new Promise((resolve, reject) => {
        img.src = src;
        img.completed ? resolve(img) : img.addEventListener('load', function () {
            resolve(img)
        });
        img.addEventListener('error', reject);
    })
}
```

## Criando a função de redimensionamento da imagem

Em seguida,  vamos criar a função que redimensionará a imagem. Usamos internamente a função `loadImage` para carregar a imagem que queremos redimensionar. Em seguida, usamos o segundo parâmetro para podemos definir o novo tamanho que queremos para a imagem. Este parâmetro vai ser um `Object`, que recebe `height` e/ou `width`.

Internamente, a função faz com que a imagem seja escalada automaticamente para o novo tamanho, caso seja informado apenas a altura ou apenas a largura para a nova imagem.

Código:

```javascript

function resizeImage(src, options) {

    return loadImage(document.createElement('img'), src).then(function (image) {

        var canvas = document.createElement('canvas');

        if (options.width && !options.height) {
            options.height = image.height * (options.width / image.width)
        } else if (!options.width && options.height) {
            options.width = image.width * (options.height / image.height)
        }

        Object.assign(canvas, options);

        canvas.getContext('2d').drawImage(image, 0, 0, canvas.width, canvas.height);

        return new Promise(function (resolve) {
            canvas.toBlob(resolve, options.type || 'image/png', options.quality)
        })
    })
}
```

Mais uma vez preferi retornar uma `Promise`. Basicamente, quando toda operação for concluída, retornaremos um `Blob`. O `Blob` tornará prático tanto o upload da imagem redimensionada, quanto a exibição da mesma no cliente.

## Redimensionando a imagem

No nosso exemplo, vamos utilizar um `input[type=file]` para carregar uma imagem e, em seguida, exibir tanto a imagem original como a redimensionada.

Veja o código:

```html
<input type="file" id="file" />

<div>
  <h4>Original</h4>
  <img id="original">
</div>


<div>
  <h4>Resized</h4>
  <img id="resized">
</div>
```

```javascript
window.addEventListener('load', function () {
  
  var file = document.querySelector('#file');
  
  file.addEventListener('change', function () {
     var image = file.files[0];
    
     var src = URL.createObjectURL(image);
    
     document.querySelector("#original").src = src;
    
     resizeImage(src, {width: 200}).then(function (blob) {
        document.querySelector("#resized").src = URL.createObjectURL(blob)
     })
  });
})
```

No exemplo acima, usamos a função `URL.createObjectURL`. Essa função faz com que o `Blob` tenha uma URL temporária, contendo a nossa  imagem carregada na memória.

Ao selecionar a imagem no `input[type=file]`, podemos ver em seguida a imagem original e a imagem redimensionada.

Veja:

![Como redimensionar uma imagem com Javascript](/uploads/captura-de-tela-de-2020-05-30-16-48-13.png)