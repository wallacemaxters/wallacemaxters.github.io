---
layout: post
title: Laravel - Rotas que só funcionam em ambiente local
date: 2019-03-22 19:15:00 -0300
categories:
- laravel
- laravel-5
sitemap: true
image: "/uploads/Laravel.jpg"

---
No Laravel 4, era possível definir rotas que só funcionavam em ambiente local. Essas rotas poderiam ser colocadas no arquivo `local.php`.

Eu costumava usar muitos essas rotas para poder logar com um usuário de um nível qualquer, ou exibir uma informação de depuração da aplicação. Mas notei que, no Laravel 5, não existe um arquivo com uma configuração separada apenas para rotas locais. 

Mesmo assim, é possível configurar um arquivo de rota personalizado para o ambiente local. 

## Implementação

Para implementar as rotas condicionadas ao ambiente no Laravel 5, podemos fazer pequenos ajustes no arquivo `app/Providers/RouteServiceProvider.php`.

Primeiramente, você deve criar o arquivo desejado dentro da pasta `routes`. Por exemplo, vamos criar o arquivo `routes/web.local.php`.  Nesse arquivo, colocaremos as rotas que só vão funcionar quando a aplicação estiver configurado para ambiente `local`.

> Para verificar o ambiente configurado, basta usar o comando `php artisan env`.


Em seguida, crie um método dentro da classe `RouteServiceProvider` para incluir a rota que criamos no passo anterior.

Exemplo:

```php
protected function mapLocalWebRoutes()
{

	if (! app()->isLocal()) return;
    
	Route::middleware('web')
          ->namespace($this->namespace)
          ->group(base_path('routes/web.local.php'));
}
```

No meu caso, estou usando a versão 5.4 do Laravel para configurar isso. Nessa versão, o `RouteServiceProvider` tem um método chamado `map`, que tem a seguinte estrutura:

```php
    public function map()
    {
        $this->mapApiRoutes();

        $this->mapWebRoutes();

    }
```

Você pode incluir a chamada de `mapLocalWebRoutes` dentro do método `map`.

Assim:

```php
    public function map()
    {
        $this->mapApiRoutes();

        $this->mapWebRoutes();
        
        $this->mapLocalWebRoutes();
    }
```

Após fazer isso, está pronta a sua configuração. 
Você já pode incluir as rotas que desejar, para realizar testes e verificação de dados que não podem estar disponíveis em produção.

O truque acima foi usar a chamada de `app()->isLocal()`. Esse método retorna `true` quando o valor de `php artisan env` é equivalente a `local`.

> Caso sua aplicação em desenvolvimento não esteja retornando esse valor, verifique se seu arquivo `.env` possuio a linha abaixo:

> `APP_ENV=local`