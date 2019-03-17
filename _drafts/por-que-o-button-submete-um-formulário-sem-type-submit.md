---
layout: post
title: Por que o button submete um formulário sem type="submit"?
date: 2019-03-17 00:00:00 -0300
categories:
- html
sitemap: true

---
Já aconteceu de eu montar um formulário sem o `type="submit"` e, mesmo assim, esse botão agir como se fosse um botão de submissão e, ao clicar no mesmo, ele acaba submetendo o formulário.

O cenário é bem parecido com esse *exemplo*:

HTML:
```html
<form id="form">
  <button>Outra ação qualquer</button>
  <button type="submit">Submeter</button>
</form>
```
Javascript:
```javascript
document.querySelector('#form')
.addEventListener('submit', function (e) {
  e.preventDefault();
  console.log('submetido');
})
```

[Link do Exemplo](https://codepen.io/wallacemaxters/pen/vPrENK)

Como se pode ver, ao clicar em ambos os botões, a ação de submissão é executada.

Obviamente, a primeira coisa que se pensaria em fazer para resolver o problema seria colocar um Javascript com um `event.preventDefault()` para evitar uma ação padrão.

Ocorre é que esse problema pode ser resolvido de uma maneira mais simples! Basta adicionar o `type="button"` no mesmo, para que seu comportamento mude.

[Veja](https://codepen.io/wallacemaxters/pen/pYKvyO)


Por algum motivo, o `HTML5` faz com que tantos botões como `type="submit"` como os que não têm se comporte como botão de submissão, sendo necessário adicionar o `type="button"` para corrigir esse comportamento.


