---
layout: post
title: Como modificar o repositório remoto no GIT?
date: 2021-02-22 00:00:00 -0300
categories:
- git
sitemap: true
image: "/uploads/git.png"
excerpt: 'Você configurou um repositório remoto GIT através do "git remote add origin"
  e agora precisa alterar, mas não sabe como fazer? Aprenda neste tutorial!'
color: "#50E3C2"

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

A saída será parecida com isso:

```text
https://novo.repositorio-remoto.com (fetch)
https://novo.repositorio-remoto.com (push)
```

Ou, para ver com mais detalhes:

```bash
git remote show origin
```

Saída:

```text
* remote origin
  Fetch URL: https://novo.repositorio-remoto.com
  Push  URL: https://novo.repositorio-remoto.com
  HEAD branch: master
  Remote branches:
    gh-pages tracked
    master   tracked
  Local branch configured for 'git pull':
    master merges with remote master
  Local ref configured for 'git push':
    master pushes to master (local out of date)
```