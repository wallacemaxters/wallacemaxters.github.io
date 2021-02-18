---
layout: post
title: Paginação com Vue e Laravel 5
date: 2020-03-15T16:20:00.000+00:00
categories:
- laravel
- vue
sitemap: true
image: "/uploads/laravel_vue.png"

---
Usar Laravel como backend e Vue como frontend tem sido algo bastante comum de um tempo para cá. Em vários projetos, vejo a utilização dos mesmos e pessoalmente creio que seja uma combinação poderosa.

Nesse tutorial, estarei demonstrando como criar uma paginação com Vue e Laravel.

## Introdução

O primeiro ponto que gosto de observar é que os frameworks e bibliotecas costumam utilizar padrões para facilitar a nossa vida. Muitas vezes o desenvolvedor acaba criando ou fazendo coisas desnecessárias no momento de obter um dado ou fazer uma operação, sendo que o framework já tem uma solução fácil para isso.

Um grande exemplo disso é quando se trata de paginação. Já vi vários desenvolvedores utilizando o `paginate` apenas quando deseja exibir os links da paginação numa Blade View. Porém, quando se trata de retornar os dados paginados numa API, o mesmo acaba escrevendo códigos complexos e desnecessários, já que o `Model::paginate()` também pode ser utilizado em chamadas de Api.

## Transformando a paginação do Eloquent em JSON

No Laravel, quando chamamos `Model::paginate`, os dados são retornados em uma instância da classe `LengthAwarePaginator`. Esta instância pode ser transformada em *JSON*. Da mesma forma que fazemos a chamada de `response()->json()` com os dados resultantes do `Model::get` ou `Model::find`, também podemos fazer o mesmo com `Model::paginate`. Existe apenas uma diferença no retorno, já que `LengthAwarePaginator` possui um padrão diferente quando transformado em *JSON*.

Veja esse exemplo para entender melhor. Abaixo estamos retornando um JSON contendo uma lista paginada de usuários.

```php
Route::get('users', function () {
	$users = User::where('age', '>', 18)->paginate();
	return response()->json($users);
});
```

Além disso, de maneira mais simples, podemos também retornar a chamada de `paginate` diretamente:

```php
Route::get('users', function () {
	return User::where('age', '>', 18)->paginate();
});
```

No Laravel 5, o resultado disso será algo parecido com:

```json
{
  "current_page": 1,
  "last_page": 5,
  "per_page": 15,
  "total": 60,
  "next_page_url" : "/api/users?page=2",
  "prev_page_url" : null,
  "from" : 1,
  "to": 15,
  "data": [
    {
      "id": 1,
      "name": "Wallace"
    },
    {
      "id": 2,
      "name": "Maxters"
    },
    // ...
  ]
}
```

Basicamente, os dados que precisamos listar estão em `data`, que é um `array` contendo os dados de cada `User`.

<!-- ads common -->
{% include ads_common.html %}

## Construindo a visualização no Vue

Tudo que temos que fazer agora é armazenar o retorno desses dados e exibí-los no Vue.Js.

Exemplo:

```html
<script>
  import api from "../../services/api";
  
  export default {
  
    name: 'users-list',
    
    created() {
      this.paginate()
    },
    
    data() {
      return {
        users: {data: []}
      }
    },
    
    methods: {
      async paginate() {
        const {data: users} = await api.get('users');
  		this.users = users;
      }
    }
  }
</script>
```

No caso acima, eu deixei a variável `users` guardando todas as informações retornadas em `api/users`, e não apenas a lista. O motivo de fazer isso é justamente poder usufruir do padrão de retorno do Laravel e explicarei isso melhor mais a frente.

O que vai mudar no nosso código será o momento de aplicar o `v-for`, pois, ao invés de ser iterado sobre `users`, será iterado sobre `users.data`.

Assim:

{% raw %}
```html
<div class="user-info" v-for="user in users.data">{{ user.name }}</div>
```
{% endraw %}

### E a próxima página?

Nosso objetivo agora é avançar para a "próxima página" da na nossa listagem.
Não é algo muito difícil. O Laravel precisa apenas que você passe um parâmetro, via query string, chamado `page` para indicar qual é a "página" de dados que vamos retornar do endpoint.

Vamos modificar o método `paginate` da seguinte forma:

```javascript
{
  //
  methods: {
    async paginate(page = 1) {
      
      const {data: users} = await api.get('users', {
        params: {page}
      })
      
      this.users = users;
    }
  }
}
```

> No _Axios_, quando você deseja passar alguma parâmetro na url, você pode usar a opção `params` contendo um objeto, que representará os valores da query string. É possível concatenar `users?page=${page}`, mas, por questão de gosto, não costumo fazer isso.

Para testar se a paginação funcionou, basta fazer o seguinte:

```html
<a @click="paginate(1)">1</a>
<a @click="paginate(2)">2</a>
<a @click="paginate(3)">3</a>
```

Clique nos links e veja se os mesmos modificam os valores retornados pelo endpoint.

