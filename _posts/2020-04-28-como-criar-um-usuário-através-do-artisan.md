---
layout: post
title: Como criar um usuário através do artisan interativamente?
date: 2020-04-28T00:00:00.000-03:00
categories:
- laravel
- artisan
sitemap: true
image: "/uploads/laravel-terminal.png"
excerpt: Aprenda a criar um comando personalizado e interativo no Artisan para criar
  usuários de maneira rápida, simples e eficiente, através da linha de comando, no
  Laravel.
color: ''

---
## O que é Artisan?

O Artisan é a interface de linha de comando presente no Laravel. Ele fornece uma série de comandos úteis que podem ajudá-lo enquanto você constrói sua aplicação.

Nesse tutorial,  você vai aprender a criar um comando personalizado e interativo no Artisan para criar usuários de maneira bem simples no Laravel.

## Um pouco sobre comandos personalizados no artisan

Para criar um comando, primeiro é necessário navegar até a pasta `routes/console.php` e adicionar a chamada do método `Artisan:command`. Com este método, podemos definir comandos personalizados para a linha de comando do Artisan.

`Artisan::command` recebe dois argumentos. O primeiro trata-se do nome do comando e o segundo é o callback executado ao executarmos o comando através do `php artisan`. No nosso caso, vamos dar o nome de `make:user` para o nosso comando.

Faça um pequeno teste para ver como funciona a personalização de comandos.

Adicione o seguinte código ao seu `routes/console.php`:

```php
Artisan::command('make:user', function () {
     echo "Comando para criar usuário";
})->describe('Comando de teste');
```

Agora, execute `php artisan make:user` na linha de comando.

Se tudo funcionou corretamente, você receberá "Comando para criar usuário" ao rodar o comando acima.

> Dica: Se você executar, `php artisan make:user --help`,  ou simplesmente `php artisan`, você poderá algumas instruções do seu comando, além da descrição inserida através de `describe`.

## Preenchendo os valores interativamente pela linha de comando

Dentro da função anônima do nosso comando, podemos chamar alguns métodos através de `$this`. Existe alguns métodos que permitem exibir saídas formatadas, bem como receber informações de maneira interativa. Um destes métodos interativos é o `$this->ask()`.
Quando chamado, o método `ask` exibe uma saída e aguarda a entrada de dados na linha de comando.
Sendo assim, para a criação do usuário de maneira interativa, vamos usar esse recurso para solicitar o preenchimento dos dados específicos, como email, nome e senha.

Veja:

```php
Artisan::command('make:user', function () {
    $name = $this->ask('Qual é o nome do usuário?');
    echo "O nome do usuário é $name";
});
```

Ao executarmos `php artisan make:user`, agora teremos a seguinte saída:

```bash
$ php artisan make:user

Qual é o nome do usuário?
> 
```

Note que `ask` faz com que a linha de comando aguarde o preenchimendo dos dados. Se você escrever `"Wallace Maxters"` e teclar <kbd>ENTER</kbd>, você receberá a seguinte saída:

```text
O nome do usuário é Wallce Maxters
```

### Obtendo a senha interativamente

O próximo passo é utilizar o método interativo `secret`. Ele funciona da mesma maneira que o `ask`, porém `secret` ocultará os caracteres digitados ao esperar a entrada de dados. Nesse caso, ele é perfeito para o preenchimento de um campo sensível, como por exemplo a senha de um usuário.

Veja:

```php
Artisan::command('make:user', function () {
    $password = $this->secret('Digite uma senha');
    echo "A senha é $password";
});
```

## Criando o usuário interativamente através do Artisan

Agora que aprendemos alguns métodos para receber os dados interativamente, já podemos criar nosso comando para criação do usuário. Supondo que temos um model `User` com os campos `email`, `name` e `password`, podemos fazer nosso código do nosso comando da seguinte forma:

```php
Artisan::command('make:user', function () {

    $email    = $this->ask('Digite um e-mail');
    $name     = $this->ask('Digite o nome');
    $password = $this->secret('Digite a senha');
    
    App\User::create(['email' => $email, 'name' => $name, 'password' => bcrypt($password)]);
    
    $this->info('Usuário criado com sucesso!');
    
})->describe('Cria um usuário pela linha de comando');
```

Ao rodar o comando `php artisan make:user`, você receberá a seguinte saída:

```bash
$ php artisan make:user

Digite um e-mail:
> wallacemaxters@teste.com

Digite o nome:
> Wallace Maxters

Digite a senha:
> 

Usuário criado com sucesso!
```

> **Observação**: No Laravel, temos que chamar a função `bcrypt` para encriptar a senha para o formato utilizado internamente.

### Evitando a duplicação de usuários

Uma dica extra é que você pode modificar o código para evitar que um usuário seja duplicado caso um e-mail já exista.  Podemos fazer uma modificação para  que, caso o email informado já exista, o usuário existente seja atualizado. 

Você pode fazer isso simplesmente trocando `create` por `firstOrNew`.

Veja:

```php
Artisan::command('make:user', function () {

    $email    = $this->ask('Digite um e-mail');
    $name     = $this->ask('Digite o nome');
    $password = $this->secret('Digite a senha');
    
    $user = App\User::firstOrNew(['email' => $email]);
    
    $user->fill([
        'name' 		=> $name, 
        'password' 	=> bcrypt($password)
    ])->save();
    
    $this->info('Usuário criado/atualizado com sucesso');
    
})->describe('Cria um usuário pela linha de comando');
```

### Preenchendo campos extras

Você é livre para adicionar outros campos caso seja necessário! Por exemplo, há muitos casos onde se usa o campo `api_token` para autenticação via API.

Você poderia adicionar isso junto à criação do usuário

```php
Artisan::command('make:user', function () {

    $email    = $this->ask('Digite um e-mail');
    $name     = $this->ask('Digite o nome');
    $password = $this->secret('Digite a senha');
    
    $user = App\User::firstOrNew(['email' => $email]);
    
    $user->fill([
        'name'      => $name, 
        'password'  => bcrypt($password),
        'api_token' => str_random(80),
    ])->save();
    
    $this->info('Usuário criado/atualizado com sucesso');
    
})->describe('Cria um usuário pela linha de comando');
```