---
layout: post
title: Executando Python 3 no Apache através do WSGI
categories:
- apache
- python
image: "/uploads/covers/python.png"
excerpt: Veja como instalar o WSGI no Apache2 para Python 3
date: 2021-05-26 18:59:00 +0000
sitemap: true

---
Você pensou em utilizar o Python através do Apache? Bem, é perfeitamente possível fazer isso! Basta instalarmos um módulo chamado `mod_wsgi` e tudo pronto!

Nesse tutorial, vamos aprender como instalar e configurar o `mod_wsgi` para executar o _Python 3_ no _Apache 2_ a partir do _WSGI_. 

Mas o que seria WSGI e MOD_WSGI?

## O que é WSGI?

Resumidamente, o WSGI é uma sigla para _Web Server Gateway Interface_. Trata-se de uma especificação para uma interface simples e universal entre servidores web e aplicações web ou frameworks para a linguagem de programação Python.

Fonte: [Wikipédia](https://pt.wikipedia.org/wiki/Web_Server_Gateway_Interface).

## E o que é MOD_WSGI?

O `mod_wsgi` é um módulo que fornece uma interface compatível com WSGI para hospedar aplicativos da Web baseados em Python no Apache.

Fonte: [Wikipédia](https://en.wikipedia.org/wiki/Mod_wsgi)

{% include ads_article.html %}

***

## Instalando o WSGI no Apache 2

Como dito, para executar um script Python no Apache, é necessário instalar e configurar o módulo `mod_wsgi`.

Instale o módulo WSGI no Apache, através do seguinte comando:

```sh
sudo apt install libapache2-mod-wsgi-py3
```

Após a instalação, habilite o módulo WSGI no Apache:

```bash
sudo a2enmod wsgi
```

E reinicie o Apache:

```bash
sudo service apache2 restart
```

Feito isso, podemos seguir com as configurações...

## Configurando o WSGI no Apache

Agora, vamos criar um Virtual Host para executarmos um script Python através do Apache.

Vá até a pasta `/etc/apache2/sites-avaliable` e crie um arquivo `wsgi.conf`.
Você pode fazer assim:

```bash
sudo nano /etc/apache2/sites-avaliable/wsgi.conf
```

Em seguida, cole o seguinte conteúdo:

```apache
<VirtualHost *:80>
    ServerName localhost
    WSGIScriptAlias /python /var/www/python/
    DirectoryIndex index.py
</VirtualHost>
```

Habilite o virtual host criado através do seguinte comando:

```bash
sudo a2ensite wsgi.conf
```

Agora, precisamos recarregar o Apache com as novas configurações;

```bash
sudo service apache2 reload
```

## Executando um script Python com WSGI

Agora, crie a pasta `/var/www/python`. Em seguida, crie um arquivo chamado `index.py`, pois definimos que o `DirectoryIndex` do Apache será esse arquivo.

Exemplo:

```bash
mkdir /var/www/python
touch /var/www/python/index.py
```

Agora, adicione o seguinte conteúdo ao seu arquivo `index.py`

```python
def application(environ, restart_response):
    status = '200 OK'
    html = "Olá, WSGI"
    headers = [('Content-type', 'text/html; charset=utf-8')]
    restart_response(status, headers)
    return [bytes(html, 'utf-8')]
```

Pronto! Agora, basta acessar o caminho `http://localhost/python` para ver o seu script `.py` rodar com o WSGI.