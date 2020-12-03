---
layout: post
title: Como configurar um Virtual Host no Linux para rodar sua aplicação Laravel através
  do Apache 2
date: 2020-12-03 15:14:00 -0200
categories:
- laravel
- apache
- linux
sitemap: true
image: "/uploads/Laravel.jpg"
excerpt: Aprenda como configurar um Virtual Host no Linux para rodar sua aplicação
  Laravel através do Apache 2.

---
O Apache e Linux são muito utilizados em diversas hospedagens de site. Por isso, creio que é importante saber configurá-lo na sua própria máquina, para estar familiazirado com o mesmo. Neste tutorial, vamos aprender como configurar um Virtual Host no Linux para rodar sua aplicação Laravel através do Apache 2.

> **Nota:** Esse tutorial assume que você já tenha o Apache2 e o PHP instalado no seu Linux.

## Localização do projeto Laravel

O local padrão onde os sites do Apache estão localizados no Linux é `/var/www/`.  Mova a pasta do seu projeto para dentro desta pasta. O caminho deverá ficar parecido com `/var/www/seu-projeto`.

## Criando o projeto do Laravel

No caso de você ainda não ter a aplicação Laravel na sua máquina, você criar uma um projeto do zero, através do comando  `composer create-project`.

Exemplo:

```bash
composer create-project laravel/laravel seu_projeto
```

## Configurando um host para a aplicação

É possível criar um host, diferente do `localhost`, para rodar a sua aplicação Laravel através dela. Eu sempre prefiro configurar um host para aplicação que vou usar, porque costumo trabalhar com vários projetos escritos em Laravel na mesma máquina.

Para configurar um host, você deve editar o arquivo `/etc/hosts`. Você pode utilizar o comando `sudo nano` para fazer isso.

Exemplo:

```bash
sudo nano /etc/hosts
```

Em seguida, adicione a seguinte linha:

    127.0.0.1 seu-projeto.local

Para testar se a configuração funcionou corretamente, você pode acessar `http://seu-projeto.local` no seu navegador, após salvar o arquivo acima.

## Criando um Virtual Host

Agora, você criar um Virtual Host no seu Apache, para apontar para o domínio local criado acima.
Execute o seguinte comando:

```bash
cd /etc/apache2/sites-avaliable
sudo nano seu-projeto.conf
```

Agora, você precisa adicionar o seguinte conteúdo a seu arquivo `seu-projeto.conf`:

```
<VirtualHost *:80>
    ServerName seu-projeto.local
    DocumentRoot /var/www/seu-projeto/public
</VirtualHost>
```

Após criar o arquivo acima, você precisa rodar o comando `a2ensite`. Esse comando é responsável por habilitar um virtual host.

Assim:

```bash
sudo a2ensite seu-projeto.conf
```

Esse comando retornará a seguinte saída:

    Enabling site seu-projeto.local.
    To activate the new configuration, you need to run:
      systemctl reload apache2

Mas, antes de rodar esse comando, é sempre importante rodar `sudo apache2ctl configtest`. Esse comando verificará se existe algum problema com a sintaxe ou configuração do seu arquivo. Se tudo estiver certo, você recebará a saída `Syntax OK`.

Depois desses passos, você pode recarregar o Apache para seu funcionar.

Veja:

```bash
sudo service apache2 reload
```

Ou:

```bash
sudo systemctl reload apache2
```

> O Apache deixa os virtual hosts ativos dentro da pasta `/etc/apache2/sites-enabled`. Quando você roda o comando `a2ensite`, é criado um link simbólico do seu arquivo presente em `/etc/apache2/sites-avaliable` dentro de `/etc/apache2/sites-enabled`.

Teste a sua aplicação abrindo o url:

> http://seu-projeto.local