> **Dica**: Se você não tiver muitos dados para testar, você pode passar um parâmetro para `paginate`, que modifica a quantidade de itens retornados por  página. Quando não tenho muitos dados para testar, uso `paginate(1)` para retornar um item por página.

### Mas por quê guardar todas as informações ao invés de simplesmente a lista?

O motivo disso é que vamos usar as outras informações para construir melhor a nossa interface a partir de algumas informações.

Vou detalhar cada uma delas:

`total` - Esse valor é referente ao total de itens retornados na paginação. Essa informação é interessante, pois, caso retorne `0`, podemos  exibir a informação que "nenhum usuário foi encontrado".

Exemplo:

{% raw %}
```html
<div v-if="users.total > 0">
  <div class="user-info" v-for="user in users.data">
      {{ user.name }}
  </div>
</div>
<div v-else>
  Nenhum usuário foi encontrado
</div>
```
{% endraw %}

`current_page` - Esse valor representa a página atual da paginação. Um exemplo de sua importância é poder marcar o link da página atual.

`last_page` - Esse valor representa qual é o limite de páginas da paginação. Eu costumo utilizá-lo muito para definir se vou exibir os links da paginação ou não, caso seu valor seja `1`.

Exemplo:

```html
<div v-if="users.last_page > 1">
  <pagination v-model="users.current_page" @input="paginate"  />
</div>
```

Essa lógica também pode ser aplicado diretamente dentro do componente de paginação, caso seja conveniente, pois assim evitamos a repetição exaustiva do `v-if`.

E no final, ainda, podemos combinar todos os valores para fazer um resumo da paginação.

Veja:

{% raw %}
```html
<div>
  <div class="left">Exibindo {{ users.data.length }} de {{ users.total }} usuários</div>
  <div class="right">Página {{ users.current_page }} de {{  users.last_page }}</div>
</div>
```
{% endraw %}

Então perceba que, além da paginação, o `paginate` do Laravel retorna informações importantes para serem mostradas ao usuário.

<!-- ads common -->
{% include ads_common.html %}

## Criando o componente de paginação

Sabendo das informações demonstradas acima, podemos montar o componente de paginação baseado nas informações retornadas pelo Laravel. Podemos utilizar apenas uma propriedade para montar nossos links de paginação.

Vamos fazer a chamada da seguinte forma:

```html
<laravel-pagination :pagination="users" @input="page => paginate(page)" /> 
```

Utilizaremos como modelo um componente de paginação que ensinei a criar [nessa publicação](https://wallacemaxters.com.br/blog/2020/03/14/limitar-links-paginacao-vue). Leia para entender a lógica detalhadamente.

Exemplo:

{% raw %}
```html
<template>
  	<ul v-if="pagination.last_page > 1">
      <li>
          <a @click="previous()">&laquo; anterior</a>
      </li>
        <li v-for="number in numbers" 
           :class="{'active' : number === pagination.current_page}">
            <a @click="$emit('input', number)">{{ number }}</a>
        </li>
        <li>
          <a @click="next()">próximo &raquo;</a>
        </li>
    </ul>
</template>
<script>
export default {
  name: "laravel-pagination",

  props: {
    pagination: Object,
    limitLinks: {
      type: Number,
      default: 10
    }
  },

  computed: {
    numbers() {
      const links = [];
      const start = Math.floor(this.pagination.current_page / this.limitLinks) * this.limitLinks;
      const end = Math.min(start + this.limitLinks, this.pagination.last_page);

      for (let i = start; i < end; i++) {
        links.push(i + 1);
      }
      
      return links;
    }
  },
  
  methods: {
    
    previous() {
        const page = Math.max(1, this.pagination.current_page - 1);
    	this.$emit('input', page);
    },
    
    next() {
    	const page = Math.min(this.pagination.last_page, this.pagination.current_page + 1);
        this.$emit('input', page);
    }
  }
};
</script>
<style scope lang="scss">
  .active{
    color: red;
  }
</style>
```
{% endraw %}

Como se vê, utilizamos as informações da propriedade `pagination` para montar os links do nosso componente. Essas informações podem ser passadas exatamente assim toda vez que os dados vierem do resultado da chamada de `paginate` feita na API.

### Explicando o código

* Utilizamos o `$emit("input", number)` para indicar qual página está sendo selecionada.
* Em `previous` definimos o "recuo" de uma página com o valor mínimo de 1 (porque sempre é a primeira página).
* Em `next` definimos o avanço de uma página com o valor máximo sendo a última página, para não ultrapassarmos o valor limite da página.
* Nos demais links, do loop, usamos os números das páginas, limitados a `10`, conforme ensinei em [Como limitar a quantidade de links da paginação com Vue](https://wallacemaxters.com.br/blog/2020/03/14/limitar-links-paginacao-vue).
* Na expressão `v-if="pagination.last_page > 1"`, definimos que a paginação só será exibida caso exista mais de uma página.
* Na expressão `:class="{'active' : number === pagination.current_page}"` definimos um estilo diferenciado para a número da página atual.