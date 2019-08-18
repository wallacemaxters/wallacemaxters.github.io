---
layout: post
title: Cache de resposta com Laravel!
date: 2019-08-17 19:32:00 -0300
categories:
- laravel
sitemap: true
image: "/uploads/Laravel.jpg"

---

Há alguns cenários no Laravel onde uma informação devolvida pode ser cacheado. No meu caso especificamente, quando precisei devolver uma imagem ou um PDF. Nesses casos, como as informações geralmente eram raramente atualizadas, eu preferi implementar um cache na resposta.


Normalmente, o Laravel por padrão sempre irá responder normalmente com o status `200` para qualquer tipo de resposta que você usa (seja PDF, JSON, HTML ou imagens). 

Como o objetivo é retornar uma resposta cacheada, precisamos utilizar o status `304` (*not modified*). O `304`, no entanto, deverá ser utilizado caso esteja presente o header `If-modified-since`. Esse header sempre será enviado pelo navegador, após o header `Last-modified` em uma resposta. Melhor explicando: quando o navegador recebe `Last-modified`, nas próximas requisições, ele enviará `If-Modified-since`.


Suponhamos que determinada resposta é enviada pelo Laravel é baseada em um registro no banco de dados, e esse registro possui uma data de modificação `updated_at`. Podemos utilizar o campo `updated_at`, por exemplo, como ponto de partida para fazermos o cache de resposta. Ou seja, usaremos ele para devolver como `Last-modified` na resposta.

Exemplo:

```php
$usuario = Usuario::findOrFail($id);

$pdf = $this->gerarPdfCurriculo($usuario);

return response($pdf, 200, [
    'Last-modified' => $usuario->updated_at->format(\DateTime::COOKIE)
]);

```

Note que o header `last-modified` tem uma formatação de data específica. A constante `DateTime::COOKIE` possui esse formato padronizado.

Além disso, para devolver o `last-modified`, usamos o status `200` inicialmente. 

Na resposta, terá algo parecido com isso:

```
Last-Modified: Friday, 09-Aug-2019 01:34:20 UTC
```


> **Nota:** Você poderá acessar essas informações ao acessar a ferramenta de desenvolvimento do Google Chrome ou Firefox, clicando na aba "Network" e na url de resposta.


Esse valor será enviado na próxima requisição que você fizer nessa mesma url, através do header `If-modified-since`. E é com ele que vamos trabalhar agora.

A lógica é a seguinte: 

- Comparar os valores de `updated_at` para verificar se é o mesmo de `If-modified-since`
- Enviar uma resposta "vazia" informando o status `304`.


Vamos fazer uma pequena modificação no código:

```php
$usuario = Usuario::findOrFail($id);

$lastModified = $usuario->updated_at->format(\DateTime::COOKIE);

if ($lastModified === $request->header('If-modified-since'))
{
    return response('', 304);
}

$pdf = $this->gerarPdfCurriculo($usuario);

return response($pdf, 200, [
    'Last-modified' => $lastModified
]);
```

Para testar, basta agora atualizar a página. Verifique se o status é `304`. Caso tudo tenha dado certo, o navegador se encarregará de recuperar o valor armazenado em cache da última requisição e exibirá. 

Ou seja, não respondemos nada do servidor quando há o header `if-modified-since` informado e, mesmo assim, o navegador recuperou as informações em cache.


Eu particularmente, acho isso bastante útil para casos onde a criação de um PDF ou uma imagem é custoso para o servidor e, ao mesmo tempo, o cliente deseja acessa esse recurso várias vezes. 

Já houve casos onde eu percebi que uma resposta para geração de um PDF demorava uns 2 segundos. Na segunda requisição, já não demora, pois o resultado foi armazenado em cache.


#### Observações

É importante informar alguns pontos para que os testes funcione:

- Se você estiver utilizando a ferramenta de desenvolvedor do Chrome ou Firefox, certifique-se de fazer os testes deixando a opção *Disable Cache* desativada.

- Se você customa usar `http://localhost` ou `http://127.0.0.1`, alguns navegadores poderão desabilitar o cache nas requisições automaticamente. Para resolver isso, você pode vincular o [Artisan Serve a outro host]({% post_url 2019-08-17-truques-com-o-comando-php-artisan-serve %}) para testar sua aplicação.
