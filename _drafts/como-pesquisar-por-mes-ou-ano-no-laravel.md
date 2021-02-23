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
Eu já ensinei aqui no blog como [criar filtros de pesquisa no Laravel]({% post_url riando-filtros-de-pesquisa-por-intervalo-de-datas-no-laravel.md %})

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