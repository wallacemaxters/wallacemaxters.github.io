---
layout: post
title: Como detectar se um formato de vídeo é suportado ou não no navegador através
  do Javascript?
date: 2020-06-25 00:00:00 -0300
categories:
- javascript
- html
- video
sitemap: false
image: ''

---
Eu tenho um sistema que permite o usuário enviar qualquer formato de vídeo para o servidor através de upload.

Porém eu sei que nem todos os navegadores suportam alguns formatos específicos na tag \`<video>\`, que acabam por simplesmente não rodar no browser.

Existe alguma maneira de saber, através de uma função Javascript, se um determinado tipo de vídeo é suportado ou não no Browser usado pelo cliente?

    function supportsVideoType(type) {
      let video;
    
      // Allow user to create shortcuts, i.e. just "webm"
      let formats = {
        ogg: 'video/ogg; codecs="theora"',
        h264: 'video/mp4; codecs="avc1.42E01E"',
        webm: 'video/webm; codecs="vp8, vorbis"',
        vp9: 'video/webm; codecs="vp9"',
        hls: 'application/x-mpegURL; codecs="avc1.42E01E"'
      };
    
      if(!video) {
        video = document.createElement('video')
      }
    
      return video.canPlayType(formats[type] || type);
    }
    
    // Usage
    if(supportsVideoType('webm') === "probably") {
      // Set the video to webm
    }
    else {
      // Set the video to mpeg or mp4
    }