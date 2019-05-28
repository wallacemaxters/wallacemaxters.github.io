---
layout: post
title: Como proteger acesso a arquivos via login com Laravel?
date: 2019-03-18T03:00:00.000+00:00
categories:
- Laravel
sitemap: true
image: "/uploads/laravel-seguranca.jpg"

---
Quando fazemos uma aplicação que contenha upload, muitas vezes a regra de negócio exige que esses arquivos só possam ser acessado por meio de autenticação ou autorização.

Existe uma solução que eu costumo utilizar para isso em Laravel.

**Onde fazer o upload?**

Geralmente, fazemos o upload para a pasta `public` da aplicação. É verdade que nas versões recentes do Laravel, é utilizada a pasta `storage` com um link simbólico para a pasta `public`, mas o acesso continuaria sendo público.

A primeira coisa a ser feita é não armazenar esses arquivos em nenhum lugar que seja público.

Exemplo:

    $request->file('arquivo')->store('uploads')

Nesse primeiro passo, é importante salvar o caminho do arquivo em algum lugar. Você pode obter esse caminho através do retorno de `store`.

Assim:

    $path = $request->file('arquivo')->store('uploads')
    ModelUpload::create(['path' => $path]);

> **Nota**: no exemplo acima, podemos imaginar uma tabela que contenha `id` e um campo para armazenar o caminho, que chamei de `path`.

**Exibindo o arquivo protegido**

Agora, é que analisamos o problema. Quando você armazena num serviço S3 da Amazon, você poderia facilmente utilizar a url temporária para acessar o arquivo. Mas nem sempre, as aplicações que fazemos usam s3. Além disso, pode ainda de não querermos um link temporário, e sim uma url que só possa ser acessível via login.

Nesse caso, a solução que proponho é criar uma rota que tenha como resposta o seu arquivo. Essa rota, obviamente, deverá ser protegida, via login e/ou autorização.

Tomemos como exemplo um arquivo que só pode ser visto caso esteja autenticado.

Veja:

    Route::get('uploads/{model_upload}', function (Request $request, ModelUpload $model) {
    
    	$path = $model_upload->path;
        
         return response(Storage::get($path), 200, [
         	'content-type' => Storage::mimeType($path)
         ]);
    
    })->middleware('auth');

Assim, para ver o arquivo armazenado, bastaria acessar `uploads/1`. 

É importante sempre informar o `Content-Type` na resposta, para que o navegador entenda seu arquivo de forma correta no momento da resposta.

Como utilizei o Middleware `auth`, essa rota só poderá ser acessada mediante autenticação, ou seja, o arquivo só será visualizado se o usuário estiver autenticado.

**Autorização**

Além disso, se você deseja adicionar mais restrição, você poderia utilizar o [`Policy`](https://laravel.com/docs/5.8/authorization) do Laravel. Esse rota de arquivo funcionará como uma outra rota qualquer, sendo diferente apenas no tipo de resposta. Sendo assim, você poderá aplicar normalmente restrições através do Gate ou Policy.

Mas, tomando como base um pequeno exemplo, poderíamos verificar se determinado usuário é de um tipo. Caso corresponda ao requisitado, respondemos com o arquivo; Se não, respondemos com erro 403 (acesso não autorizado).

Veja:

    Route::get('uploads/{model_upload}', function (Request $request, ModelUpload $model) {
    
       if (auth()->user()->tipo !== 'admin') {
        	return response('Você não pode acessar esse arquivo', 403);
       }
        
        $path = $model_upload->path;
        
        return response(Storage::get($path), 200, [
         	'content-type' => Storage::mimeType($path)
        ]);
    
    })->middleware('auth');