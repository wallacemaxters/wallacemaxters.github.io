---
layout: post
title: 'HTML5: Como capturar imagem da webcam com Javascript?'
date: 2021-01-12T14:08:00.000-02:00
categories:
- imagem
- javascript
- canvas
sitemap: true
image: "/uploads/covers/canvas_webcam_html5.png"
excerpt: Nesse tutorial, vamos aprender como usar o Javascript e o canvas para capturar
  imagem de uma webcam.
color: ''

---
Para acessar a webcam, precisamos utilizar a função `navigator.mediaDevices.getUserMedia`. Essa função retorna uma `Promise`, contendo ou `MediaStream`. Com essa função podemos acessar o áudio ou vídeo do computador do usuário.

Obviamente, quando chamamos `getUserMedia`, o browser irá exibir um dialogo pedido a sobre o acesso a um dispositivo de mídia.

> **Nota:** É importante deixar claro que `getUserMedia` só pode ser usado em ambientes considerado seguros. Portanto, se quiser utilizar em seu site ou aplicação web, esteja ciente que o mesmo possua SSL configurado para o domínio. Para testes, podemos usar o famoso `localhost` normalmente.

Para acessarmos a webcam, precisamos passar um parâmetro em `getUserMedia`, para informar que queremos acessar a câmera. 

Veja:

```javascript
navigator.mediaDevices.getUserMedia({video: true})
.then(function (mediaStream) {
  // nosso código aqui
})
.catch(function (err) {
  console.log('Não há permissões para acessar a webcam')
})
```

Se tudo ocorrer corretamente acima, teremos acesso à variável `mediaStream`. É através dela que poderemos capturar fotos da webcam. 

<hr />

## Pré-visualização da webcam

Precisamos agora que o usuário tenha uma pré-visualização da captura da webcam. Para isso, vamos utilizar uma tag `<video>`.

Código:

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

Com isso, já podemos ter a pré-visualização da captura nossa webcam.

Veja:

<!-- Exemplo -->
<button class="button is-primary is-large" id="button-camera">Testar câmera</button>
<video id="video-teste" style="display: none" controls></video>
<sub id="video-mensagem-erro"></sub>
<script>
document.querySelector('#button-camera').addEventListener('click', function () {
  this.style.display = 'none';
  navigator.mediaDevices.getUserMedia({video: true})
  .then(function (mediaStream) {
      var video = document.querySelector('#video-teste');
      video.style.display = 'block';
      video.srcObject = mediaStream;
      video.play();
  })
  .catch(function (err) {
    document.querySelector('#video-mensagem-erro').innerText = 'Não há permissões para acessar a webcam';
  })
})
</script>

<!-- /Exemplo -->

<hr />

## Capturando a imagem da webcam com a tag Canvas

O próximo passo agora é passar a imagem que vemos na webcam e transformá-la em uma imagem.  Para fazer isso,  precisamos capturar um frame da tag `<video>` acima e enviarmos para a tag  `<canvas>`.

No nosso código abaixo, além da tag `canvas`, vamos adicionar também um `button`. Quando clicarmos nesse botão, a imagem da webcam deverá ser enviada para o `canvas`.

Veja:

```html
<video id='video'></video>
<canvas id='canvas'></canvas>
<button id='capture'>Capturar</button>
```

```javascript
document.querySelector('#capture').addEventListener('click', function (e) {
  var canvas = document.querySelector("#canvas");  
  canvas.height = video.videoHeight;
  canvas.width = video.videoWidth;
  var context = canvas.getContext('2d');
  context.drawImage(video, 0, 0)
})
```

<!-- Exemplo Captura -->
<hr>
## Exemplo

<button class="button is-primary is-large" id="button-camera-2">Testar câmera</button>

<div class="columns is-multiline" style="display: none" id="video-teste-2-container">
    <div class="column is-12 is-6-desktop">
        <video id="video-teste-2"></video>
        <button class="button is-danger is-large" id="button-camera-capturar-2">Capturar</button>
    </div>
    <div class="column is-12 is-6-desktop">
        <canvas id="canvas-teste-2" style="max-width: 100%"></canvas>
    </div>
</div>
<sub id="video-mensagem-erro-2"></sub>

<script>
document.querySelector('#button-camera-2').addEventListener('click', function () {
  this.style.display = 'none';
  navigator.mediaDevices.getUserMedia({video: true})
  .then(function (mediaStream) {
      var video = document.querySelector('#video-teste-2');
      document.querySelector('#video-teste-2-container').style.display = '';
      video.srcObject = mediaStream;
      video.play();
  })
  .catch(function (err) {
      document.querySelector('#video-mensagem-erro-2').innerText =
          'Não há permissões para acessar a webcam';
  })
});
document.querySelector('#button-camera-capturar-2').addEventListener('click', function (e) {
    var canvas = document.querySelector("#canvas-teste-2");
    var video = document.querySelector('#video-teste-2');
    canvas.height = video.videoHeight;
    canvas.width = video.videoWidth;
    var context = canvas.getContext('2d');
    context.drawImage(video, 0, 0)
});
</script>
<hr>
<!-- /Exemplo Captura -->

{% include ads_common.html %}
<hr>
### Explicando o código

No código acima, primeiro definimos o tamanho do `canvas` para ficar exatamente do mesmo tamanho do vídeo. Em seguida, utilizamos  `context` para desenhar a imagem capturada do vídeo. Toda vez que `button#capture` é clicado, o frame específico da  da webcam será aplicado ao `canvas`

<hr />
## Convertendo o Canvas para Imagem

Para você ter acesso à imagem do `canvas`, basta utilizar os métodos `Canvas.toBlob` ou `Canvas.toDataURL`.  A primeira converte o desenho do `<canvas>` em um [Blob](https://developer.mozilla.org/pt-BR/docs/Web/API/Blob "BLOB - Documentação do MDN"). Já a segunda, converte para um [Data URI](https://developer.mozilla.org/en-US/docs/Web/HTTP/Basics_of_HTTP/Data_URIs "Data URI - Documentação da MDN").

No nosso caso, vamos usar `toBlob`. Isso porque usaremos o mesmo para fazer o upoad da imagem.


### Exemplo de upload

Se quisermos fazer o upload da imagem capturada pela webcam, podemos simplesmente adicionar usar `toBlob` e adicionar o `Blob` retornado em um `FormData`.

O código é bem simples. Vamos adicionar um botão que faça o upload da imagem.

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