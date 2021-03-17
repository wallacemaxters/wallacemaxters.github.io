---
layout: post
title: Como criar um usuário através do artisan?
date: 2020-04-28T00:00:00.000-03:00
categories:
- laravel
- artisan
sitemap: true
image: "/uploads/laravel-terminal.png"
excerpt: Nesse tutorial, estarei ensinando como criar um comando customizado no Laravel
  para criação de um usuário, através do php artisan.
color: ''

---
## O que é Artisan?

O Artisan é a interface de linha de comando presente no Laravel. Ele fornece uma série de comandos úteis que podem ajudá-lo enquanto você constrói sua aplicação. 

Nesse tutorial, estarei ensinando como criar um comando customizado para criação de um usuário, através do Artisan.

## Criando um usuário com artisan

Para criar esse comando de uma maneira bem simples, primeiro é necessário navegar até a pasta `routes/console.php` e adicionar a chamada do método `Artisan:command`. Com ele, podemos definir comandos personalizados para o Artisan. 

`Artisan::command` recebe dois argumentos. O primeiro trata-se do nome do comando e o segundo, é o callback.

Vamos nomear o nosso comando para `make:user`. 

Para isso podemos fazer da seguinte forma:

```php
Artisan::command('make:user', function () {
     echo "Comando para criar usuário";
});
```

Para testar se tudo está correto, rode `php artisan make:user`.

Se tudo funcionou corretamente, você receberá "Comando para criar usuário" ao rodar o comando acima.

Para continuarmos, vamos aprender o método `$this->ask()`. Dentro da função anônima do nosso comando, chamar alguns métodos presente em `$this`. O método `ask` quando chamado exibe uma saída e aguarda a entrada de dados. Nesse caso, vamos usar essa ideia para pedir ao usuário que preencha os dados específicos, como email, nome e senha.

Veja:

```php
Artisan::command('make:user', function () {
    
    $name = $this->ask('Qual é o nome do usuário?');
    
    echo "O nome do usuário é $name";
});
```

O próximo passo é utilizar o método `secret`. Ele funciona da mesma maneira que o `ask`, porém `secret` ocultará os caracteres digitados ao esperar a entrada de dados. Nesse caso, utilizaremos o mesmo para configurar nossa senha.

**Nota**: Temos que chamar a função `bcrypt` para encriptar a senha para o formato do Laravel.

Veja:

```php
Artisan::command('make:user', function () {
    
    $email = $this->ask('Digite um e-mail');

    $name = $this->ask('Digite o nome');

    $password = bcrypt($this->secret('Digite a senha'));
    
    App\User::create(['email' => $email, 'name' => $name, 'password' => $password]);
    
    $this->info('Usuário criado com sucesso!');

})->describe('Cria um usuário pela linha de comando');
```

Após rodar esse comando, o seu usuário será criado com sucesso.

Uma dica extra é que você pode modificar o código para que um usuário não seja duplicado caso um e-mail já exista. Você pode trocar `create` por `firstOrNew`.

```php
Artisan::command('make:user', function () {
    
    $email = $this->ask('Digite um e-mail');

    $name = $this->ask('Digite o nome');

    $password = bcrypt($this->secret('Digite a senha'));
    
    $user = \App\User::firstOrNew(compact('email'));

    $user->fill(compact('name', 'password'))->save();
    
    $this->info('Usuário criado com sucesso!');

})->describe('Cria um usuário pela linha de comando');
```

Dessa forma, o usuário não será duplicado, mas apenas atualizado caso novos dados sejam inseridos.

Além disso, você pode costumizar esse comando para adicionar `api_token` ou outros campos extras em seu usuário, caso seja necessário.