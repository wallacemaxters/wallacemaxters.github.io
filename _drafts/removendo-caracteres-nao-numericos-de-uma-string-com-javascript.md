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

```javascript
document
.querySelector('#somente-numeros')
.addEventListener('input', function () {
	this.value = somenteNumeros(this.value)
})
```

<script>
function somenteNumeros(string) {
return string.replace(/\\D+/g, '');
}

document.querySelector('#somente-numeros').addEventListener('input', function () {
this.value = somenteNumeros(this.value)
})
</script>

<input type="text" id="somente-numeros">