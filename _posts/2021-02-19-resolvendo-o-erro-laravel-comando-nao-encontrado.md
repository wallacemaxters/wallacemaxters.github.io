---
layout: post
title: 'Resolvendo o erro "laravel: comando não encontrado"'
date: 2021-02-19 12:39:00 +0000
categories:
- composer
- laravel
sitemap: true
image: "/uploads/laravel-comando-nao-encontrado.jpeg"
excerpt: 'Ao tentar instalar o Laravel Installer através do Composer com o comando
  "composer global require laravel/installer", você pode receber o erro "laravel:
  comando não encontrado". Aprenda a solucionar isso nesse tutorial.'

---
Ao tentar instalar o Laravel Installer através do Composer com o comando `composer global require laravel/installer`, pode acontecer de a instalação ocorrer normalmente. Porém ao tentar rodar o comando `laravel`, você pode receber um erro, dizendo que o comando não está disponível.

Exemplo:

```bash
$ composer global require laravel/installer
$ laravel
laravel: comando não encontrado
```

Isso geralmente acontece porque a [você não adicionou o diretório de instalação do Composer na variável PATH](\[% link 2021-02-19-como-adicionar-o-composer-ao-path.md %}).

## Corrigindo o erro "laravel: comando não encontrado"

Encontre onde o local onde o Composer salvou o instalador do Laravel, através do comando abaixo:

```bash
$ composer global config bin-dir --absolute --quiet
```

Ele retornará algo parecido com:

```text
/home/{usuario}/.config/composer/vendor/bin
```

Agora, edite seu arquivo `~/.bashrc` através do comando `nano ~/.bashrc` e adicione a seguinte linha:

```bash
export PATH=$PATH:/home/{usuario}/.config/composer/vendor/bin
```

Feito isso, rode o comando `source ~/.bashrc`.

Agora, teste se o comando `laravel` está funcionando corretamente.

{% include ads_common.html %}
<hr />

### Solução 2

Alternativamente, ao invés de copiar e colocar o caminho da pasta de instalação dos pacotes do Composer, você pode utilizar deixar mais dinâmico, adicionando `$(composer global config bin-dir --absolute --quiet)` diretamente à variável `PATH`.

Faça assim:

Edite o arquivo `.bashrc`

```bash
nano ~/.bashrc
```

Adicione na última linha desse arquivo:

```bash
export PATH=$PATH:$(composer global config bin-dir --absolute --quiet)
```

Recarregue o `.bashrc`:

```bash
source ~/.bashrc
```