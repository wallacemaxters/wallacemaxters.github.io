---
layout: post
title: Como criar um usuário através do Artisan
date: 2020-04-28 00:00:00 -0300
categories:
- laravel
- artisan
sitemap: true
image: ''

---
```php
Artisan::command('make:user', function () {
    
    $email = $this->ask('Digite um e-mail');

    $name = $this->ask('Digite o nome');

    $password = bcrypt($this->secret('Digite a senha'));

    $api_token = str_random(80);

    $user = \App\Models\User::firstOrNew(compact('email'));

    $user->fill(compact('name', 'password', 'api_token'))->save();

    $this->info('Usuário criado com sucesso!');

})->describe('Cria um usuário pela linha de comando');
```