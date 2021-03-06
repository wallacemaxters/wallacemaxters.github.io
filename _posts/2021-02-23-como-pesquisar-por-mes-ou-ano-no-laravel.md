---
layout: post
color: "#FF60C9"
title: Como pesquisar por mês ou ano no Laravel?
date: 2021-02-23T13:12:33.000-03:00
categories:
- laravel
sitemap: true
image: "/uploads/laravel-filtro-pesquisa-mes-ano.png"
excerpt: Aprenda como filtrar suas pesquisas no Laravel através de um ano e mês informado
  de maneira simples e eficiente!

---
Eu já ensinei aqui no blog
[como criar filtros de pesquisa no Laravel através de um intervalo de datas]({% post_url 2020-11-09-criando-filtros-de-pesquisa-por-intervalo-de-datas-no-laravel %}). Porém há outro caso muito comum, que é quando precisamos pesquisar através apenas do mês e ano de uma coluna.

***

## Pesquisando dados por mês ou ano

No Laravel, você pode fazer um filtro de pesquisa em um campo do tipo `DATETIME` ou `TIMESTAMP` facilmente. Por exemplo, ao utilizar o Eloquent, você precisaria apenas chamar os métodos `whereYear` ou `whereMonth` para filtrar pelo ano ou mês (respectivamente) da data registrada em uma coluna de uma tabela.

No exemplo abaixo, temos um controller que retorna uma lista de produtos. Iremos criar um filtro de pesquisa, que devolva um resultado baseado no ano e mês em que esses produtos foram criados. Utilizaremos o campo `created_at` para fazer isso.

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

No nosso exemplo acima, para realizar a pesquisa, bastaria informar o mês e o ano na query string para obter os resultados filtrados.

Veja:

```text
/produtos?mes=2&ano=2021
```

O `$request->has()` aplicado aos campos `mes`e `ano` faz com que a pesquisa seja opcional. Caso um desses campos não sejam informados, não será adicionado a condição ao seu resultado.

Exemplo:

```text
/produtos?ano=2021 
```

***

## Explicando o funcionamento de whereYear e WhereMonth no Laravel

O método `whereYear` modifica a SQL internamente, adicionando `YEAR(created_at)`. Esta função do SGBD específico (Mysql, Sqlite e afins) faz com que seja capturado apenas o ano da coluna informada. Já `whereMonth` adiciona `MONTH(created_at)`. O próprio SGBD cuidará de executar a pesquisa baseada no ano e mês informados.

Exemplificando melhor, suponhamos que você tenha o valor `2015-02-12 12:03:00` registrado na sua coluna `created_at`. Os valores retornados seriam os seguintes:

```sql
SELECT  YEAR('2015-02-12 12:03:00'); /* 2015 */
SELECT MONTH('2015-02-12 12:03:00'); /* 2 */
```

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