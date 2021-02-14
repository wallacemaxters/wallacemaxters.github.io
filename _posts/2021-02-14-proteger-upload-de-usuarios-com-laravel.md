---
layout: post
title: Protegendo upload de usuários com Laravel
date: 2021-02-14 13:55:00 -0200
categories:
- laravel
sitemap: true
image: "/uploads/laravel-seguranca.jpg"
excerpt: Como desenvolvedores web, devemos sempre nos lembrar da importância de proteger
  os dados do usuário. Aprenda a proteger upload de arquivos através de autenticação
  ou autorização no Laravel

---
Como desenvolvedores web, devemos sempre nos lembrar da importância de proteger os dados do usuário. E muitas vezes é comum precisamos que um determinado upload ou arquivo esteja acessível de maneira restrita para um usuário, dependendo da regra de negócio da aplicação que estamos desenvolvendo.

Existe uma solução simples para proteger o acesso aos arquivos da sua aplicação escrita em Laravel. Vejamos  abaixo alguns passos para fazermos isso.

## Onde fazer o upload?

Geralmente, alguns desenvolvedores Laravel fazem o upload diretamente na pasta `public` da aplicação. Ou mesmo, utilizamos a pasta `storage`, porém com um link simbólico dentro da pasta `public` apontando para `storage/app/public` (esse link é gerado pelo comando `php artisan storage:link`). Isso faz com que o acesso aos arquivos sejam públicos. Porém nem sempre queremos que seja assim.

Se ainda assim precisamos fazer o upload dos arquivos no mesmo disco onde a aplicação Laravel se encontra, sem que os mesmos estejam públicos, podemos utilizar o Storage `local` para isso. 
As configurações para a opção `local` se encontra no arquivo `config/filesystems.php`.

Veja um exemplo:

```php
$caminho = $request->file('arquivo')->store('uploads', ['disk' => 'local']);
return Arquivo::create(['caminho' => $caminho]);
```

No exemplo acima, a opção `['disk' => 'local']` fará que o upload de arquivos sejam enviados para a pasta `storage/app/uploads`. Além disso, salvamos o caminho relativo do arquivo no banco de dados. Este último passo citado é importante para o próximo passo.

## Visualizando os arquivos protegidos

Agora vamos permitir que um arquivo só possa ser visualizado após o usuário estar autenticado na aplicação Laravel.

Nesse caso, vamos criar uma rota, que responda seu upload enviado anteriormente, baseado no `id` que foi salvo em seu banco de dados. Essa rota deve ser protegida pelo middleware `auth`.

Exemplo:

```php
Route::get('arquivo/{id}', function (Arquivo $arquivo) {

    $disco = Storage::disk('local');

    return response($disco->get($arquivo->caminho), 200, [
        'content-type' => $disco->mimeType($arquivo->caminho)
    ]);

})->middleware('auth');
```

Assim, caso o usuário esteja autenticado, bastaria acessar `arquivo/1` para visualizar o arquivo protegido. Caso contrário, o mesmo será redirecionado para autenticação (ou receberá uma resposta 401, caso esteja utilizando API).

É importante informar o header `Content-Type` na resposta, para que o navegador entenda que a resposta se trata de um arquivo.

> **Nota**: Se estiver utilizando a autenticação via API, você pode simplesmente usar o middleware `auth:api`.

<!-- ads common -->
{% include ads_common.html %}

## Protegendo os arquivos por nível de acesso

Tomando como base um pequeno exemplo, poderíamos verificar se determinado usuário é de um tipo. Caso corresponda ao requisitado, retornamos o arquivo. Caso contrário, retornamos o erro 403, informando que a ação não é autorizada.

Exemplo:

```php
Route::get('arquivo/{id}', function (Arquivo $arquivo) {

   if (auth()->user()->tipo !== 'admin') {
       return response('Você não pode acessar esse arquivo', 403);
   }

   $disco = Storage::disk('local');

   return response($disco->get($arquivo->caminho), 200, [
       'content-type' => $disco->mimeType($arquivo->caminho)
   ]);

})->middleware('auth');
```

## Utilizando Policy

Você também pode utilizar o [Policy](https://laravel.com/docs/5.8/authorization) do Laravel para autorizar um uso de uma rota. Funcionaria perfeitamente para nosso exemplo.

Primeiro, rode o comando:

```bash
php artisan make:policy ArquivoPolicy
```

Em seguida, adicione o seguinte trecho:

```
namespace App\Policies;

use App\Models\User;
use App\Models\Arquivo;
use Illuminate\Auth\Access\HandlesAuthorization;

class ArquivoPolicy
{
    use HandlesAuthorization;

    public function visualizar(User $usuario, Arquivo $arquivo)
    {
        if ($usuario->tipo === 'admin') return true;
        
        return $this->deny('Somente administradores podem executar essa ação.');
    }
}
```

Altere seu `AuthServiceProvider`, modificando a variável `$policies`, assim:

```php
protected $policies = [
  // ...
  Arquivo::class => ArquivoPolicy::class,
];
```
E no seu controller, faça assim:

```php
class ArquivosController extends Controller
{

    public function show($id)
    {
        $arquivo = Arquivo::findOrFail($id);

        $this->authorize('visualizar', $arquivo);

        $disco = Storage::disk('local');

        return response($disco->get($arquivo->caminho), 200, [
            'content-type' => $disco->mimeType($arquivo->caminho)
        ]);
    }
}
```

Caso o usuário não tenha autorização, o Laravel enviará uma resposta 403. Caso tenha, será exibido o arquivo normalmente.