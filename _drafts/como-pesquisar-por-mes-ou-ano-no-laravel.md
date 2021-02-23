---
layout: post
color: "#222222"
title: Como pesquisar por mês ou ano no Laravel?
date: 2021-02-23 00:00:00 -0300
categories:
- laravel
sitemap: true
image: "/uploads/laravel_database_search.svg"
excerpt: No Laravel, você pode pesquisar os dados do seu banco facilmente através
  do mês ou ano. Aprenda nesse tutorial.

---
Eu já ensinei aqui no blog [como criar filtros de pesquisa no Laravel através de um intervalo de datas]({% post_url riando-filtros-de-pesquisa-por-intervalo-de-datas-no-laravel.md %}). Porém há outro caso muito comum, que é quando precisamos pesquisar através apenas do mês e ano de uma coluna.

No Laravel, você pode fazer uma filtro de pesquisa em um campo do tipo `DATETIME` ou `TIMESTAMP` facilmente. Você precisa apenas chamar o método `whereYear` para filtrar pelo ano ou `whereMonth` para filtrar pelo mês das datas registradas no seu banco de dados.

Veja como é simples:

```php
class ProdutosController extends Controller
{
    function index(Request $request) 
    {
        $query = Produto::query();

        if ($request->has('ano')) {
            $query->whereYear('created_at', '=', $request->ano);
        }

        if ($request->has('mes')) {
            $query->whereMonth('created_at', '=', $request->mes);
        }

        return $query->paginate(); // ou $query->get() se quiser retornar tudo
    }
}
```

O método `whereYear` modifica a SQL query, adicionando `YEAR(created_at)`. Já `whereMonth` adiciona `MONTH(created_at)`. O próprio SGBD cuidará de executar a pesquisa baseada no ano e mês passados.

Para testar como uma SQL é criada ao chamar o Query Builder do Laravel, eu costumo utilizar o `toSql` no Laravel.

Veja:

```php
echo Produto::whereYear('created_at', '=', 2020)->whereMonth('created_at', '=', 8)->toSql();
```

Isso irá gerar a saída:


```sql
select * from `produto` where year(`created_at`) = ? and month(`created_at`) = ?
```