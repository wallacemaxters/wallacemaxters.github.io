---
layout: post
color: "#222222"
title: Como inverter um elemento com CSS?
date: 2021-04-19 00:00:00 -0300
categories:
- css
- HTML
sitemap: true
image: "/uploads/covers/css.jpg"
excerpt: Veja como inverter horizontalmente e verticalmente um elemento com CSS

---
Muitas vezes, precisamos de um ícone, ou uma imagem, ou um elemento invertido, quer seja horizontal ou verticalmente.

Para os casos de ícones ou imagens, alguns podem pensar em usar algum editor para fazer o espelhamento, mas isso não é necessário. Há uma maneira de resolver isso apenas com CSS.

## Espelhando os elementos horizontalmente

Existem duas maneiras de fazer o espelhamento horizontal com CSS, porém as duas utiliza a mesma propriedade, chamada transform. 

Veja:

    . inverter {
       transform: scaleX(-1);
    }

```css
.inverter{
   transform: rotateX(180deg);

}
```