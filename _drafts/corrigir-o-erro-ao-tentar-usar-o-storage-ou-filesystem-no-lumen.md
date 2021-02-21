---
layout: post
title: Corrigir o erro ao tentar usar o Storage ou Filesystem no Lumen
date: 2021-02-21 00:00:00 -0300
categories:
- lumen
sitemap: true
image: "/uploads/lumen.png"
excerpt: |-
  Aprenda a resolver o erro "Class League\Flysystem\Adapter\Local' not found
  " ao tentar usar o filesystem no Lumen

---
No Lumen, ao tentar chamar `app('filesystem')->disk('public')`ou `app('filesystem')->disk('local')` (ou `Storage:disk('local')` se tiver habilitado os facades), é comum receber o seguinte erro:

```text
Class League\Flysystem\Adapter\Local' not found in ./vendor/illuminate/filesystem/FilesystemManager.php on line 164
```

Isso ocorre porque o `league/flysystem` não está instalado no Lumen.

## Instalando o League/flysystem

Você precisa instalar o `league/flysystem` para que o filesystem funcione corretamente. Os adapters `local` e `public` dependem dele para funcionar corretamente, porém o mesmo não vem instalado por padrão no Lumen, por se tratar de um microframework.

Execute o seguinte comando no projeto.

```bash
composer require league/flysystem ^1.1
```

Pronto! problema resolvido.