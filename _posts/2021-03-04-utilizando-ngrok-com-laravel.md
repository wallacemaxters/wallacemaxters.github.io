---
layout: post
color: "#222222"
title: Utilizando ngrok com Laravel
date: 2021-03-07 04:45:00 -0300
categories:
- laravel
sitemap: true
image: "/uploads/laravel_ngrok.png"
excerpt: Aprenda a configurar o NGROK para expôr uma aplicação Laravel na web

---
Nesse tutorial, estarei ensinando como utilizar o [ngrok](https://ngrok.com/download) para expôr sua aplicação Laravel local para Web.

## Iniciando o ngrok

Antes de iniciar o `php artisan serve`, você deve executar o comando `ngrok` apontando para a porta em que será usada pelo Laravel. Geralmente, ele usa `8000` por padrão.

```bash
ngrok http 8000
```

O `ngrok` irá exibir o seu subdomínio onde a aplicação será exibida.

Exemplo:

```text
Account                       Sua Conta (Plan: Free)                                
Version                       2.3.35                                                      
Region                        United States (us)                                          
Web Interface                 http://127.0.0.1:4040                                       
Forwarding                    http://seu-hash.ngrok.io -> http://localhost:8000
Forwarding                    https://seu-hash.ngrok.io -> http://localhost:8000 
```

## Configurando a URL base da aplicação

É necessário forçar a url raiz da sua aplicação, para afetar o funcionamento das funções `url` e `asset`, pois por padrão o apontamento não será feito para a url do ngrok;

Edite seu arquivo `.env` e modifique a variável `APP_URL`

```env
APP_URL=https://seu-hash.ngrok.io/
```

E no seu arquivo `AppServiceProvider` e adicione a seguinte linha dentro do método `boot`

```php
public function boot()
{
     \URL::forceRootUrl(config('app.url'));
}
```

## Iniciando o servidor do Laravel

Agora que, você já pode iniciar o servidor do Laravel.

Execute:

```bash
 php artisan serve
```

O ngork agora fará um tunel para sua aplicação rodada em `localhost:8000`. 

**Observação**: Esse passo de inicialização do servidor foi adicionando por último no tutorial, porque, se você editar o arquivo `.env` depois de ter iniciado o `php artisan serve`, você precisará parar e iniciar de novo, para que as configurações sejam carregadas.

### Outras dicas

Se por algum motivo você precisar iniciar o `ngrok` e o `artisan serve` em outra porta, é possível [especificar a porta do artisan serve](/blog/2020/12/24/como-definir-a-porta-usada-no-php-artisan-serve).
