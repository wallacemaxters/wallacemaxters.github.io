---
layout: post
color: "#222222"
title: Removendo caracteres não numéricos de uma string com Javascript?
date: 2021-03-03 00:00:00 -0300
categories:
- javascript
sitemap: false
image: ''
excerpt: ''

---
```javascript
function somenteNumeros(string) {
    return string.replace(/\D+/g, '');
}
```

## Input que aceita somente números

Essa função pode ser utilizada para impedir que um input tenha valores não numéricos digitado no mesmo. Basta apenas adicionar um manipulador para o evento `input`.

Veja:

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

---

Resultado: 

<input type="text" id="somente-numeros" class="input"  placeholder="Digite apenas números">

<script>
function somenteNumeros(string) {
    return string.replace(/\D+/g, '');
}

document.querySelector('#somente-numeros').addEventListener('input', function () {
    this.value = somenteNumeros(this.value)
})
</script>