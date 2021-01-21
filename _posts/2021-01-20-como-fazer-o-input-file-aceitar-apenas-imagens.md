---
layout: post
title: Como fazer o input file aceitar apenas imagens?
date: 2021-01-20 23:47:00 -0200
categories:
- HTML
sitemap: true
image: "/uploads/html.jpg"
excerpt: Aprenda como fazer o input[type=file] aceitar apenas uma ou uma lista de
  extensões de imagens específicas.

---
Em HTML, para selecionarmos um arquivo, utilizamos o `input` com o `type="file"`. Ele permite que possamos selecionar um ou mais arquivos, independente da extensão do mesmo.

Porém há alguns casos em que gostaríamos que fosse listado apenas um tipo de arquivos no momento da seleção dos arquivos. Podemos fazer isso através do atributo `accept`.

O atributo `accept` podemos especificar os arquivos que serão aceitos no input através de um mime type ou extensão, podendo até mesmo ser definido vários.

## Listar apenas imagens de qualquer extensão

É possível fazer com que, no momento da seleção do arquivo, seja exibido para o usuário apenas arquivos cuja extensão seja uma imagem.

Exemplo:

```html
<input type="file" accept="image/*" />
```

Quando utilizamos o valor `image/*`, será permitido qualquer extensão de imagem, como JPG, PNG, GIF, entre outros.

## Permitindo apenas tipos específicos de imagem

Se você precisar que apenas uma extensão de imagem específica seja aceita, você pode utilizar o mime type específico da imagem. Por exemplo, se você quiser que apenas imagens de extensão `.jpg` sejam aceitos, você pode utilizar o mime `image/jpeg`.

Código:

```html
<input type="file" accept="image/jpeg" />
```

### Especificando lista de tipos aceitos

Você pode ainda especificar cada tipo que vai ser aceito pelo `input`. Basta escrever cada um deles separados por vírgula.

Código:

```html
<input type="file" accept="image/png,image/jpeg" />
```

## Especificando as extensões aceitas

Além de podermos selecionar o tipo de imagem desejado e poder escolher uma lista delas, podemos definir as imagens que serão aceitas através da extensão. 

Você pode definir, por exemplo, que vai aceitar apenas GIF.

```html
<input type="file" accept=".gif" />
```

Ou, aceitar apenas GIF e PNG.

```html
<input type="file" accept=".gif,.png" />
```

## Conclusão

O `accept` ajuda bastante na hora de filtrar os arquivos que poderão ou não ser selecionados. Isso não se limita a apenas a imagens, mas a qualquer tipo de extensão de arquivo.