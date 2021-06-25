---
layout: post
title: Truques com o comando "php artisan serve"
date: 2019-08-17T20:20:00.000-03:00
last_modified_at: 2021-06-25T20:11:52.000-03:00
categories:
- artisan
- laravel
- PHP
sitemap: true
image: "/uploads/laravel-terminal.png"

---

Neste tutorial, vamos aprender alguns truques com o comando `php artisan serve` que poderão ser muito úteis no dia a dia do desenvolvedor utilizador de Laravel. 

## O que é PHP Artisan Serve?

O comando `php artisan serve` tem como finalidade iniciar um servidor de desenvolvimento para a aplicação Laravel. Isso se torna bastante útil no processo do desenvolvimento, porque o desenvolvedor não precisa se preocupar em configurar um Apache ou Ngnix para servir a aplicação durante o processo de desenvolvimento local.

### Como funciona o comando Artisan Serve?

O comando `php artisan serve` por padrão vem configurado para ser executado no host `localhost` e na porta `8000`. Isso permite que você acesso sua aplicação Laravel através da url `http://localhost:8000`. Porém existem dois argumentos opcionais disponíveis neste comando, que permite modificar este comportamento padrão. Os parâmetros são `--port` e `--host`. Atráves deles, podemos realizar alguns truques na hora de iniciar o servidor local do Laravel.

Vejamos alguns...

## Mudando a porta do servidor no Artisan Serve

Com o parâmetro `--port`, você pode definir que a porta `9000`, como no exemplo abaixo:

```bash
php artisan serve --port=9000
```

Esse primeiro truque pode ser útil, já que você pode querer executar a mesma aplicação duas vezes em portas diferentes, ou mesmo executar ela em outra porta por já ter uma utilizando a porta padrão 8000.


## Expondo a aplicação através do IP da rede com o Artisan Serve

O parâmetro `--host` você pode definir o `host` que será vinculado ao servidor. Por exemplo, ao invés de vincular ao `localhost` você poderia vincular o servidor ao `ip` da sua conexão na rede.

**Nota:** Você pode usar o comando `ifconfig` ou `hostname -I` no Linux para localizar seu IP.  

```bash
php artisan serve --host=192.168.0.102
```

O artisan estará rodando em `http://192.168.0.102:8000`.


Esse último exemplo é muito útil caso você queria testar a sua aplicação a partir de outro dispositivo conectado na mesma rede, como um celular, table ou notebook. Ao acessar o endereço IP e a porta, você terá acesso à aplicação.

<!-- ads common -->
{% include ads_article.html %}

## Vinculando o Artisan Serve a um domínio local

Ainda é possível vincular o `--host` a um host local, como fazemos num Virtual Host do Apache.

Tomando por exemplo do Linux, você poderia fazer o seguinte:

- Edite o arquivo `/etc/hosts` com o comando `nano` ou `vi`

- Adicione a linha `127.0.0.1   meusite.local` e salve.

- Execute o comando `php artisan serve --host=meusite.local`.


Ao fazer isso, a aplicação será executada em `http://meusite.local:8000`.


## Deixando o Artisan Serve disponível em todos os Hosts e IPs

Você pode executar sua aplicação no `php artisan serve` e vincular a todos os hosts configurados no seu `/etc/hosts` bem como nos IPs. Basta utlizar a opção `0.0.0.0` na opção `--host`.

Exemplo:

```bash
php artisan serve --host=0.0.0.0
```

Sua aplicação estará disponível em `localhost`, no seu ip e nos demais hosts.

--- 
## Utilizando o Artisan Serve na porta 80

Por padrão, para não definir a porta ao acessar o domínio no Navegador, você precisa que ele seja executado na porta 80. Para isso, bastaria executar o `php artisan serve` com o parâmetro `--port=80`. Porém, pode acontecer de essa porta já estar ocupada, caso você tenha o Nginx ou Apache instalado na sua máquina, pois esses processos ocupam a porta 80.

Se você se encaixa no caso acima, você precisaria parar a execução desses serviços temporariamente. Basta executar os seguintes comandos, de acordo com a necessidade:

Nginx:

```bash
sudo service nginx stop
```

Apache2:

```bash
sudo service apache2 stop
```

**Observação:** Se ainda assim a porta se mantiver ocupada, você pode tentar executar o seguinte comando para matar qualquer processo que esteja utilizando a porta `80`:

```bash
sudo fuser -k 80/tcp
```

Após isso, você ainda poderá receber um "permission denied" ao tentar executar o artisan serve na porta 80. Se isso acontecer, execute o comando como `sudo`.

Veja:

```php
sudo php artisan serve --port=80 --host=meusite.local
```


## Conclusão

O `php artisan` é um comando muito útil para o desenvolvimento com Laravel e saber dominá-lo pode se tornar um grande diferencial para o desenvolvedor.