---
layout: post
title: Como criar uma biblioteca para distribuição via Composer?
date: 2019-03-18T03:00:00.000+00:00
categories:
- PHP
sitemap: true

---
Nesse tutorial estarei ensinando detalhadamente como criar a estrutura para  distribuição de uma biblioteca para instalação via Composer.

## Antes de começar

Para continuar se dar bem com esse passo a passo, você precisa ter um considerável conhecimento sobre ferramentas de versionamento [GIT "Git - Ferramenta de Versionamento"](https://git-scm.com/). Além disso, é importante ter instalado na sua máquina o [Composer](https://getcomposer.org/).

## Crie a conta no Packagist

A primeira coisa que deve ser feita é ter uma conta no [Packagist](https://packagist.org/). Esse passo é necessário, pois é aqui onde o Composer busca as informações da sua biblioteca.

## Github

O próximo passo é você criar um repositório no Github. Crie o repositório como público. Você pode fazer isso clicando [aqui "Criar um repositório no Github"](https://github.com/new).

> **DICA**: Para um pacote chamado `vendor_name/library_name` no Packagist, seria importante que o seu repositório no Github chamasse `library_name`.

## Criando a estrutura da biblioteca

Crie o diretório para sua biblioteca. O primeiro passo agora é criar o arquivo `composer.json`  dentro dela. Você pode criar esse arquivo de duas formas:

### Criando o composer.json através da linha de comando

Você pode criar o `composer.json` através do comando `composer init`.  Esse comando roda interativamente.

![](/uploads/composer_init.png)

```json
{
    "name": "vendorname/libraryname",
    "description": "Minha Biblioteca",
    "type": "library",
    "license": "MIT",
    "authors": [
        {
            "name": "Seu e-mail",
            "email": "seu@email.com"
        }
    ],
    "minimum-stability": "stable",
    "require": {}
}
```

> **Observação**: _Vendor Name_ é o nome do "fornecedor" da biblioteca e _Library Name_ é o nome da biblioteca. O Composer utiliza "vendor name/library name" como padrão de nome para as bibliotecas.

Por exemplo, um padrão muito utilizado, é definir o seu namespace a partir da pasta `src` do seu projeto:

    library_name/
        .gitignore
        composer.json
        src/
           Hello.php

Assim, poderíamos configurar o composer.json da seguinte forma:

     "name" : "vendor_name/library_name",
    
     "required" : {
          "php" : ">=5.4"
     },
    
     "autoload" : {
           "psr-4" : {
               "VendorName\\LibraryName\\" :  "src/"
           }
     }

Sua classe `Hello.php` dentro de `src`, obviamente, deve ficar assim:

    namespace VendorName\LibraryName;
    
    class Hello {}

**Nota**: Para testar sua biblioteca antes de enviá-la, é necessário rodar o comando `composer dump` para gerar o autoload. Caso possua dependências a outras libraries, você deve usar `composer install`.

Depois de tudo isso, você pode fazer o commit e o push de suas alterações para o repositório:

    >>> cd library_name
    >>> git commit -am "my first commit"
    >>> git push

Após isso, você precisa submeter a sua biblioteca para o Packagist, através desse formulário:

<img src="https://i.stack.imgur.com/H3hrE.png" />

Depois da submissão, é necessário inserir o seu TOKEN API do Packagist nas configurações do seu repositório do Github.

Você deve clicar na opção "settings" e em seguida "integrations and services". Depois disso, na opção "add service" você deve escolher "packagist".

<img src="https://i.stack.imgur.com/nPzhs.png">

Depois disso, você deve clicar no serviço "packagist" que foi adicionado, e configurá-lo, colocando seu usuário e o token do Packagist.

Veja:

<img src="https://i.stack.imgur.com/NKyTU.png" />

O Token que deverá ser adicionado, pode ser encontrado nessa tela do Packagist:

<img src="https://i.stack.imgur.com/DQn93.png" />

Depois de fazer tudo isso, você já poderá testar se sua biblioteca está funcionando corretamente utilizando o comando:

    composer require vendor_name/library_name

\#Mas e o versionamento?

Você precisa definir uma tag no seu repositório para poder demarcar uma versão "utilizável" da sua biblioteca. Por exemplo, se você já tem certeza que sua biblioteca está pronta para o uso, poderá definir uma versão para ela.

Você pode definir uma tag dessa forma:

    git tag 0.0.1

Depois, para enviá-la ao seu repositório, você precisa rodar o comando:

    git push --tags

Note que as tags precisam seguir um padrão. Eu geralmente, sempre uso os três conjuntos de números.

As versões no seu Packagist será organizado de acordo com esses números.

Por exemplo;

    1.0.0
    0.0.3
    0.0.2
    0.0.1