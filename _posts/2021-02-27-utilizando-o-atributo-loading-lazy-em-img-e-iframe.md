---
layout: post
color: "#4CE0C9"
title: Utilizando o atributo loading="lazy" em img e iframe
date: 2021-02-27 15:20:00 +0000
categories:
- html
sitemap: true
image: "/uploads/loading_lazy_attribute.png"
excerpt: O novo atributo loading=lazy tem como finalidade adiar o carregamento de
  elementos, como imagens ou conteúdos de iframe, até que esteja no viewport do usuário.
  Saiba mais nesse tutorial.

---
## Para que serve o atributo loading?

O atributo `loading` com o valor `lazy` faz com que a imagem (carregada pela tag `<img>`) ou um iframe só seja carregado caso mesma esteja na viewport do usuário.

Em outras palavras, ele especifica para o navegador que o carregamento das tags `<img>` ou `<iframe>` serão adiados até que o usuário faça a rolagem para onde esses elementos se tornam visíveis.

Isso obviamente evita o carregamento desnecessário de recursos para o usuário final, fazendo com que seu site tenha mais performance.

## Como utilizar loading=lazy?

Não tem muito segredo. Basta adicionar `loading="lazy"` na sua tag `<img>` ou `<iframe>`.

```html
<img src="minha-imagem.jpg" loading="lazy">
```
ou:
```html
<iframe src="minha-imagem.jpg" loading="lazy" frameborder="0">
```

## Imagens precisam ter atributos de altura e largura

Mesmo que o navegador carregue uma imagem, ele ainda não sabe imediatamente a altura e largura da mesma, a não ser que você as defina. Para permitir que o navegador reserve espaço suficiente em uma página que possua imagens, é recomendável que todas as tags `<img>` possuam os atributos `width` e `height`. Pois, ao usar `loading="lazy"`, o navegador não as terá carregado ainda, e, se você não especificar as mesmas, poderá ocorrer mudanças no layout do seu site.

Exemplo:

```html
<img src="minha-imagem.png" loading="lazy" width="200" height="200">
```

É claro que não há problemas ao utilizar o atributo `loading="lazy"` sem os atributos de dimensão `height` ou `width`, porém é recomendado para que não ocorra comportamentos inesperados no seu layout pelo fato do navegador não saber o tamanho das imagens até que estejam no viewport.

## Quais são os navegadores compatíveis?

Os navegadores mais modernos, como Egde, Chrome, Firefox e Opera, já possuem suporte total ou parcial ao atributo `loading="lazy"`, conforme podemos ver detalhadamente em [caniuse](https://caniuse.com/loading-lazy-attr).

### Como loading lazy pode afetar navegadores sem suporte?

Se a versão do navegador do usuário não possuir suporte ao atributo `loading`, não haverá problemas com compatibilidade, já que esse atributo será simplesmente ignorado e não afetará o comportamento padrão já existemente para as tags `<img>` e `<iframe>`

### Como saber se o navegador tem suporte ao atributo loading?

Você pode utilizar o Javascript para chegar se há suporte ou não ao atributo `loading`. Basta verificar se `HTMLImageElement` ou `HTMLIframeElement` possuem o atributo `loading`.

Veja:

```javascript
if (HTMLImageElement.prototype.hasOwnProperty('loading')) 
{
    console.log('O navegador suporta o atributo "loading" em <img>');
}

if (! HTMLIFrameElement.prototype.hasOwnProperty('loading')) 
{
    console.log('Não há suporte para "loading" em iframes neste navegador');
}
```