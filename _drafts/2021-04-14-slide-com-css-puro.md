---
layout: post
color: "#222222"
title: 'Carrosel com CSS puro'
date: 2021-03-09 00:00:00 -0300
categories:
- CSS
- HTML
sitemap: false
excerpt: No PHP 8.1, teremos uma nova função, chamada array_is_list. Esta função verifica
  se o array é ou não sequencial. Veja mais nesse artigo.

---

Nesse tutorial estarei ensinando como fazer um slider/carrosel com CSS puro.

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