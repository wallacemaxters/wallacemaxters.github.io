---
layout: post
title: 'Laravel: Como criar filtros de pesquisa no Eloquent de maneira eficiente?'
date: 2020-03-29T10:45:34.000-03:00
categories:
- laravel
- eloquent
sitemap: true
image: "/uploads/laravel_database_search.svg"

---
O Eloquent é um ORM do Laravel que permite facilitar bastante as consultas realizadas no seu banco de dados. Nesse tutorial, estarei ensinado uma maneira simples de filtrar dados no Eloquent de maneira eficiente, evitando repetições e códigos grandes;

Geralmente, quando estamos desenvolvendo uma API ou simplesmente uma página no Laravel, o Eloquent nos auxilia bastante na tarefa de realizar operações no banco de dados. Em, em muitos desses casos, quando precisamos realizar uma listagem de dados, precisamos também que os mesmos sejam filtrados.

Podemos tomar como exemplo uma listagem de produtos, que pode ser representada da seguinte forma:

```php
Route::get('/produtos', function () {

    $produtos = Produto::paginate();

    return $produtos;
})
```

O código acima retorna uma lista paginada de produtos. Geralmente, além da listagem, quase sempre precisamos de filtrar essas consultas. No Laravel, por exemplo, podemos utilizar o object `Request` para fazermos isso. Nós podemos simplesmente verificar se o valor de uma query string foi preenchido e usar o `LIKE`  para realizar esse filtro.

Exemplo:

```php
Route::get('/produtos', function (Request $request) {

    $query = Produto::query();

    if ($request->has('nome')) {
        $query->where('nome', 'LIKE', '%' . $request->nome . '%');
    }

    $produtos = $query->paginate();

    return $produtos;
})
```

Esse é o tipo de código mais comum utilizado em filtros de pesquisa.

No caso acima, ao acessar a url `/api/produtos?nome=parafuso`, serão retornados apenas os produtos contendo a palavra "parafuso" no campo `nome`.

Obviamente, se quisermos pesquisar os produtos por outros campos, basta adicionarmos mais `if` e mais `wheres` para isso. Você pode inclusive variar a consulta entre consultas com `LIKE` ou `=`.

Por exemplo, suponhamos que queremos filtrar o nome do produto através de um termo e, ao mesmo tempo, por código de barras e o usuário responsável por cadastrar o mesmo.

Podemos fazer assim:

```php
Route::get('/produtos', function (Request $request) {

    $query = Produto::query();

    if ($request->has('nome')) {
        $query->where('nome', 'LIKE', '%' . $request->nome . '%');
    }

    if ($request->has('codigo_barra')) {
        $query->where('codigo_barra', '=', $request->codigo_barra);
    }

    if ($request->has('usuario_id')) {
        $query->where('usuario_id', '=', $request->usuario_id);
    }

    $produtos = $query->paginate();

    return $produtos;
})
```

Nesse caso, a requisição `/api/produtos?nome=parafuso&usuario_id=1&codigo_barra=XXX` se encarregará de executar a nossa consulta.

### Mas e se eu precisar de consultar por vários campos diferente?

Se continuarmos com a abordagem acima, nosso filtro de pesquisa vai ter um código imenso. Além do mais, é possível perceber que existem repetições nesse código. Note que o `if`, a verificação se o campo foi preenchido com `has` e até mesmo a execução do `where` são repetições, onde apenas o nome do campo é mudado.

Então, se eu desejar consultar os produtos pelos campos `nome`, `descricao` e `beneficios`, usando termos, eu teria que fazer isso:

```php
Route::get('/produtos', function (Request $request) {

    $query = Produto::query();

    if ($request->has('nome')) {
        $query->where('nome', 'LIKE', '%' . $request->nome . '%');
    }

    if ($request->has('descricao')) {
        $query->where('descricao', 'LIKE', '%' . $request->descricao . '%');
    }

    if ($request->has('beneficios')) {
        $query->where('beneficios', 'LIKE', '%' . $request->beneficios . '%');
    }

    $produtos = $query->paginate();

    return $produtos;
})
```

