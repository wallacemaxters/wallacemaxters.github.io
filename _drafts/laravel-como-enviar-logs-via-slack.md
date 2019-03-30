---
layout: post
title: Laravel - Como enviar logs via Slack
date: 2019-03-30 00:00:00 -0300
categories:
- laravel
- slack
sitemap: false
image: ''

---
### Criando uma aplicação no Slack

Primeiro, você deve acessar a sua conta no Slack e acessar página de [api](https://api.slack.com/apps). Nessa primeira etapa, é necessário criar uma aplicação para prosseguir.

Clique no botão **Create an App** para começar, conforme a imagem abaixo:

> ![](/uploads/Captura de tela de 2019-03-30 10-37-51.png)

Preencha as informações da sua aplicação e confirme a criação da sua aplicação:

![](/uploads/criar-uma-aplicacao-slack.png)

Após a confirmação, você será redirecionado para a tela da sua aplicação, com as seguintes informações abaixo:

![](/uploads/slack-criar-webhook.png)

Você deve clicar na opção _incoming webhooks_.

Isso abrirá a tela de configurações de configuração do webhook da sua aplicação. É através dessa URL que você conseguirá enviar mensagens ao Slack através de um bot.

Agora, você deve clicar no  botão **_Activate Incoming Webhooks_.**

Veja:

![](/uploads/ativando-webhook.png)

Quando você ativar o botão que está marcado como _off_ por padrão, a página será expandida e você terá acesso a essas opções:

![](/uploads/slack-criando-url-webhook.png)

Clique em **Add New Webhook to Workspace**.

Após isso, você será redirecionado para uma tela, onde poderá selecionar para qual canal ou qual usuário as mensagens serão enviadas.

No meu caso, vou escolher `#general`, apenas para testarmos.

![](/uploads/slack-escolhendo-o-canal-que-bot-vai-enviar-mensagens.png)

> **Observação**: Caso queria criar um outro canal para receber as mensagens do bot, você pode fazê-lo no painel principal do seu workspace

Após fazer isso, você será direcionado à tela anterior e poderá ver a lista de webhooks criados. Você deve agora copiar a url do Webhook, pois ele será usado para configurar o Laravel.

A url pode ser obtida conforme a imagem abaixo:

![copiando o url do webhook do Slack para configurar no Laravel](/uploads/laravel-log-slack-copiando-o-webhook.png)

### Configurando o Slack no Laravel

Nessa etapa, vamos aprender a configurar o Slack para enviar mensagem pelo Laravel.

Vamos usar uma biblioteca para fazer isso, para tornar mais fácil o nosso trabalho.  No meu caso, vamos usar a Biblioteca _Slack for  PHP_, mantida por [maknz/slack](https://github.com/maknz/slack "maknz/slack").

> Existe uma biblioteca do mesmo desenvolvedor específica para o Laravel, mas eu tive problemas em instalá-la na versão mais recente, por isso estou indicando a utilização da mesma.

Na página da biblioteca, contém as instruções de instalação, mas resumidamente, você pode instalá-la via Composer, assim:

    composer require maknz/slack

Nesse caso, como a biblioteca não é específica para Laravel, não temos nenhum _Service Provider_ costumizado da biblioteca. Teremos que configurá-lo manualmente. Mas não se preocupe, isso é bem fácil de fazer.

 

### configurando o makzn/slack

Como dito anteriomente, não temos um service provider específico para essa biblioteca. A ideia do service provider do Laravel é facilitar o acesso ao serviço e definir configurações em um local só, evitando repetições. E é exatamente o que vamos fazer.

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

### criando uma configuração para o Slack no Laravel

Agora o próximo passo é passar as configurações para o nosso `bind`, substituindo as variáveis `$webhook` e `$settings` com o valor que precisamos.

Eu tenho preferência, nesta etapa, de usar a função `config` do Laravel para configurar o Slack, pois assim poderemos, por exemplo, usar o `.env`, caso seja necessário alterar as configurações de acordo com o ambiente.

Para fazer isso, abra a pasta `config` do seu projeto e crie um arquivo chamado `slack.php` lá dentro. Coloque as seguintes informações nele:

```php
return [
	'webhook' => 'caminho_do_webhook_copiado_no_slack',
    'settings' => [
    	'username' => '@meu_bot_laravel',
		'channel' => '#general',
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