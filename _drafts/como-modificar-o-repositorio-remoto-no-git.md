---
layout: post
title: Como modificar o repositório remoto no GIT?
date: 2021-02-22 00:00:00 -0300
categories: []
sitemap: false
image: ''
excerpt: ''

---
Geralmente, quando iniciamos um repositório GIT vazio e queremos adicionar a origem remota, podemos simplesmente usar o seguinte comando:

    git remote add origin https://repositorio-remoto.com

Mas, por algum motivo, você pode querer modificar o repositório remoto onde enviará suas alterações.

Como fazer isso?

## Alterando a origem remota do repositório

Quando queremos trocar o repositório remoto, basta usar a opção `set-url` em `git remote`.

Dessa forma:

```bash
git remote set-url origin https://novo.repositorio-remoto.com
```

## Como visualizar o repositório remoto?

Assim, para checar se a modificação teve efeito, basta rodar o comando:

```bash
git remote -v
```

Ou, para ver com mais detalhes:

```bash
git remote show origin
```