Isso não está muito bom...

Minha opinião é que, se você precisou copiar e colar alguma coisa, você precisa mudar de estratégia, criando uma função ou mesmo usando um laço de repetição.

Foi exatamente por esse motivo que eu resolvi escrever essa publicação.

Vejamos como esse código vai ficar mais simples com uma pequena modificação:

```php
Route::get('/produtos', function (Request $request) {

    $query = Produto::query();

    $termos = $request->only('nome', 'descricao', 'beneficios');

    foreach ($termos as $nome => $valor) {
        if ($valor) { 
            $query->where($nome, 'LIKE', '%' . $valor . '%');
        }
    }

    $produtos = $query->paginate();

    return $produtos;
})
```

Acima, utilizamos o `foreach` para iterar sobre os valores retornado por `Request::only`. Essa função retorna um `array`, contendo chave e valor, referente aos campos passados como parâmetro. Caso o valor não exista, o mesmo receberá o valor `NULL`.

Por exemplo, se preenchermos a url dessa forma: `api/produtos?nome=parafuso&beneficios=antiferrugem`, os resultado de `$request->only` seria algo parecido com:

```php
['nome' => 'parafuso', 'beneficios' => 'antiferrugem', 'descricao' => NULL]
```

Por essa razão é que dentro do `foreach` temos um `if` para evitar uma adição de LIKE sem necessidade, caso o campo seja vazio.

Além disso, podemos usar essa mesma abordagem para os campos que queremos pesquisar pela igualdade de valores.

Veja:

```php
Route::get('/produtos', function (Request $request) {

    $query = Produto::query();

    $termos = $request->only('nome', 'descricao', 'beneficios');

    foreach ($termos as $nome => $valor) {
        if ($valor) { 
            $query->where($nome, 'LIKE', '%' . $valor . '%');
        }
    }

    $iguais = $request->only('fornecedor_id', 'usuario_id', 'codigo_barra');

    foreach ($iguais as $nome => $valor) {
        if ($valor) { 
            $query->where($nome, '=', $valor);
        }
    }

    $produtos = $query->paginate();

    return $produtos;
})
```

> **Observação:** Se você preferir, é possível simplificar mais ainda o `foreach`, tirando o `if` e deixando apenas uma expressão booleana `$valor && $query->where('nome', '=', $request->nome);`.

Ainda é possível fazer outro ajuste.

### E se eu quiser executar esse mesmo filtro em outros lugares?

Pode haver casos onde você necessite realizar consultas e filtros em dois ou mais rotas diferentes.

A resposta do programador "esperto" para esse problema seria "copiar e colar". Eu detesto essa prática e prefiro sempre recorrer à reutilização do código.

Para resolvermos isso, podemos elaborar duas formas fazermos isso de maneira bem fácil no Laravel.

## 1 - Utilizando Request e Closure

Para quem não sabe, o Eloquent aceita uma `Closure` (função anônima) como argumento para o método `where`. As funções anônimas em PHP podem ser retornadas em funções/métodos e/ou armazenadas em váriaveis. Podemos usar desse artifício para implementarmos a nossa reutilização do filtro de pesquisa.

Primeiro, vamos ver como fica o código atual encapsulado numa função anônima:

```php
Route::get('/produtos', function (Request $request) {

    $search = function ($query) use($request) {

        $termos = $request->only('nome', 'descricao', 'beneficios');

        foreach ($termos as $nome => $valor) {
            if ($valor) { 
                $query->where($nome, 'LIKE', '%' . $valor . '%');
            }
        }

        $iguais = $request->only('fornecedor_id', 'usuario_id', 'codigo_barra');

        foreach ($iguais as $nome => $valor) {
            if ($valor) { 
                $query->where($nome, '=', $valor);
            }
        }
    };

    return Produto::where($search)->paginate();
})
```

