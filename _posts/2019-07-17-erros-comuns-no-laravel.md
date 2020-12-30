---
layout: post
title: Erros comuns no Laravel
date: 2019-07-17T21:00:00.000-03:00
categories:
- laravel
sitemap: true
image: "/uploads/problemas-dev-programcao.jpg"
excerpt: 'Existem vários erros que podem acontecer numa aplicação Laravel, que simplesmente podem se repetir várias vezes, sem você descobrir a causa logo de cara. Descubra aqui a solução para alguns dos erros mais comuns.'

---
Eu já vi vários erros acontecerem no Laravel que simplesmente gastariam um bom tempo do desenvolvedor que está iniciando com o framework ao tentar descobrir o motivo. Vou listar abaixo um dos mais comuns e as suas respectivas soluções para poder dar um auxílio a respeito deles.

## Declarei uma rota, mas ela não é encontrada

Essa eu já vi acontecer várias vezes. O dev cria uma determinada rota no Laravel e, ao tentar acessá-la pelo navegador ou um cliente REST, simplesmente nada funciona. Sempre aparece erro 404. Ao rodar o comando `php artisan route:list` ela está lá listada, da maneira como eu espero acessá-la, porém ela não funciona no navegador!

O problema que geralmente causa isso é a ordem de declaração da rota. Mais ou menos assim:

```php
Route::get('usuario/{usuario}', 'UsuarioController@show');
Route::get('usuario/ultimos-acessos', 'UsuarioController@ultimosAcessos');
```

O que ocorre no caso acima é que, ao acessar a rota `usuario/ultimos-acessos`, você corre grande risco de receber um `404` como resposta, devido a rota que foi definida anteriormente. Uma vez que `{usuario}` se refere a um valor variável após a declaração `usuario/`, o Laravel vai entender "ultimos-acessos" na url como sendo um valor para `{usuario}`. O 404 ocorre geralmente porque esse valor "ultimos-acessos" ser passado como se fosse o `id` do Usuário da rota.

**Solução 1:** Troque a ordem de declaração da rotas.

Geralmente, para resolver isso, eu costumo simplesmente trocar a ordem de declaração da rota. Assim:

```php
Route::get('usuario/ultimos-acessos', 'UsuarioController@ultimosAcessos');
Route::get('usuario/{usuario}', 'UsuarioController@show');
```

Ao declarar dessa forma, o Laravel irá priorizar a rota que foi declarada primeiro na hora da busca interna.

**Solução 2:** Definir a expressão regular para a variável:

De acordo com a [documentação do Laravel](https://laravel.com/docs/5.8/routing), você pode usar também o método `where` para definir uma trecho de uma expressão regular para representar o valor da variável da rota.

Exemplo:

    Route::get('usuario/{usuario}', function ($id) {
        //
    })->where('id', '[0-9]+');

Ao definir a expressão regular `[0-9]+`, você fará que a rota funcione apenas quando um número for passado.

## Ao rodar o `db:seed`, aparece um erro, dizendo que a classe não existe

Já vi isso acontecer várias vezes. Porém, geralmente isso não costuma acontecer quando eu crio a seeder pelo comando `php artisan make:seeder`. Mas tem dois casos que sempre gerava esse erro: Quando eu inventava de fazer a seeder manualmente, ou quando ela vinha de uma atualização via `git pull`.

O que costuma acontecer é que, ao rodar o `php artisan db:seed`, aparece que a classe não existe, mesmo ela estando na pasta `database/seeder` e estando com o nome correto.

Apesar de não pesquisar o problema a fundo, eu percebi que isso ocorre por um problema no esquema Autoload do Composer.

**Solução**
Isso pode ser corrigido usando um `composer dump`. Ao fazer isso, o Composer gerará todos os autoloads para as classes  do projeto.

Agora basta a rodar o seed novamente e tudo vai funcionar.

## O `tinker` cria alias das minhas models, porém para alguns models não funcionam

Eu adoro usar o `tinker`. E nas versões mais novas do Laravel, quando você instancia uma classe, ele costuma automaticamente resolver o `namespace` da classe.

Por exemplo, se tenho o model `App\Models\Usuario` e fizer um `new Usuario` no `tinker`, ele vai resolver o `namespace` sem precisar escrever o caminho da classe inteiro. Isso é bastante útil e economiza tempo.

O problema é que as vezes parece não funcionar para models recém-criadas...

A solução é a mesma citada no caso da Seeder: rodar o `composer dump`.

Se você tiver uma model (ou qualquer outra classe) cujo o namespace não esteja sendo resolvido automaticamente ao rodar o tinker, você pode simplesmente rodar `composer dump` e abrir o tinker novamente.

## Criei uma nova coluna na tabela, mas, ao atualizar, aquele campo não é preenchido.

Você criou uma nova coluna na sua tabela, seja com migration ou "na mão". Agora, está tentando preencher esse campo. Ao enviar pelo formulário, não funciona. Ao tentar inserir manualmente pelo `php artisan tinker`, também não funciona...

O cenário é mais ou menos esse:

    $usuario = Usuario::find(1); 
    $usuario->fill(['nova_coluna' => 'Novo valor']);
    $usuario->save();
    //$usuario->nova_coluna continua NULL no banco de dados

Mas o que pode ser?

**Solução**

Bem, você pode ter esquecido de colocar a nova coluna na propriedade `$fillable` do seu Model.

Com essa propriedade, o Laravel controla quais campos serão "preenchíveis" através de métodos `create`, `update` ou `fill`.

Faça o seguinte:

    class Usuario
    {
        protected $fillable = [
             // ... outros campos
             'nova_coluna'
        ];
    }
    
    
