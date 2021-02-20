---
layout: post
title: Como gerar cores aleatórias no Javascript?
date: 2021-02-20 15:59:00 -0200
categories:
- javascript
sitemap: true
image: "/uploads/javascript-cor-aleatoria.jpeg"
excerpt: Nesse tutorial, aprenda como gerar cores aleatórias com Javascript, seja
  rgba ou hexadecimal.

---
## Gerando cor RGBA

```javascript
function gerar_cor(opacidade = 1) {
   let r = Math.random() * 255;
   let g = Math.random() * 255;
   let b = Math.random() * 255;
   
   return `rgba(${r}, ${g}, ${b}, ${opacidade})`;
}
```

### Explicação

A função `Math.random()` retorna um número float aleatório de `0` a `1`. Ao multiplicar por `255`, estamos dizendo que o valor máximo para o valor de qualquer elemento do `rgb` seja de `0` a `255`.

O parâmetro `opacity` tem como finalidade definir qual será a opacidade da cor. Por padrão deixamos o valor como `1`, para não ter opacidade. No RGBA, a intensidade da opacidade varia de `0` a `1`.

Sendo assim, poderíamos fazer:

```javascript
gerar_cor(1); // rgba(205.2355, 123.0555, 52.116, 1)
gerar_cor(0.5); // rgba(123.456, 51.323, 203.123, 0.5) 
```

Se quiser não deixar os valores do RGB como `float`, basta apenas executar um `parseInt`.

```javascript
function gerar_cor(opacidade = 1) {

   let r = parseInt(Math.random() * 255);

   let g = parseInt(Math.random() * 255);

   let b = parseInt(Math.random() * 255);

   return `rgba(${r}, ${g}, ${b}, ${opacidade})`;

}
```

O resultado seria parecido com isso:

```javascript
gerar_cor(); //rgba(176, 81, 178, 1)
gerar_cor(0.3); // rgba(176, 81, 178, 0.3)
```

  
## Gerando cores hexadecimais

```javascript
function gerar_cor_hexadecimal()
{
  return '#' + parseInt((Math.random() * 0xFFFFFF))
    .toString(16)
    .padStart(6, '0');
}
```

Resultado:

```javascript
gerar_cor_hexadecimal(); // #a12def
gerar_cor_hexadecimal(); // #e190ec
```

### Explicando código

O trecho a cor hexadecimal vai de `0` a `0xFFFFFF`. Multiplicamos `Math.random()` (que gera valores float de 0 a 1) para que o limite sempre seja `0xFFFFFF`. A função `parseInt` força o valor sempre ser um inteiro. Em seguida, chamamos `toString(16)`, que convertará o valor númerico para hexadecimal. A função `padStart(6, '0')` preenche o resultado com zeros a esquerda, já que uma cor hexadecimal válida no CSS sempre contém o tamanhode 3 ou 6. E o `'#' +` inicia o valor com `#`, também padrão do CSS.

Caso queira gerar valores com apenas 3 caraceres, poderia ser feito assim:


```javascript
function gerar_cor_hexadecimal()
{
  return '#' + parseInt((Math.random() * 0xFFF))
    .toString(16)
    .padStart(3, '0');
}
```

Ou podemos também permitir que seja parametrizado, da seguinte forma:

```javascript
function gerar_cor_hexadecimal(curto = false)
{
  const max_hex = curto ? 0xFFF : 0xFFFFFF;
  
  return '#' + parseInt((Math.random() * max_hex))
    .toString(16)
    .padStart(curto ? 3 : 6, '0');
}
```

Resultado:

```javascript

gerar_cor_hexadecimal(true); // #a13
gerar_cor_hexadecimal(); // #a1b2c3
gerar_cor_hexadecimal(false); // #c3b2a1

```