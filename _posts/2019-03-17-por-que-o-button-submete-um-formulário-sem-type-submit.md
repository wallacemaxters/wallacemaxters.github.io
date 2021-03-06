---
layout: post
title: Por que o button submete um formulário mesmo sem type="submit"?
date: 2019-03-17 03:00:00 +0000
categories:
- HTML
sitemap: true
image: "/uploads/covers/html.jpg"

---
Já aconteceu de eu montar um formulário com vários botões, para realizar ações como adição de um arquivo ou liberar a visualização de um campo e, mesmo estes botões não tendo o atributo `type="submit"`, os mesmos agiam como se fossem um botão de submissão formulário.

O cenário para esse problema é bem parecido com o seguinte exemplo.

HTML:

```html
<form id="form">
  <button>Sem type submit</button>
  <button type="submit">Com type submit</button>
</form>
```

Javascript:

```javascript
document.querySelector('#form').addEventListener('submit', function (e) {
  e.preventDefault();
  console.log('submetido');
})
```

Exemplo:

<div class='box'>
<form id="form">
  <button class="button">Sem type submit</button>
  <button class="button" type="submit">Com type submit</button>
</form>

<script>
document
.querySelector('#form')
.addEventListener('submit', function (e) {
  e.preventDefault();
  document.querySelector('#console').innerHTML += '<div>submetido</div>';
})
</script>
<pre id="console" class="mt-2"></pre>
</div>


No exemplo acima, definimos um formulário com dois botões. Um tem o `type=submit` e o outro não foi definido o `type`. Também adicionamos um código Javascript para capturar a submissão do formulário e exibir no console quando o formulário for submetido, através da captura de `submit`.

Como se pode ver, ao clicar em ambos os botões, a ação de submissão é executada, mesmo que um deles não tenha sido marcado como `type=submit`. 

Isso pode causar confusão, pois você algumas vezes pode ter definido um botão no formulário para executar outra ação dentro do formulário, e não submeter o mesmo.

---- 
## Solucionando o problema

Obviamente, a primeira coisa que se pensaria em fazer para resolver o problema seria colocar um Javascript com um `event.preventDefault()` para evitar uma ação padrão do botão, mas isso não é exatamente necessário.

A questão é que esse problema pode ser resolvido de uma maneira mais simples que isso!
Basta adicionar o `type="button"` no mesmo, para que seu comportamento mude.

Mude seu código, dessa forma:

```html
<form id="form-2">
  <button class="button" type="button">Com type button</button>
  <button class="button" type="submit">Com type submit</button>
</form>
```
Exemplo:
<div class='box'>
<form id="form-2">
  <button class="button" type="button">Com type button</button>
  <button class="button" type="submit">Com type submit</button>
</form>

<script>
document
.querySelector('#form-2')
.addEventListener('submit', function (e) {
  e.preventDefault();
  document.querySelector('#console-2').innerHTML += '<div>submetido</div>';
})
</script>
<pre id="console-2" class="mt-2"></pre>
</div>

Veja que agora o formulário não é submetido ao clicar no botão com `type=button`. Isso porque o `type=button`  não possui comportamento padrão, conforme a [documentação da MDN](https://developer.mozilla.org/pt-BR/docs/Web/HTML/Element/button).

Por algum motivo, oo HTML5 faz com que tantos botões como `type=submit` como os que não têm aa definição de `type` se comportem como botão de submissão. Sendo assim, é necessário adicionar o `type=button` para corrigir esse comportamento.

