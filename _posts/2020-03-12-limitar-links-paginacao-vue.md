---
layout: post
title: Como limitar a quantidade de links de paginação com Vue?
date: 2020-03-14 17:45:00 -0300
categories:
- vue
- javascript
sitemap: true
image: "/uploads/covers/vue.jpeg"

---

Ter um componente de paginação é essencial para qualquer projeto Vue. E, geralmente, a parte chata de um componente de paginação é ter que configurar a limitação dos links que são exibidos, uma vez que o excesso desses acaba causando problemas de usabilidade. 

Bem, inicialmente, vamos pensar  no nosso componente de paginação com a seguinte estrutura básica:

{% raw %}
```html
<template>
    <ul>
        <li v-for="i in lastPage">
            <a @click="$emit('input', i)">{{ i }}</a>
        </li>
    </ul>
</template>
<script>
export default {
    name: 'Pagination',

    props: {
        lastPage: Number,
        value: Number,
        limitLinks: {
            type: Number,
            default: 10
        }
    }
}
</script>
```
{% endraw %}

A chamada desse componente vai funcionar assim:

```html
<pagination :last-page="100" v-model="currentPage"  />
```

> **Nota:** O uso de `value` e `$emit('input')` possibilita que o `v-model` possa ser utilizado no nosso componente. Toda vez que `$emit('input')` é chamado, o valor do `v-model` é atualizado.

Da forma atual, com o valor `100` definido em `lastPage`, faria com que tivéssemos 100 links. Mas não é o que desejamos. Precisamos que os links sejam limitados de 10 em 10. E claro, isso deve ser feito baseando-se no valor atual da paginação.

Para fazer isso, podemos usar uma lógica onde obtemos os valores iniciais e finais baseando no limite e valor atual.
No caso, como o nosso limite padrão é 10. Sendo assim, podemos fazer o seguinte para descobrir o valor inicial do loop:

```javascript
const start = Math.floor(this.value / this.limitLinks) * this.limitLinks;
```

Basicamente, o que estamos fazendo é arredondar o valor da divisão da página atual pelo número de links e multiplicando o resultado pelo número de links. Assim, conseguimos obter a dezena inicial de acordo com o valor atual.

Ou seja: `25` divido por `10` sendo arredondado para baixo é equivalente a 2 que, ao multiplar pelo limite `10`, é `20`. 
Assim sendo, sabemos que, para o valor `25`, o primeiro link a ser exibido na paginação é `20`.

E para descobrir o último?

Bem, basta somar o valor inicial com o limite:

```javascript
const end = start + limit;
```
Ou seja, se temos 25 como valor atual, o valor final é `30`.

Porém há um problema nessa lógica. E se o valor atual for `25`, porém o valor máximo de paginaçao for `27`. 
Bem, podemos usar o `Math.min` para resolver isso:

```javascript
const end = Math.min(start + this.limitLinks, this.lastPage);
```

Sendo assim, podemos construir um loop para gerar os números do nosso link:

```javascript
generateLinks() {

    const links = [];
    const start = Math.floor(this.value / this.limitLinks) * this.limitLinks;
    const end = Math.min(start + this.limitLinks, this.lastPage);

    for (let i = start; i < end; i++) {
        links.push(i);
    }

    return links;
}
```

Como vocês podem ver, existe um último ajuste a ser feito: os valores estão iniciando com `0` e terminando com `9`. No caso, precisamos que comece com `1` e termine com `10`, comece com `11` e termine com `21`, comece com `31` e termine com `40`...
Sendo assim, basta somar `i + 1`:


```javascript
generateLinks() {

    const links = [];
    const start = Math.floor(this.value / this.limitLinks) * this.limitLinks;
    const end = Math.min(start + this.limitLinks, this.lastPage);

    for (let i = start; i < end; i++) {
        links.push(i + 1);
    }

    return links;
}
```

<ins class="adsbygoogle"
     style="display:block; text-align:center;"
     data-ad-layout="in-article"
     data-ad-format="fluid"
     data-ad-client="ca-pub-4119206527475379"
     data-ad-slot="9977497686"></ins>
<script>
     (adsbygoogle = window.adsbygoogle || []).push({});
</script>


Conhecendo a estrutura do Vue, creio que nesse caso seja interessante usar essa lógica de `generateLinks` como propriedade computada do Vue. Sendo assim, adicionaremos a função criada acima dentro de `computed` e chamaremos ela de `numbers`.

```javascript
export default {
    // restante do código ...
    
    computed: {
        numbers() {

            const links = [];
            const start = Math.floor(this.value / this.limitLinks) * this.limitLinks;
            const end = Math.min(start + this.limitLinks, this.lastPage);

            for (let i = start; i < end; i++) {
                links.push(i + 1);
            }

            return links;
        }       
    }
}
```

Agora está tudo certo. Para finalizarmos, precisamos alterar o valor utilizado no `v-for`. Tiraremos o `lastPage` e usaremos a propriedade computada `numbers`. 
Além disso, vamos adicionar também um link para voltar à página anterior e um para avançar para a próxima página. 

Aqui está o código final:

{% raw %}
```html
<template>
  <ul>
    <li>
      <a @click="$emit('input', value - 1)">&laquo; anterior</a>
    </li>
    <li v-for="number in numbers" :key="`pagination-number-${number}`">
      <a @click="$emit('input', number)">{{ number }}</a>
    </li>
      <li>
      <a @click="$emit('input', value + 1)">próximo &raquo;</a>
    </li>
  </ul>
</template>

<script>
export default {
  name: "Pagination",

  props: {
    lastPage: Number,
    value: Number,
    limitLinks: {
      type: Number,
      default: 10
    }
  },

  computed: {
    numbers() {
      const links = [];
      const start = Math.floor(this.value / this.limitLinks) * this.limitLinks;
      const end = Math.min(start + this.limitLinks, this.lastPage);

      for (let i = start; i < end; i++) {
        links.push(i + 1);
      }

      return links;
    }
  }
};
</script>
```
{% endraw %}
