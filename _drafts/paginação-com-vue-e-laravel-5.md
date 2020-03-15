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

O primeiro ponto que gosto de observar que é os frameworks e bibliotecas costumam utilizar padrões para facilitar a nossa vida. Muitas vezes o desenvolvedor acaba criando ou fazendo coisas desnecessárias no momento de obter um dado ou fazer uma operação, sendo que o framework já tem uma solução fácil para isso.

Um grande exemplo disso é o método `paginate` do Eloquent do Laravel. Já vi vários desenvolvedores utilizando o `paginate` apenas quando deseja exibir os links da paginação numa Blade View. Porém quando se trata de retornar os dados numa API, o desenvolvedor cria manualmente toda a operação, usando os métodos `take` e `skip` para fazer a paginação pelo Eloquent.

Mas isso é denecessário, uma vez que o método `paginate` pode ser combinado com `response()->json()`. E aí que vem a parte legal: Ele já tem uma padronização quanto ao retorno dos Dados.

Por exemplo, se você tiver uma rota `api/users`, você pode simplesmente retornar o `paginate` no `response()->json()`.

```php
Route::get('users', function () {
	$users = User::paginate();
	return response()->json($users);
});
```