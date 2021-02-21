---
layout: post
title: Como corrigir o erro "Class League\Flysystem\Local" ao usar o Storage no Lumen?
date: 2021-02-21 00:00:00 -0300
categories:
- lumen
sitemap: true
image: "/uploads/lumen.png"
excerpt: |-
  No Lumen, ao tentar utilizar o  Storage (filesystem), você pode receber o erro "Class League\Flysystem\Adapter\Local' not found
  ". Isso é causado por uma dependência que está em falta. Veja como resolver o problema neste tutorial.

---
No Lumen, ao tentar chamar `app('filesystem')->disk('public')`, ou `app('filesystem')->disk('local')`, ou `Storage:disk('local')` se tiver habilitado o Facade, é comum receber o seguinte erro:

```text
Class League\Flysystem\Adapter\Local' not found in ./vendor/illuminate/filesystem/FilesystemManager.php on line 164
```

Isso ocorre porque o `league/flysystem` não está instalado no seu projeto. Ele é uma dependência interna para que os Adapters `local` e `public` funcionem no Lumen.

## Instalando o League/flysystem

Como dito, você precisa instalar o `league/flysystem`. Você precisa especificar a versão `^1.1` na instalação.

Código:

```bash
composer require league/flysystem ^1.1
```

> **Nota**: Esse tutorial foi testado na versão 7.0 do Lumen e só funcionou corretamente ao utilizar a versão ^1.1 do league/flysystem.