---
layout: post
title: Truques com o comando "php artisan serve"
date: 2019-08-17T20:20:00.000-03:00
categories:
- laravel
sitemap: true
image: "/uploads/laravel-terminal.png"

---
O comando `php artisan serve` por padrão vem configurado para rodar em `localhost` na porta `8000`. Porém há dois parâmetros opcionais que tem como objetivo permitir modificar esse comportamento padrão: O `--port` e o `--host`. Atráves desses parâmetros, podemos realizar alguns truques na hora de testar nossa aplicações construida no Laravel.


## Mudando a porta do servidor no Artisan Serve

Com o parâmetro `--port`, você pode definir que a porta `9000`, como no exemplo abaixo:

```bash
php artisan serve --port=9000
```

Esse primeiro truque pode ser útil, já que você pode querer rodar a mesma aplicação duas vezes em portas diferentes, ou mesmo rodar ela em outra porta por já ter uma utilizando a porta padrão 8000.


## Expondo a aplicação através do IP da rede com o Artisan Serve

O parâmetro `--host` você pode definir o `host` que será vinculado ao servidor. Por exemplo, ao invés de vincular ao `localhost` você poderia vincular o servidor ao `ip` da sua conexão na rede.

**Nota:** Você pode usar o comando `ifconfig` ou `hostname -I` no Linux para localizar seu IP.  

```bash
php artisan serve --host=192.168.0.102
```

O artisan estará rodando em `http://192.168.0.102:8000`.


**Mas por quê?**

Esse último exemplo é muito útil caso você queria testar a sua aplicação a partir de outro dispositivo conectado na mesma rede, como um celular, table ou notebook. Ao acessar o endereço IP e a porta, você terá acesso à aplicação.


<div>
    <ins class="adsbygoogle" style="display:block" data-ad-client="ca-pub-4119206527475379" data-ad-slot="7774041254"
        data-ad-format="auto" data-full-width-responsive="true"></ins>
    <script>
        (adsbygoogle = window.adsbygoogle || []).push({});
    </script>
</div>


## Vinculando o Artisan Serve a um domínio local

Ainda é possível vincular o `--host` a um host local, como fazemos num Virtual Host do apache.

Tomando por exemplo do Linux, você poderia fazer o seguinte:

- Edite o arquivo `/etc/hosts` com o comando `nano` ou `vi`

- Adicione a linha `127.0.0.1   meusite.local` e salve.

- Rode o comando `php artisan serve --host=meusite.local`.


Ao fazer isso, a aplicação está rodando em `http://meusite.local:8000`.


## Deixando o Artisan Serve disponível em todos os Hosts e IPs

Você pode rodar sua aplicação no `artisan serve` e vincular a todos os hosts configurados no seu `/etc/hosts` bem como nos IPs. Basta utlizar a opção `0.0.0.0` na opção `--host`.

Exemplo:

```bash
php artisan serve --host=0.0.0.0
```

Sua aplicação estará disponível em `localhost`, no seu ip e nos demais hosts.

## Utilizando o Artisan Serve na porta 80

Por padrão, para não definir a porta ao acessar o domínio no Navegador, você precisa que ele esteja rodando na porta 80. Para isso bastaria rodar o Artisan Serve com o parâmetro `--port=80`. Porém, pode acontecer de essa porta já estar ocupada, caso você tenha o Nginx ou Apache instalado na sua máquina, pois esses processos ocupam a porta 80.

Se você se encaixa no caso acima, você precisaria parar a execução desses serviços temporariamente. Basta rodar os seguintes comandos, de acordo com a necessidade:

Nginx:

```bash
sudo service nginx stop
```

Apache2:

```bash
sudo service apache2 stop
```

**Observação:** Se ainda assim a porta se mantiver ocupada, você pode tentar rodar o seguinte comando para matar qualquer processo que esteja utilizando a porta `80`:

```bash
sudo fuser -k 80/tcp
```

Após isso, você ainda poderá receber um "permission denied" ao tentar rodar o artisan serve na porta 80. Se isso acontecer, rode o comando como `sudo`.

Veja:

```php
sudo php artisan serve --port=80 --host=meusite.local
```