---
layout: post
title: Paginação com Vue e Laravel 5
date: 2020-03-15 13:20:00 -0300
categories:
- laravel
- " vue"
sitemap: true
image: ''

---
Usar Laravel como backend e Vue como frontend tem sido algo bastante comum de um tempo para cá. Em vários projetos vejo a utilização dos mesmos e pessoalmente creio que seja uma combinação poderosa.

Nesse tutorial, estaria demonstrando como criar uma paginação com Vue e Laravel.

### Introdução

O primeiro ponto que gosto de observar que é os frameworks e bibliotecas costumam utilizar padrões para facilitar a nossa vida. Muitas vezes o desenvolvedor acaba criando ou fazendo coisas desnecessárias no momento de obter um dado ou fazer uma operação, sendo que o framework já tem uma solução fácil para isso.

Um grande exemplo disso é o método `paginate` do Eloquent do Laravel. Já vi vários desenvolvedores utilizando o `paginate` apenas quando deseja exibir os links da paginação numa Blade View. Porém quando se trata de retornar os dados numa API, o desenvolvedor cria manualmente toda a operação, usando os métodos `take` e `skip` para fazer a paginação pelo Eloquent.

Há uma maneira mais fácil de fazer isso do que a maneira citada anteriormente.

## Utilizando `paginate` do Eloquent

No Laravel 5 (no 4 também isso funcionava), o método `paginate` pode ser transformado em `JSON`. Ou seja, você pode realizar a  chamada de `response()->json()` e responder uma lista de usuários em formato JSON; porém, ao invés de usar `get`, você vai usar o método `paginate`.
E aí que vem a parte legal: Ao chamar `paginate`, o mesmo já possui uma padronização quanto ao retorno dos dados.

Por exemplo, se você tiver uma rota `api/users`, você pode simplesmente retornar o `paginate` no `response()->json()`.

```php
Route::get('users', function () {
	$users = User::where('age', '>', 18)->paginate();
	return response()->json($users);
});
```

Ou ainda, de maneira mais simples, você pode retornar `paginate` diretamente:

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
    }
  ]
}
```

Basicamente, os dados que precisamos listar estão em `data`, que é um `array` contendo os dados de cada `User`.

### Construindo a visualização no Vue

Tudo que temos que fazer agora é pegar o retorno desses dados pelo Vue e exibí-los na Vue.

Exemplo:

```html
<script>
  import api from "../../services/api";
  
  export default {
  
    name: 'users-list',
    
    data() {
      return {
        users: {data: []}
      }
    },
    
    methods: {
      asyc paginate() {
        const {data: users} = await api.get('users');
  		this.users = users;
      }
    }
  }
</script>
```

No caso acima, eu deixei a variável `users` guardando todas as informações retornadas em `api/users`, e não apenas a lista. 

O motivo de fazer isso é justamente poder usufruir do padrão de retorno do Laravel e explicarei isso melhor mais a frente.

O que vai mudar no nosso código será o momento de aplicar o `v-for`, que, ao invés de ser iterado sobre `users`, será iterado sobre `users.data`.

Assim:

```html
<div class="user-info" v-for="user in users.data">
  	{{ user.name }}
</div>
```

### E a próxima página?

Nosso objetivo agora é avançar para o próximo offset de dados (*próxima página*, se preferir) na nossa listagem. 
Não é algo muito difícil. O Laravel precisa apenas que você passe um parâmetro na query string chamado `page` para indicar qual é a "página" de dados que vamos retornar do endpoint.

Vamos modificar o método da seguinte forma:

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

> No *Axios*, quando você deseja passar alguma parâmetro na url, você pode usar a opção `params` contendo um objeto, que representará os valores da query string. É possível concatenar `users?page=${page}`, mas, por questão de gosto, não costumo fazer isso.


Para testar se a paginação funcionou, basta fazer o seguinte:

```html
<a @click="paginate(1)">1</a>
<a @click="paginate(2)">2</a>
<a @click="paginate(3)">3</a>
```

Clique nos links e veja se os mesmos modificam os valores retornados pelo endpoint.

> **Dica**: Se você não tiver muitos dados para testar, você pode passar um parâmetro para `paginate`, que modifica a quantidade de itens para paginação. Quando não tenho muitos dados para testar, uso `paginate(1)` para retornar um item por página.



**Mas por quê guardar todas as informações ao invés de simplesmente a lista?**

O motivo disso é que vamos usar as outras informações para construir melhor a nossa interface a partir de algumas informações.

Vou detalhar cada uma delas:

`total` - Esse valor é referente ao total de itens retornados na paginação. Essa informação é interessante, pois, caso retorne `0`, podemos  exibir a informação que "nenhum usuário foi encontrado".

Exemplo:

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


`current_page` - Esse valor representa a página atual da paginação. Um exemplo de sua importância é poder marcar o link da página atual. 


`last_page` - Esse valor representa qual é o limite de páginas da paginação. Eu costumo utilizá-lo muito para definir se vou exibir os links da paginação ou não, caso seu valor seja `1`, uma vez que não faz sentido exibir links de paginação para uma página.

Exemplo: 

```html
<div v-if="users.last_page > 1">
	<pagination v-model="users.current_page" @input="paginate"  />
</div>
```

Essa lógica também pode ser aplicado diretamente dentro do componente de paginação, caso seja conveniente, pois assim evitamos a repetição exaustiva do `v-if`.

E no final, ainda, podemos combinar todos os valores para fazer um resumo da paginação. 

Veja:

```html
<div>
  <div class="left">Exibindo {{ users.data.length }} de {{ users.total }} usuários
</div>
  <div class="right">Página {{ users.current_page }} de {{  users.last_page }}</div>
</div>
```