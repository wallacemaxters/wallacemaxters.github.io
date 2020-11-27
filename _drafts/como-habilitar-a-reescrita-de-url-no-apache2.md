---
layout: post
title: Como habilitar a reescrita de url no Apache2
date: 2020-11-26 01:00:00 -0200
categories:
- apache
- linux
sitemap: false
image: ''
excerpt: ''

---
Quando recém instalamos o Apache2, é necessário fazer algumas configurações para que as funcionalidades padrões e mais usadas estejam disponíveis.


Primeiro, ative o `mod_rewrite` para que o apache tenha a capacidade de operar com reescrita de url. 
Rode o comando abaixo:

```bash
sudo a2enmod rewrite
```

Em seguida, utilize o seu editor de preferência para alterar o arquivo `/etc/apache2/apache2.conf` e procure pelo seguinte trecho:

```htaccess
<Directory /var/www/>
        Options Indexes FollowSymLinks
        AllowOverride None
        Require all granted
</Directory>
```

Substitua `None` por `All`, assim:

```htaccess
<Directory /var/www/>
        Options Indexes FollowSymLinks
        AllowOverride All
        Require all granted
</Directory>
```