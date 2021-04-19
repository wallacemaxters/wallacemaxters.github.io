---
layout: post
color: "#222222"
title: 'Como fazer um carrossel com CSS puro?'
date: 2021-04-15 00:00:00 -0300
categories:
- CSS
- HTML
sitemap: false
excerpt: Aprenda a fazer um carrossel/slider com CSS Puro.
image: '/uploads/covers/css.jpg'

---

Nesse tutorial estarei ensinando como fazer um slider/carrossel com CSS puro. Isso mesmo! Não vamos utilizar Javascript para iterar com os itens do nosso carrossel.

--- 

## Código do carrossel

HTML:
```html
<section class="slider">
    <input name='slide' type="radio" >
    <input name='slide' type="radio" checked>
    <input name='slide' type="radio">
    <input name='slide' type="radio">
  
    <div class="slider-content">
        <div class="slider-item">1</div>
        <div class="slider-item">2</div>
        <div class="slider-item">3</div>
        <div class="slider-item">4</div>
    </div>
</section>
```

CSS:
```css
.slider{
    overflow: hidden;

}
.slider > .slider-content{
    display: flex;
    flex-wrap: nowrap;
    width: 100%;
    transition: all 500ms ease;


}

.slider > .slider-content > .slider-item {
    flex: 0 0 auto;
    width: 100%;
}

.slider > input:nth-child(1):checked ~ .slider-content{
    transform: translateX(0%);
}

.slider > input:nth-child(2):checked ~ .slider-content{
    transform: translateX(-100%);
}
.slider > input:nth-child(3):checked ~ .slider-content{
    transform: translateX(-200%);
}

.slider > input:nth-child(4):checked ~ .slider-content{
    transform: translateX(-300%);
}
```

Resultado:

<section class="slider">
    <input name='slide' type="radio" >
    <input name='slide' type="radio" checked>
    <input name='slide' type="radio">
    <input name='slide' type="radio">
    <div class="slider-content">
        <div class="slider-item">
            <div class="slider-item-number">1</div>
        </div>
        <div class="slider-item">
            <div class="slider-item-number">2</div>
        </div>
        <div class="slider-item">
            <div class="slider-item-number">3</div>
        </div>
        <div class="slider-item">
            <div class="slider-item-number">4</div>
        </div>
    </div>
</section>

---

## Explicando o código do carrossel com CSS puro

Definimos uma classe `.slider` principal, que será o contêiner do nosso carrossel. Em seguida, definimos um `.slider-content`, que possui um as definições `display: flex`, `flex-wrap: nowrap`. Essa definição é importante, pois, como cada `.slider-item` possui o tamanho de 100%, teremos então a `div.slider-content` com o tamanho de 400%, uma vez que temos 4 elementos no nosso exemplo. Foi por esse motivo que definimos o `div.slider` como `overflow: hidden`, para que apenas um `.slider-item` seja exibido. O `flex-wrap: nowrap` não deixará que os elementos filhos de `.slider-content` quebrem para uma nova linha caso o espaço total deste elemento esteja ocupado. 

Depois disso, temos `input[type=radio]`. Utilizamos a posição de cada um deles para representar um `.slider-item`. O seletor `:checked` é utilizado no CSS para aplicar um estilo em um `[type=radio]` que está selecionado atualmente. Cada `:nth-child()` representa a posição em que o elemento está disposto no DOM. Utilizamos isso para aplicar um `transform: translateX()`, para fazer com que nosso `.slider-content` "ande" até o elemento desejado. Note que incrementamos de `100%` em `100%`, para que seja exibido o `.slider-item` dentro de `.slider-content` de acordo com sua posição.

### Personalizando o carrossel

Observe que, dentro de `.slider-item`, podemos definir o elemento que quisermos, com a estilização desejada. Abaixo utilizar uma listagem de posts do blog como exemplo.

Veja:

<section class="slider">
    <input name='slide_post' type="radio" >
    <input name='slide_post' type="radio" checked>
    <input name='slide_post' type="radio">
    <input name='slide_post' type="radio">
  
    <div class="slider-content">
        {% for post in site.posts limit: 4%}
            <div class="slider-item">
                <div class="slider-item-post">
                    <div class="slider-item-post-overlay" style="background-image: url({{post.image}})"></div>
                    <p>{{ post.title }}</p>
                </div>
            </div>
        {% endfor %}
    </div>
</section>


<style>
.slider{
    overflow: hidden;
}
.slider > .slider-content{
    display: flex;
    flex-wrap: nowrap;
    width: 100%;
    transition: all 500ms ease;
}

.slider > .slider-content > .slider-item {
    flex: 0 0 auto;
    width: 100%;
}

.slider > .slider-content > .slider-item > .slider-item-number {
    height: 500px;
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 3rem;
    background-color: gold;
}

.slider > .slider-content > .slider-item > .slider-item-post {
    height: 500px;
  
    background-color: #222;
    display: flex;
    justify-content: center;
    align-items: center;
    text-align: center;
    font-size: 2rem;
    color: #fff;
    position: relative;
    z-index: 2;
}

.slider > .slider-content > .slider-item > .slider-item-post > .slider-item-post-overlay{
    position: absolute;
    width: 100%;
    height: 100%;
    left: 0;
    top: 0;
    opacity: 0.6;
    background-size: cover;
    z-index: -1;
}

.slider > input:nth-child(1):checked ~ .slider-content{
    transform: translateX(0%);
}

.slider > input:nth-child(2):checked ~ .slider-content{
    transform: translateX(-100%);
}
.slider > input:nth-child(3):checked ~ .slider-content{
    transform: translateX(-200%);
}

.slider > input:nth-child(4):checked ~ .slider-content{
    transform: translateX(-300%);
}
</style>