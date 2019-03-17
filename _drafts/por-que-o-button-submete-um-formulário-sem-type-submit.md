---
layout: post
title: Por que o button submete um formulário sem type="submit"?
date: 2019-03-17 00:00:00 -0300
categories:
- html
sitemap: true

---
Já aconteceu de eu montar um formulário com vários botões, para realizar ações como adição de um arquivo ou liberar a visualização de um campo e, mesmo estes botões não tendo o atributo `type="submit"`, os mesmos agiam como se fossem um botão de submissão formulário.

O cenário para esse problema é bem parecido com [esse exemplo](https://codepen.io/wallacemaxters/pen/vPrENK).

Veja:

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

Como se pode ver, ao clicar em ambos os botões, a ação de submissão é executada, mesmo que um deles não tenha sido marcado como `type=submit`.

Obviamente, a primeira coisa que se pensaria em fazer para resolver o problema seria colocar um Javascript com um `event.preventDefault()` para evitar uma ação padrão do botão.

**Solução**

A questão é que esse problema pode ser resolvido de uma maneira mais simples que isso! 

Basta adicionar o `type="button"` no mesmo, para que seu comportamento mude.

[Veja](https://codepen.io/wallacemaxters/pen/pYKvyO)


Por algum motivo, o `HTML5` faz com que tantos botões como `type="submit"` como os que não têm se comporte como botão de submissão, sendo necessário adicionar o `type="button"` para corrigir esse comportamento.