> **Nota**: Ao construir a sua query dentro de uma `Closure`, esteja ciente que a expressão em SQL referente a essa closure será encapsulada por parêntesis. Exemplo: `select * from produtos where (nome like "%parafuso" and usuario_id = 1)`. Isso pode ser bastante útil se você seja isolar seu filtro, principalmente se estiver usando `OR` ao invés de `AND`.

Tendo isso em vista, agora podemos simplesmente isolar a consulta em uma função ou método e usar em qualquer lugar que necessitemos dessa consulta.

No nosso caso, vamos criar uma `Request` específica para realizar representar a nossa consulta e usar um método nela para retornar essa mesma função anônima acima.

Para fazer isso, rode o comando `php artisan make:request ProdutoConsultaRequest` e em seguida utilize o código abaixo:

```php
class ProdutoConsultaRequest extends FormRequest
{
    public function authorize()
    {
        return true;
    }

    public function rules() 
    {
        return [];
    }

    public function getSearchCallback()
    {
        return function ($query) {

            $termos = $this->only('nome', 'descricao', 'beneficios');

            foreach ($termos as $nome => $valor) {
                if ($valor) { 
                    $query->where($nome, 'LIKE', '%' . $valor . '%');
                }
            }

            $iguais = $this->only('fornecedor_id', 'usuario_id', 'codigo_barra');

            foreach ($iguais as $nome => $valor) {
                if ($valor) { 
                    $query->where($nome, '=', $valor);
                }
            }
        };
    }
}
```

Por padrão, ao criar uma request, os métodos `authorize` e `rules` são criados. Eles são necessários para o funcionamento correto da request.

Nós criamos a função `getSearchCallback`, que retorna a `Closure` que precisamos. Note que trocamos `$request` por `$this`, já que estamos dentro do contexto da classe que herda `Request`.

