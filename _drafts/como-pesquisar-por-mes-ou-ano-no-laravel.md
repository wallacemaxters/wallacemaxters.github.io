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
```php
function index(Request $request) 
{
    $query = Produto::query();
    
    if ($request->has('ano')) {
        $query->whereYear('ano', '=', $request->ano);
    }
    
    if ($request->has('mes')) {
        $query->whereMonth('mes', '=', $request->mes);
    }

    return $query->paginate(); // ou $query->get() se quiser retornar tudo
}
```