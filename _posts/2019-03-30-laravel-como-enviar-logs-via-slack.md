---
layout: post
title: Como enviar log de erro do Laravel pelo Slack?
date: 2019-03-30T00:00:00.000-03:00
categories:
- laravel
- slack
sitemap: true
image: "/uploads/banner-laravel-slack.jpeg"
color: ''
excerpt: ''

---
Nesse tutorial, vou ensinar a enviar os logs da sua aplicação pelo o Slack. Isso é algo que pode ser interessante, já que você poderá ser notificado em tempo real, caso alguma anomalía ocorra na sua aplicação.

Vamos ao tutoral

--- 
## Criando uma aplicação no Slack

Primeiro, você deve acessar a sua conta no Slack e acessar página de [api](https://api.slack.com/apps). Nessa primeira etapa, é necessário criar uma aplicação para prosseguir.

Clique no botão **Create an App** para começar, conforme a imagem abaixo:

![Criando uma aplicação no slack para enviar os log de erros com Laravel](/uploads/criar-uma-aplicacao-no-slack-para-integrar-com-laravel.png)

Preencha as informações da sua aplicação e confirme a criação da sua aplicação:

![Criando uma aplicação no slack para enviar os log de erros com Laravel](/uploads/criar-uma-aplicacao-slack.png)

Após a confirmação, você será redirecionado para a tela da sua aplicação, com as seguintes informações abaixo:

![Criando uma aplicação no slack para enviar os log de erros com Laravel](/uploads/slack-criar-webhook.png)

Você deve clicar na opção _incoming webhooks_.

Isso abrirá a tela de criação do webhook da sua aplicação.

> **Obseração**: O Webhook é a URL gerada pelo Slack, com a qual enviará mensagens ao Slack.

A próxima etapa agora é ativar os webhooks. Clique no  botão **_Activate Incoming Webhooks_ para fazer isso.**

Assim:

![Ativando o webhook do Slack para integração com Laravel](/uploads/ativando-webhook.png)

Quando você ativar o botão que está marcado como _off_ por padrão, a página será expandida e você terá acesso a essas opções:

![Criação do Webhook para integração com Laravel](/uploads/slack-criando-url-webhook.png)

Clique em **Add New Webhook to Workspace**.

Após isso, você será redirecionado para uma tela, onde poderá selecionar para qual canal ou qual usuário as mensagens serão enviadas.

No meu caso, vou escolher `#general`, apenas para testarmos, mas escolha conforme desejar.

![Escolhendo o canal que o Slack receberá as mensagens enviadas pelo Laravel](/uploads/slack-escolhendo-o-canal-que-bot-vai-enviar-mensagens.png)

> **Observação**: Caso queria criar um outro canal para receber as mensagens do bot, você pode fazê-lo no painel principal do seu workspace

Após fazer isso, você será direcionado à tela anterior e poderá ver a lista de webhooks criados. Você deve agora copiar a url do Webhook, pois ele será usado para configurar o Laravel.

A url pode ser obtida conforme a imagem abaixo:

![copiando o url do webhook do Slack para configurar no Laravel](/uploads/laravel-log-slack-copiando-o-webhook.png)

--- 
## Configurando o Slack no Laravel

Nessa etapa, vamos aprender a configurar o Slack para enviar mensagem pelo Laravel.

Vamos usar uma biblioteca para fazer isso, para tornar mais fácil o nosso trabalho.  No meu caso, vamos usar a Biblioteca _Slack for  PHP_, mantida por [maknz/slack](https://github.com/maknz/slack "maknz/slack").

> Existe uma biblioteca do mesmo desenvolvedor específica para o Laravel, mas eu tive problemas em instalá-la na versão mais recente, por isso estou indicando a utilização da mesma.

Na página da biblioteca, contém as instruções de instalação, mas resumidamente, você pode instalá-la via Composer, assim:

```bash
composer require maknz/slack
```

Nesse caso, como a biblioteca não é específica para Laravel, não temos nenhum _Service Provider_ costumizado da biblioteca. Teremos que configurá-lo manualmente. Mas não se preocupe, isso é bem fácil de fazer.


{% include ads_article.html %}

--- 

## Configurando a biblioteca makzn/slack

Como dito anteriomente, não temos um service provider específico para essa biblioteca. A ideia do Service Provider do Laravel é facilitar o acesso ao serviço e definir configurações em um local só, evitando repetições. E é exatamente o que vamos fazer.

Abra o arquivo `AppServiceProvider` do seu projeto e no método `boot` crie a seguinte configuração:

``` php
public function boot()
{
    $this->app->bind('slack', static function () {
        return new \Maknz\Slack\Client($webhook, $settings);
    });
}
```

No caso acima, o método `bind` vai criar um `factory` para a criação da instância do cliente da nossa aplicação Slack. Ela poderá ser acessada futuramente através da chamada de `app('slack')`.

### Criando uma configuração para a biblioteca makzn/slack

Agora o próximo passo é passar as configurações para o nosso `bind`, substituindo as variáveis `$webhook` e `$settings` com o valor que precisamos.

Eu tenho preferência, nesta etapa, de usar a função `config` do Laravel para configurar o Slack, pois assim poderemos, por exemplo, usar o `.env`, caso seja necessário alterar as configurações de acordo com o ambiente.

Para fazer isso, abra a pasta `config` do seu projeto e crie um arquivo chamado `slack.php` lá dentro. Coloque as seguintes informações nele:

```php
return [
	'webhook' => 'caminho_do_webhook_copiado_no_slack',
    'settings' => [
    	// configurações adicionais
  ]
];
```

No `AppServiceProvider`, você vai configurar os valores do `bind` da seguinte forma:

``` php
public function boot()
{
    $this->app->bind('slack', static function () {
         return new \Maknz\Slack\Client(config('slack.webhook'), config('slack.settings'));
    });
}
```

> **Observação**: Na página da biblioteca, há uma lista de configurações que você pode utilizar em `slack.settings`.

Feito isso, agora você já poderá ir para a próxima etapa: o envio do log.

## Configurando o `Handler` para enviar os erros para o Slack

O arquivo `App\Exceptions\Handler.php` do Laravel tem duas finalidades:

* Determinar o comportamento da sua aplicação quando a renderização do erro. Ou seja, você pode costumizar a página de erro, caso ocorra alguma.
* Determinar como a aplicação registrará os logs quando ocorrer um erro.

Este último caso é o que vamos alterar. O método que vamos mexer é no `report`.

Código:

```php
public function report(Exception $exception)
{

    parent::report($exception);
   
    app('slack')->attach([
       'text' => (string) $exception,
       'color' => 'danger',
    ])->send($exception->getMessage());
}
```

Ok. É simples, não é?

A configuração acima fará com que qualquer erro que ocorra na aplicação seja enviado para seu Slack.

Um teste que você poderá fazer por exemplo é errar um comando no `php artisan` de proprósito, para que a sua aplicação gere um log.

Veja:

```bash
php artisan comando-nao-existe
```

Ao fazer isso, será gerado um erro interno no Laravel. Se tudo deu certo, basta conferir no canal que você escolheu para receber as mensagens via Webhook. O log do Laravel estará lá para você conferir!

![](/uploads/laravel-webhook-slack-recebendo-mensagem.png)

**Observação**: Apesar da biblioteca acima ter a opção `channel`, parece que o Webhook só funciona para o canal selecionado incialmente. Se desejar operar em outro canal, talvez seja necessário modificar as configurações do seu Webhook para que opere em outro canal.