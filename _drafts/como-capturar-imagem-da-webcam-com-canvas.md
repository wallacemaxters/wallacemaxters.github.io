---
layout: post
title: 'HTML5: Como capturar imagem da webcam com Canvas?'
date: 2020-05-31 00:00:00 -0300
categories:
- canvas
- imagem
- javascript
- html5
sitemap: true
image: "/uploads/canvas_webcam_html5.png"

---
Para acessar a webcam, precisamos utilizar a função `navigator.mediaDevices.getUserMedia`. Essa função retorna uma `Promise`, contendo ou `MediaStream`. Com essa função podemos acessar o áudio ou vídeo do computador do usuário.

Obviamente, quando chamamos `getUserMedia`, o browser irá exibir um dialogo pedido a sobre o acesso a um dispositivo de mídia.

> **Nota:** É importante deixar claro que `getUserMedia` só pode ser usado em ambientes considerado seguros. Portanto, se quiser utilizar em seu site ou aplicação web, esteja ciente que o mesmo possua SSL configurado para o domínio. Para testes, podemos usar o famoso `localhost` normalmente.

Para acessarmos a webcam, precisamos passar um parâmetro para `getUserMedia`, da seguinte forma:

```javascript
navigator.mediaDevices.getUserMedia({video: true})
.then(function (mediaStream) {
  // nosso código aqui
})
.catch(function (err) {
  console.log('Não há permissões para acessar a webcam')
})
```

Se tudo ocorrer corretamente acima, teremos acesso á `mediaStream`. É através dela que poderemos capturar fotos da webcam. Precisamos agora que o usuário tenha uma pré-visualização da sua imagem. Para isso vamos utilizar uma tag `video`.

Basta adicionar ao código:

```html
<video id="video"></video>
```

```javascript
navigator.mediaDevices.getUserMedia({video: true})
.then(function (mediaStream) {
	var video = document.querySelector('#video');
  
     video.srcObject = mediaStream;
     video.play();
})
.catch(function (err) {
  console.log('Não há permissões para acessar a webcam')
})

```

Com isso, já podemos ver a imagem da nossa webcam sendo visualizada na tag `video`.

O próximo passo agora é fazer a captura do frame que precisamos para um `canvas`.

Vamos adicionar um canvas e um botão ao nosso código para fazermos isso, da seguinte forma:

```html
<video id='video'></video>
<canvas id='canvas'></canvas>
<button id='capture'>Capturar</button>
```

Em seguida, vamos atribuir a função do click para `#capture` preencher o nosso Canvas.

```javascript

document.querySelector('#capture').addEventListener('click', function (e) {
 
  var canvas = document.querySelector("#canvas");
  
  canvas.height = video.videoHeight;
  canvas.width = video.videoWidth;
  
  var context = canvas.getContext('2d');
  
  context.drawImage(video, 0, 0)
})

```

No código acima, nós primeiro definimos o tamhanho do canvas para ficar exatamente do mesmo tamanho do vídeo. Em seguida, utilizamos o context para desenhar a imagem capturada do vídeo. Toda vez que `#capture` é clicado, o frame específico será aplicado ao canvas.

Para você ter acesso à imagem do canvas, basta utilizar a função `toBlob` ou `toDataURL`.

Por exemplo, se quisermos fazer o upload do frame capturado, podemos simplesmente adicionar usar `toBlob` para adicionar o `Blob` a um `FormData`.


```html
<button id="upload">Upload</button>
```
```javascript
document.querySelector('#upload').addEventListener('click', function (e) {
 
  var canvas = document.querySelector("#canvas");
  
  canvas.toBlob(function (blob) {
  	var form = new FormData();
    form.append('image', blob, 'webcam.jpg');
    
  	var xhr = new XMLHttpRequest();
    xhr.open('POST', '/upload', true);
    xhr.onload = function(e) {
    	// upload concluído  
    };
    
    xhr.send(form);  
                              
  }, 'image/jpeg');
})
```

> **NOTA**: Observe que no nosso exemplo, utilizamos no segundo parâmetro de `toBlob` o valor `image/jpeg`. Isso porque preferencialmente preferi converter o resultado do `canvas` para JPEG. Caso queira usar outro formato, é possível informar o MIME desejado, como `image/png` e afins.

Veja funcionando no [Codepen](https://codepen.io/wallacemaxters/pen/XWmvLXE)