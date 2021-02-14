---
layout: post
title: Protegendo upload de usuários com Laravel
date: 2019-05-28T00:35:00.000+00:00
categories:
- laravel
sitemap: true
image: "/uploads/laravel-seguranca.jpg"

---
Quando fazemos uma aplicação que contenha upload, muitas vezes a regra de negócio exige que esses arquivos só possam ser acessado por meio de autenticação ou autorização.

Existe uma solução que eu costumo utilizar para isso em Laravel.

## Onde fazer o upload?

Geralmente, fazemos o upload para a pasta `public` da aplicação. É verdade que nas versões recentes do Laravel é utilizada a pasta `storage` com um link simbólico para a pasta `public`, mas o acesso continuaria sendo público.

Porém, podemos utilizar o disco `local`, cuja configuração se encontra no arquivo `config/filesystems.php`.

Exemplo:

```php
$caminho = $request->file('arquivo')->store('uploads', ['disk' => 'local']);
Arquivo::create(['caminho' => $caminho]);
```

No exemplo acima, o disco `local` fará o upload do arquivo para a pasta `storage/app/uploads` e, em seguida, salvamos o caminho no banco de dados.

## Visualizando os arquivos protegidos

Agora vamos permitir que um arquivo só possa ser visualizado após o usuário estar autenticado na aplicação Laravel.

Nesse caso, uma solução seria criar uma rota, que responda seu upload enviado anteriormente, baseado no `id` da rota. Essa rota também deverá ser protegida pelo middleware `auth`.

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

É importante informar o `Content-Type` na resposta, para que o navegador entenda que a resposta se trata de um arquivo no momento da resposta.

> **Nota**: Se estiver utilizando a autenticação via API, você pode simplesmente usar o middleware `auth:api`.

<ins class="adsbygoogle"
     style="display:block; text-align:center;"
     data-ad-layout="in-article"
     data-ad-format="fluid"
     data-ad-client="ca-pub-4119206527475379"
     data-ad-slot="9977497686"></ins>
<script>
     (adsbygoogle = window.adsbygoogle || []).push({});
</script>

## Protegendo os arquivos por nível de acesso

Tomando como base um pequeno exemplo, poderíamos verificar se determinado usuário é de um tipo. Caso corresponda ao requisitado, respondemos com o arquivo. Se não, respondemos com erro 403 (acesso não autorizado).

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

> **DICA** : Você também pode utilizar o [`Policy`](https://laravel.com/docs/5.8/authorization) do Laravel para autorizar um uso de uma rota. Funcionaria perfeitamente para nosso exemplo.

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