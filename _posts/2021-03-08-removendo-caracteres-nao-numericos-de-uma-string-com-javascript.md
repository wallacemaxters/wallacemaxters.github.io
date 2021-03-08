---
layout: post
color: "#F5A623"
title: Removendo caracteres não numéricos de uma string com Javascript
date: 2021-03-08 07:46:00 -0300
categories:
- javascript
sitemap: true
image: "/uploads/covers/code.jpg"
excerpt: Veja como remover caracteres não numéricos de uma string em Javascript.

---
Para remover caracteres não numéricos de uma `String` em Javascript, você só precisa de uma linha de código.

Veja:

```javascript
'A1B2C3'.replace(/\D+/g, ''); // 123
```

## Explicando o código

Acima utilizamos a função `String.replace`. Esta função substitui o que é passado no primeiro argumento pelo segundo. O primeiro argumento aceita uma expressão regular. A expressão regular que utilizamos possui o valor `\D+`, que é a captura de qualquer valor não numérico. Substituimos tudo por uma string vazia.

Para facilitar as coisas, podemos criar uma função.

Código:

```javascript
function somenteNumeros(string) {
    return string.replace(/\D+/g, '');
}
somenteNumeros('z3x2y1'); // 321
```

### Convertendo para inteiro

É importante lembrar que, apesar de estarmos deixando apenas os caracteres uméricos da String, o valor retornando continua sendo uma String. Mas, em Javascript, você pode converter esse valor através da função `parseInt`.

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