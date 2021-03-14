---
layout: post
color: "#FF60C9"
title: Como pesquisar por mês ou ano no Laravel?
date: 2021-02-23T13:12:33.000-03:00
categories:
- laravel
sitemap: true
image: "/uploads/laravel_database_search.svg"
excerpt: Aprenda como filtrar suas pesquisas no Laravel através de um ano e mês informado
  de maneira simples e eficiente!

---
Eu já ensinei aqui no blog
[como criar filtros de pesquisa no Laravel através de um intervalo de datas]({% post_url 2020-11-09-criando-filtros-de-pesquisa-por-intervalo-de-datas-no-laravel %}). Porém há outro caso muito comum, que é quando precisamos pesquisar através apenas do mês e ano de uma coluna.

----

## Pesquisando dados por mês ou ano

No Laravel, você pode fazer um filtro de pesquisa em um campo do tipo `DATETIME` ou `TIMESTAMP` facilmente. Por exemplo, ao utilizar o Eloquent, você precisaria apenas chamar os métodos `whereYear` ou `whereMonth` para filtrar pelo ano ou mês (respectivamente) da data registrada em uma coluna de uma tabela.


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

```php
Route::get('/produtos', 'ProdutosController@index');
```

Para filtrar o resultado dessa pesquisa por mês e ano, bastaria acessar o endpoint de produtos da seguinte forma:

```text
/produtos?mes=2&ano=2021
```

----

## Explicando o funcionamento de whereYear e WhereMonth no Laravel

O método `whereYear` modifica a SQL query, adicionando `YEAR(created_at)`. Esta função faz com que seja capturado apenas o ano da coluna informado. Já `whereMonth` adiciona `MONTH(created_at)`. O próprio SGBD cuidará de executar a pesquisa baseada no ano e mês informados.

### Testando a formação da sua SQL Query

Para testar como uma SQL é criada ao chamar o Query Builder do Laravel, você pode utilizar o `toSql`.

Veja:

```php
echo Produto::whereYear('created_at', '=', 2021)->whereMonth('created_at', '=', 2)->toSql();
```

Isso irá gerar a saída:

```sql
select * from `produto` where year(`created_at`) = ? and month(`created_at`) = ?
```