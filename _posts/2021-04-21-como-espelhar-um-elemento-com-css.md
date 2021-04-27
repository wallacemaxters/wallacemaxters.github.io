---
layout: post
color: "#222222"
title: Como espelhar/inverter um elemento com CSS?
date: 2021-04-21T12:15:00.000-03:00
categories:
- CSS
- HTML
sitemap: true
image: "/uploads/covers/css.jpg"
excerpt: Veja como espelhar/inverter horizontalmente e verticalmente um elemento com
  CSS puro.

---
Muitas vezes, precisamos de um ícone, ou uma imagem, ou um elemento invertido, quer seja horizontal ou verticalmente.

Para os casos de ícones ou imagens, alguns podem pensar em usar algum editor para fazer o espelhamento, mas isso não é necessário. Há uma maneira de resolver isso apenas com CSS.

## Espelhando os elementos horizontalmente

No CSS, podemos o espelhamento horizontal através da propriedade `transform`. Para fazer isso, existem duas funções que podem ser utilizados junto à propreidade `transform`.

### Utilizando a função scaleX

A função `scale` define uma transformação que redimensiona um elemento no plano 2D. Em outras palavras, você pode utilizá-la para aumentar ou diminuir a escala de um elemento com CSS. Se utilizamos valores negativos, o resultado será um [point reflection](https://en.wikipedia.org/wiki/Point_reflection) com o valor informado. Como informamos o valor `-1`, o elemento é invertido, sem afetar a escala do mesmo, já que o valor `1` representa a escala base do elemento. A função `scale` também pode receber dois valores, que representam a posição X e Y de um elemento. Além disso, podemos utilizar as variações `scaleX` ou `scaleY` para afetar apenas um posicionamento, caso seja necessário.

No nosso exemplo, já que queremos espelhar os elementos horizontamente, podemos utilizar a função `scaleX` com o valor `-1`.

Exemplo:


```css
.caixa {
   height: 100px;
   background-color: yellow;
}
.caixa.inverter {
   transform: scaleX(-1);
}
```


Resultado:

<div class='box'>
   <div class="columns is-multiline">
      <div class="column">
         <div class="caixa">.caixa</div>
      </div>
      <div class="column">
         <div title='(flip horizontal) caixa invertida horizontalmente' class="caixa inverter-scale-x">
            .caixa.inverter
         </div>
      </div>
   </div>
</div>

Se preferir, você pode utilizar a função `scale`, informando os valores `-1` para o argumento X e `1` para Y.


```css
.caixa {
   height: 100px;
   background-color: yellow;
}
.caixa.inverter {
   transform: scale(-1, 1);
}
```

Resultado:

<div class='box'>
   <div class="columns is-multiline">
      <div class="column">
         <div class="caixa">.caixa</div>
      </div>
      <div class="column">
         <div class="caixa inverter-scale">
            .caixa.inverter
         </div>
      </div>
   </div>
</div>

--- 

{% include ads_article.html %}


### Utilizando a função rotateY

Outra opção é utilizar a função `rotateY(180deg)`.

As funções `rotate`, `rotateX` ou `rotateY` definem uma transformação que rotaciona um elemento em torno de um ponto fixo no plano 2D, sem deformá-lo. Ao utilizar `180deg`, você estará espelhando o elemento horizontalmente (pois estará girando ele ao contrário em torno do eixo Y). 


```css
.caixa.inverter{
   transform: rotateY(180deg);
}
```
Resultado:
<div class="box">
   <div class="columns is-multiline">
      <div class="column">
         <div class="caixa">
            .caixa
         </div>
      </div>
      <div class="column">
         <div class="caixa inverter-rotate">
            .caixa.inverter
         </div>
      </div>
   </div>
</div>

## Espelhando verticalmente

Agora que já entendemos o básico para aplicar o espelhamento horizontal, fazer o espelhamento vertical não vai ser uma tarefa difícil.

Podemos utilizar as funções `scaleY(-1)` e `scale(1, -1)`, ou `rotateX(180deg)` para fazer isso.

Veja esses exemplos:

```css
.caixa.inversao-vertical-scale-y{
   transform: scaleY(-1);
}

.caixa.inversao-vertical-scale{
   transform: scale(1, -1);
}

.caixa.inversao-vertical-rotate-x{
   transform: rotateX(180deg);
}
```
Resultado:

<div class="box">
   <div class="columns is-multiline has-text-centered">
      <div class="column">
         <h4 class="title is-6">Espelhamento vertical usando scaleY(-1)</h4>
         <div class="caixa inversao-vertical-scale-y">
            Espelhado verticalmente
         </div>
      </div>
      <div class="column">
         <h4 class="title is-6">Espelhamento vertical usando scale(1, -1)</h4>
         <div class="caixa inversao-vertical-scale">
            Espelhado verticalmente
         </div>
      </div>
      <div class="column">
         <h4 class="title is-6">Espelhamento vertical usando rotateX(180deg)</h4>
         <div class="caixa inversao-vertical-rotate-x">
            Espelhado verticalmente
         </div>
      </div>
   </div>
</div>

## Espelhando uma imagem com CSS

No exemplo acima, utilizamos uma `div` simples para testar o espelhamento horizontal. Porém, podemos fazer isso também com a tag `img`, para espelhar uma imagem. Isso é muito útil, pois dispensa a utilização de editores, evitando também duplicação desncessária de imagens no projeto.

Veja:

```html
<img src="{{ site.logo | escape }}" >
<img src="{{ site.logo | escape }}" style="transform: scaleX(-1)">
<img src="{{ site.logo | escape }}" style="transform: scaleY(-1)">
```

Resultado:


<img loading="lazy" src="{{ site.logo | escape }}" title="Imagem original" alt="{{ site.title }}">
<img loading="lazy" src="{{ site.logo | escape }}" style="transform: scaleX(-1)" title="Imagem espelhada horizontalmente com CSS" alt="Imagem espelhada horizontalmente com CSS">
<img loading="lazy" src="{{ site.logo | escape }}" style="transform: scaleY(-1)" title="Imagem espelhada verticalmente com CSS" alt="Imagem espelhada verticalmente com CSS">

<style>
.caixa{
   height: 100px;
   background-color: yellow;
   text-align: center;
}
.inverter-scale-x{
   transform: scaleX(-1);
}
.inverter-scale{
   transform: scale(-1, 1);
}

.inverter-rotate{
   transform: rotateY(-180deg);
}

.inversao-vertical-scale-y{
   transform: scaleY(-1);
}

.inversao-vertical-scale{
   transform: scale(1, -1);
}

.inversao-vertical-rotate-x{
   transform: rotateX(180deg);
}
</style>