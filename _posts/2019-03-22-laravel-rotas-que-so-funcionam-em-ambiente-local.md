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

Eu costumava usar muitos essas rotas para poder logar com um usuário de um nível qualquer, ou exibir uma informação de depuração da aplicação.

No Laravel 5, porém, não existe um arquivo com uma configuração separada apenas para rotas locais.

No Laravel 4, era possível definir rotas que só funcionavam em ambiente local. Essas rotas poderiam ser colocadas no arquivo \`local.php\`.

Eu costumava usar muitos essas rotas para poder logar com um usuário de um nível qualquer, ou exibir uma informação de depuração da aplicação.

No Laravel 5, porém, não existe um arquivo com uma configuração separada apenas para rotas locais.

Mas é possível configurar um arquivo de rota personalizado para o ambiente local.

Essa configuração pode ser feita através do arquivo \`app/Providers/RouteServiceProvider.php\`.

Primeiro, crie o arquivo desejado dentro da pasta \`routes\`. Por exemplo, vamos criar o arquivo \`routes/web.local.php\`.

Em seguida, declare um método dentro da classe \`RouteServiceProvider\` especificamente para incluir a rota local.

Exemplo:

\`\`\`php

protected function mapLocalWebRoutes()

{

	if (! app()->isLocal()) return;

    

	Route::middleware('web')

          ->namespace($this->namespace)

          ->group(base_path('routes/web.local.php'));

}

\`\`\`

No meu caso, estou usando a versão 5.4 do Laravel para configurar isso. Nessa versão, o \`RouteServiceProvider\` tem um método chamado \`map\`, que tem a seguinte estrutura:

\`\`\`php

    public function map()

    {

        $this->mapApiRoutes();

        $this->mapWebRoutes();

    }

\`\`\`

Após todas as declarações, você pode incluir a chamada de \`mapLocalWebRoutes\` que incluimos anteriormente:

\`\`\`php

    public function map()

    {

        $this->mapApiRoutes();

        $this->mapWebRoutes();

        

        $this->mapLocalWebRoutes();

    }

\`\`\`

Após fazer isso, está pronta a sua configuração. Você já pode incluir as rotas que desejar, para realizar testes e verificação de dados que não podem estar disponíveis em produção.

O truque acima foi usar a chamada de \`app()->isLocal()\`. Esse método retorna \`true\` quando o valor de \`config('app.env')\` retorna \`"local"\`.

No seu arquivo \`.env\` (que deve ser incluido apenas em ambiente local ou de testes), você pode notar que existe a seguinte configuração:

\`\`\`properties

APP_ENV=local

\`\`\`

Logo, estas rotas estarão disponíveis apenas em ambiente de desenvolvimento. Mas é possível configurar um arquivo de rota personalizado para o ambiente local.

Essa configuração pode ser feita através do arquivo `app/Providers/RouteServiceProvider.php`.

Primeiro, crie o arquivo desejado dentro da pasta `routes`. Por exemplo, vamos criar o arquivo `routes/web.local.php`.

Em seguida, declare um método dentro da classe `RouteServiceProvider` especificamente para incluir a rota local.

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

Após todas as declarações, você pode incluir a chamada de `mapLocalWebRoutes` que incluimos anteriormente:

```php
    public function map()
    {
        $this->mapApiRoutes();

        $this->mapWebRoutes();
        
        $this->mapLocalWebRoutes();
    }
```

Após fazer isso, está pronta a sua configuração. Você já pode incluir as rotas que desejar, para realizar testes e verificação de dados que não podem estar disponíveis em produção.

O truque acima foi usar a chamada de `app()->isLocal()`. Esse método retorna `true` quando o valor de `config('app.env')` retorna `"local"`.

No seu arquivo `.env` (que deve ser incluido apenas em ambiente local ou de testes), você pode notar que existe a seguinte configuração:

```properties
APP_ENV=local
```

Logo, estas rotas estarão disponíveis apenas em ambiente de desenvolvimento.