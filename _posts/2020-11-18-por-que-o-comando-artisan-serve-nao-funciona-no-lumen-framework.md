---
layout: post
title: Por que o comando 'php artisan serve' não funciona no Lumen Framework?
date: 2020-11-18T15:00:00.000-02:00
categories:
- artisan
- lumen
- PHP
sitemap: true
image: "/uploads/lumen-2.png"
excerpt: Nesse tutorial vamos entender por que o comando "php artisan serve" não funciona
  no Lumen e qual é a solução para esse problema.
color: ''

---
O comando [artisan serve](blog/2019/08/17/truques-com-o-comando-php-artisan-serve) provavelmente é um dos mais utilizados no desenvolvimento com Laravel, e é muito comum que os desenvolvedores que utilizam o Lumen também tente rodá-lo para iniciar o servidor de testes.

O ponto é que o Lumen é um microframework baseado no Laravel, contendo menos recursos disponíveis.

É muito comum receber o seguinte erro ao tentar rodar o comando `php artisan serve` no Lumen:

```bash
Command "serve" not found
```

Isso ocorre porque o comando `php artisan serve` [foi removido no Lumen 5.2](https://stackoverflow.com/questions/34692894/why-has-the-artisan-serve-command-been-removed-from-lumen-5-2).

## Como rodar iniciar a aplicação Lumen sem o comando `artisan serve`?

Existe uma simples solução para rodar sua aplicação Lumen, sem precisar de instalações ou configurações adicionais. Você pode simplesmente utilizar o [Built-In server do PHP](https://www.php.net/manual/pt_BR/features.commandline.webserver.php).

Você simplesmente precisa entrar na pasta onde sua aplicação Lumen se encontra e rodar o seguinte comando:

```bash
cd projeto-lumen
php -S localhost:8000 -t public/
```

O exemplo acima dispensa explicações. O PHP fará sua aplicação ficar disponível no host `localhost:8000`.  O parâmetro `-t public/` indica a partir de qual pasta o PHP vai considerar como raiz.

Caso não queria especificar a pasta, você poderá fazer assim:

```bash
cd projeto-lumen/public
php -S localhost:8000
```

Pronto! Agora você já pode executar o Lumen novamente em ambiente de testes.