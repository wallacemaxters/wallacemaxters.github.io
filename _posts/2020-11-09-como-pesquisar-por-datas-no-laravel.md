---
layout: post
title: Como filtrar as pesquisas por datas no Laravel?
date: 2020-11-09T14:46:00.000-02:00
categories:
- laravel
sitemap: true
image: "/uploads/como-criar-filtros-por-data-no-laravel.jpeg"
excerpt: Aprenda como pesquisar por datas no Laravel de maneira bem simples!
color: "#F8E71C"

---
Há pouco tempo, fiz um tutorial ensinando [como criar filtros de pesquisa no Laravel](https://wallacemaxters.com.br/blog/2020/03/29/laravel-como-criar-filtros-de-pesquisa-no-eloquent-de-maneira-eficiente "Como criar filtros de pesquisa no Laravel"). Porém outra dificuldade que vejo entre os desenvolvedores que utilizam este framework é quando se trata de filtro de pesquisas através de datas.

<hr/>

## Pesquisando por datas no Laravel

Tomando como exemplo uma pesquisa de Produtos, vamos utilizar dois inputs para identificar um período inicial e um período final para nossa pesquisa. Utilizaremos como base o campo `created_at`, como exemplo.

Exemplo BLADE:

{% raw %}

```html
<input type="text" value="{{ request('data_inicio') }} name="data_inicio" />
<input type="text" value="{{ request('data_fim') }} name="data_fim" />


@foreach($produtos as $produto)
   <div>{{ $produto->nome }}</div>
@endforeach
```

{% endraw %}

Exemplo Controller:

```php
public function index(Request $request) 
{

     $produtos = Produto::paginate();
      
     return view('produtos.index', compact('produtos'));
}
```

Geralmente, aqui no Brasil, usamos o formato `DD/MM/AAAA` para as datas. Nesse caso, precisamos de converter esses valores para `DateTime` ou `Carbon`, que tornará mais fácil nosso trabalho no Laravel. Podemos utilizar o método `DateTime::createFromFormat`, por exemplo:

```php
$data_inicio = \DateTime::createFromFormat('d/m/Y', $request->get('data_inicio'));
$data_fim    = \DateTime::createFromFormat('d/m/Y', $request->get('data_fim'));

if ($data_inicio && $data_fim) {
    // Consulta aqui
}
```

Acima verificamos se `$data_inicio` e `$data_fim` são `false`, pois `DateTime::createFromFormat` retornará `false` caso a data seja inválida. Já o `Carbon`, costuma retornar uma exceção caso seja inválido.

É possível utilizar o `Validator`, se desejar retornar um erro, caso uma data inválida seja passada pelo cliente. Talvez seja o melhor caminho para manter a integridade do valor desejado a se buscar.

Exemplo:

```php
public function index(Request $request) 
{

   $request->validate([
        'data_inicio' => 'nullable|date_format:d/m/Y',
        'data_fim'    => 'required_if:data_inicio|date_format:d/m/Y',
   ]);

    $data_inicio = \DateTime::createFromFormat('d/m/Y', $request->get('data_inicio'));
    $data_fim    = \DateTime::createFromFormat('d/m/Y', $request->get('data_fim'));

     if ($data_inicio && $data_fim) {
         // Consulta aqui
     }
}
```

Agora, que temos as datas convertidas, podemos usar os valores para realizar a pesquisa nos registros do banco de acordo com as datas. Vamos então usar a função `whereDate` do Laravel para fazer isso.

```php
public function index(Request $request) 
{

   $query = Produto::query();

   $request->validate([
        'data_inicio' => 'nullable|date_format:d/m/Y',
        'data_fim'    => 'required_if:data_inicio|date_format:d/m/Y',
   ]);

    $data_inicio = \DateTime::createFromFormat('d/m/Y', $request->get('data_inicio'));
    $data_fim    = \DateTime::createFromFormat('d/m/Y', $request->get('data_fim'));

     if ($data_inicio && $data_fim) {
         $query->whereDate('created_at', '>=', $data_inicio);
         $query->whereDate('created_at', '<=', $data_fim);
     }
     
     $produtos = $query->paginate();
     
     return view('produtos.index', compact('produtos'));
}
```

Note que no caso acima, diferente do costume dos vários tutoriais, não utilizei o `whereBetween`. Isso porque geralmente, quando se usa o `whereBetween`, é necessário adicionar à data de início o valor `00:00:00` e no fim, `23:59:59`, para não ter problemas com alguma hora registrada que acaba deixando de ser capturada.  Para não termos que adicionar mais essa complexidade ao código, usei o `whereDate`, pois internamente ele adiciona `DATE(created_at)` na cláusula `WHERE` da SQL.

A query gerada será algo parecido com

```sql
SELECT * FROM produtos WHERE DATE(created_at) >= ? AND DATE(created_at) <= ?
```