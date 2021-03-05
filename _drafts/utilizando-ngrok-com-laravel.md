---
layout: post
color: "#222222"
title: Utilizando ngrok com Laravel
date: 2021-03-04 00:00:00 -0300
categories:
- laravel
sitemap: false
image: ''
excerpt: ''

---
## Instalando o ngrok

## Configurando as urls do Laravel

O primeiro passo é iniciar o Laravel.

```bash
 php artisan serve
```

Em seguida, execute o comando `ngrok` apontando para a porta em que o `php artisan serve` está utilizando. Geralmente, ele usa `8000` por padrão. 

**Nota**: Você também pode [especificar a porta do artisan serve](/blog/2020/12/24/como-definir-a-porta-usada-no-php-artisan-serve), caso deseje.

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

Edite seu arquivo `.env` e modifique a variável `APP_URL`

```env
APP_URL=https://seu-hash.ngrok.io/
```

É necessário forçar a url raiz da sua aplicação, para afetar o funcionamento das funções `url` e `asset` .

```php
\URL::forceRootUrl(config('app.url'));
```