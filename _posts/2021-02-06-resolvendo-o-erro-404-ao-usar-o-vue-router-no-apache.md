---
layout: post
title: Resolvendo o erro 404 ao usar o Vue Router no Apache
date: 2021-02-06T15:47:00.000-02:00
categories:
- vue
- apache
sitemap: true
image: "/uploads/covers/vue.jpeg"
excerpt: Ao tentar criar um virtual host para uma aplicação Vue rodar no Apache, é
  comum ter problemas com as rotas Vue Router, pois ao atualizar a página ou acessar
  diretamente uma url, costuma retornar 404. Aprenda a configurar o seu .htaccess
  para resolver esse problema através desse tutorial.

---
Após fazer o build de uma aplicação escrita no VueJS e configurá-la para rodar no Apache, é comum ocorrer um erro 404 ao tentar acessar as rotas da mesma.

Isso ocorre geralmente porque o Vue Route utiliza o [History Mode](https://router.vuejs.org/guide/essentials/history-mode.html). Ao tentar acessar as urls pelos link da aplicação, a navegação ocorre normalmente. Porém, ao acessar diretamente pela barra de navegação ou ao tentar atualizar a página, ocorre o erro 404.

![Erro 404 ao tentar acessar a rota do vue com Apache2](/uploads/error_404.png "Erro 404 ao tentar acessar a rota do vue com Apache2")

## Resolvendo o erro 404 no Apache 2

Você precisa configurar a reescrita de URL no Apache 2 apontando qualquer path da url para o arquivo `index.html`.

Você deve criar um arquivo `.htaccess` na raiz do projeto, com o seguinte conteúdo.

```apache
<IfModule mod_rewrite.c>
  RewriteEngine On
  RewriteBase /
  RewriteRule ^index\.html$ - [L]
  RewriteCond %{REQUEST_FILENAME} !-f
  RewriteCond %{REQUEST_FILENAME} !-d
  RewriteRule . /index.html [L]
</IfModule>
```

### Ative o mod_rewrite

É importante ativar o `mod_rewrite` para o que o `.htaccess` funcione. Se você estiver usando o Linux, você deve rodar o comando:

```bash
sudo a2enmod write
sudo service apache2 restart
```