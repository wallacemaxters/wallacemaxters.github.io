---
layout: post
color: "#222222"
title: Utilizando o atributo loading="lazy" em img e iframe
date: 2021-02-27 15:20:00 +0000
categories:
- html
sitemap: true
image: ''
excerpt: Aprenda a melhorar a performance e carregamento do seu site com o atributo
  loading=lazy

---
## Para que serve o atributo loading?

O atributo `loading` com o valor `lazy` faz com que a imagem (carregada pela tag `<img>`) ou um iframe só seja carregado caso mesma esteja na viewport do usuário. Isso significa que o conteúdo só será processado quando a rolagem da tela do usuário estiver sobre os elementos que possuam a definição desse atributo e valor.

## Como utilizar loading=lazy?

Não tem muito segredo. Basta adicionar `loading="lazy"` na sua tag `<img>` ou `<iframe>`.

```html
<img src="minha-imagem.jpg" loading="lazy">
```


```html
<iframe src="minha-imagem.jpg" loading="lazy" frameborder="0">
```