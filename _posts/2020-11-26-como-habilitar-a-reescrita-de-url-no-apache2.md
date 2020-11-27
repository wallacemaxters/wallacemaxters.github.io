---
layout: post
title: Como habilitar a reescrita de url no Apache2 no Linux
date: 2020-11-26 01:00:00 -0200
categories:
- apache
- linux
sitemap: true
image: "/uploads/mod_rewrite_apache2.png"
excerpt: Aprenda como habilitar facilmente o mod_rewrite para reescrita de urls do
  Apache2 no Linux.

---
Quando recém instalamos o Apache2, é necessário fazer algumas configurações para que as funcionalidades padrões e mais usadas estejam disponíveis. E, dentre estas funcionalidades, podemos destacar a funcionalidade de reescrita de urls.

## Habilitando a reescrita de urls no Apache2

Primeiro, ative o `mod_rewrite` para que o apache tenha a capacidade de operar com reescrita de url.
Rode o comando abaixo:

```bash
sudo a2enmod rewrite
```

Em seguida, edite o arquivo `/etc/apache2/apache2.conf` e procure pelo seguinte trecho:

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

> **Nota**: Você pode alterar facilmente esse arquivo através do comando `sudo nano /etc/apache2/apache2.conf`. Ao apertar CTRL+W, você poderá realizar uma pesquisa por algum termo neste arquivo.

Após fazer isso, você precisa reiniciar o Apache. Rode o seguinte comando:

```bash
sudo service apache2 restart
```