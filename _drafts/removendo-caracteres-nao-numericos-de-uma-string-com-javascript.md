---
layout: post
color: "#222222"
title: Removendo caracteres não numéricos de uma string com Javascript?
date: 2021-03-03T00:00:00.000-03:00
categories:
- javascript
sitemap: false
image: ''
excerpt: ''

---
Para remover caracteres não numéricos de uma `String` em Javascript, você só precisa de uma linha de código.

Veja:

```javascript
'A1B2C3'.replace(/\D+/g, ''); // 123
```

Acima utilizamos a função `String.replace`. Essa função substitui o que é passar no primeiro argumento pelo segundo. O primeiro argumento aceita uma expressão regular. A expressão regular que utilizamos possui o valor `\D+`, que é a captura de qualquer valor não numérico. Substituimos tudo por uma string vazia.

Para facilitar as coisas, podemos criar uma função:

```javascript
function somenteNumeros(string) {
    return string.replace(/\D+/g, '');
}
```

## Input que aceita somente números

Hoje em dia não é muito usado, pois o HTML5 introduziu o input type number. Mas caso queria que seu input text remova apenas caracteres não numéricos quando digitados, você pode fazer assim:

```javascript
document
.querySelector('#somente-numeros')
.addEventListener('input', function () {
	this.value = somenteNumeros(this.value)
})
```

```html
<input type="text" id="somente-numeros">
```

Resultado:
<script>
function somenteNumeros(string) {
return string.replace(/\\D+/g, '');
}

document.querySelector('#somente-numeros').addEventListener('input', function () {
this.value = somenteNumeros(this.value)
})
</script>

<input type="text" id="somente-numeros">