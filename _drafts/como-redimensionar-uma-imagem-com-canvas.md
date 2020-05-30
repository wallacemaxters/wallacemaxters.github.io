---
layout: post
title: Como redimensionar uma imagem com Canvas
date: 2020-05-18 00:00:00 -0300
categories:
- javascript
- " imagem"
- " canvas"
sitemap: true
image: ''

---
Nesse tutorial, estarei ensinando uma maneira de redimensionar a imagem através do Canvas.

Para iniciar, primeiramente, eu preferi criar uma função que retorne uma `Promise`, que retorna a tag `img` com a imagem já carregada. Precisamos que essa operação seja feita, para podermos obter valores como largura e altura da imagem que vamos redimensionar.

Esse é o código.

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

Em seguida, vamos criar a função que redimensionará a imagem. Usamos internamente a função `loadImage` para carregar a imagem que queremos redimensionar em questão. Em seguida, usamos o segundo parâmetro para podemos definir o novo tamanho que queremos para a imagem.

Eu criei uma lógica que faz com que a imagem seja escalada automaticamente para o novo tamanho, caso seja informado apenas a altura ou apenas a largura, por exemplo.

O código:

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

No nosso exemplo, vamos utilizar um `input[type=file]` para carregar uma imagem e, em seguida, exibir tanto a imagem original como a redimensionada.

Veja o código:

```html
<input type="file" id="file">

<div>
  <h4>Original</h4>
  <img id="original" alt="">
</div>


<div>
  <h4>Resized</h4>
  <img id="resized" alt="">
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

Ao selecionar a imagem no `input[type=file]`, podemos ver em seguida como ficou o resultado da nossa função:

![](/uploads/captura-de-tela-de-2020-05-30-16-48-13.png)