Vamos imaginar um cenário onde estejamos usando [SoftDelete](https://laravel.com/docs/5.8/eloquent#soft-deleting) em `Produto`. Queremos que um endpoint retorne os produtos normais e outro, que retorne apenas os excluídos.

Podemos usar esse código:

```php
use App\Http\Requests\ProdutoConsultaRequest;

class ProdutosController extends Controller
{
    public function index(ProdutoConsultaRequest $request)
    {
        return Produto::where($request->getSearchCallback())->paginate();
    }

    public function lixeira(ProdutoConsultaRequest $request)
    {
        return Produto::onlyTrashed()->where($request->getSearchCallback())->paginate();
    }
}
```

Dessa forma, podemos reduzir todo aquele código em uma simples linha.

No meu ponto de vista, a vantagem de usar uma `Request` costumizada para tal operação é você podar usar o `rules` para validar os campos que você utilizará como filtro.

Por exemplo, poderíamos adicionar a seguinte validação à `rules`:

```php
public function rules()
{
    return [
        'nome'       => 'nullable|string',
        'usuario_id' => 'nullable|exists:usuarios,id',
        // outras validações ...
    ];
}
```

No exemplo acima, o campo `usuario_id` só será aceito caso seja um valor existente na tabela `usuarios`.

> Nota: Utilizei `nullable` porque campos de filtro de pesquisa geralmente são opcionais.

## 2 - Usando Query Scopes

A segunda opção para simplificar nosso filtro  seria usar as [Local Scopes](https://laravel.com/docs/5.8/eloquent#local-scopes).

Resumidamente, uma *Local Query Scope* permite que você escreva um trecho de uma consulta, através do Query Builder do Eloquent. Assim, você poderá utilizar este *Scope* para criar trechos complexos de queries a serem utilizados e reutilizados em sua aplicação.

No caso, vamos aplicar um *Local Scope* para fazer nosso filtro de pesquisa.
Exemplo:

```php
class Produto extends Model
{
    // restante do código

    public function scopeSearch($query, $request)
    {
    
        $termos = $request->only('nome', 'descricao', 'beneficios');

        foreach ($termos as $nome => $valor) {
            if ($valor) { 
                $query->where($nome, 'LIKE', '%' . $valor . '%');
            }
        }

        $iguais = $request->only('fornecedor_id', 'usuario_id', 'codigo_barra');

        foreach ($iguais as $nome => $valor) {
            if ($valor) { 
                $query->where($nome, '=', $valor);
            }
        }
        
        return $query;
    }
}
```

> Nota: Uma Local Scope pode ser chamada simplesmente usando o nome que está à frente de `scope` na declaração do método. Deve-se considerar que o primeiro parâmetro `$query` é usado internamente pelo Laravel. Então ao chamarmos, devemos contar o segundo parâmetro como sendo o primeiro, e o terceiro, o segundo, e assim por diante.

O nosso controller poderia ficar assim:

```php
class ProdutosController extends Controller
{
    public function index(Request $request)
    {
        return Produto::search($request)->paginate();
    }

    public function lixeira(Request $request)
    {
        return Produto::onlyTrashed()->search($request)->paginate();
    }
}
```

Eu preferi deixar a passagem de `$request` explicitamente, ao invés de chamar a função `request()` dentro da Local Scope. O motivo é que `request()` sempre retorna a `Illuminate\Http\Request` , que é a classe padrão do Laravel para representar as requisições. 
Contudo, ao utilizarmos um parâmetro no scope `search`, poderíamos, opcionalmente, utilizar uma request costumizada (por exemplo, aquelas que criamos com `php artisan make:request`).

Porém, caso queira omitir a passagem de `request`, você pode criar alterar a sua Local Scope, da seguinte forma:

```php
class Produto extends Model
{
    // restante do código

    public function scopeSearch($query, $request = null)
    {
        if ($request === null) {
            $request = request();
        }

        $termos = $request->only('nome', 'descricao', 'beneficios');

        foreach ($termos as $nome => $valor) {
            if ($valor) { 
                $query->where($nome, 'LIKE', '%' . $valor . '%');
            }
        }

        $iguais = $request->only('fornecedor_id', 'usuario_id', 'codigo_barra');

        foreach ($iguais as $nome => $valor) {
            if ($valor) { 
                $query->where($nome, '=', $valor);
            }
        }
        
        return $query;
    }
}
```

As chamadas poderíam ser alteradas para:

```php
Produto::search()->paginate()
```

Assim, seu Local Scope de filtro de pesquisa poderá utilizar tanto a chamada `Produto::search()` como `Produto::search($outra_request)`.

### Como utilizar os filtros de pesquisa em diversos projetos?

Há casos (como o meu) onde você não trabalha com um, mas com vários projetos escritos em cima do Laravel. E praticamente a maioria deles precisam que você escreva esses tipos de filtro.

Para ajudar a tornar esse trabalho menos repetitivo, eu criei **uma biblioteca** chamada [Eloquent Filter](https://github.com/LaravelLegends/eloquent-filter) no [Laravel Legends](https://github.com/LaravelLegends).

A bibliotea Eloquent Filter permite você utilizar parâmetros simples numa requisição `GET`, através de palavras-chaves específicas, para realizar sua pesquisa de acordo com o desejado.

Exemplo:

```php
use App\Models\Produto;
use Illuminate\Http\Request;
use LaravelLegends\EloquentFilter\Filter;

Route::get('/produtos', function (Request $request) {

   $query = Filter::fromModel(Produto::class, $request);
   
   return $query->paginate();
});

```
No caso acima, caso queria consultar pela palavra-chave "parafuso", como no primeiro exemplo, você precisaria fazer a seguinte chamada:

```
/produtos?contains[nome]=parafuso
```