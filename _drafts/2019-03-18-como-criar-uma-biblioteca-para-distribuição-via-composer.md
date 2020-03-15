---
layout: post
title: Como criar uma biblioteca para distribuição via Composer?
date: 2019-03-18T03:00:00.000+00:00
categories:
- PHP
- Composer
sitemap: false

---
Nesse tutorial estarei ensinando detalhadamente como criar a estrutura para  distribuição de uma biblioteca para instalação via Composer;

A primeira coisa que deve ser feita é ter uma conta no [Packagist](https://packagist.org/). 

Após a criação da conta, crie um repositório no Github

Por exemplo: para um pacote chamado `vendor_name/library_name` no Packagist, seria importante que o seu repositório no Github chamasse `library_name`.

> **Observação**: _Vendor Name_ é o nome do "fornecedor" da biblioteca e _Library Name_ é o nome da biblioteca. O Composer utiliza "vendor name/library name" como padrão de nome para as bibliotecas.

<sub>**Nota**: para continuar esse "tutorial", você deve ter em mente que você precisa ter um considerável conhecimento sobre ferramentas de versionamento (como o GIT, por exemplo).</sub>

Depois de criar seu repositório, recomendo seguir alguns padrões para a criação da sua biblioteca.

Por exemplo,  um padrão muito utilizado, é definir o seu namespace a partir da pasta `src` do seu projeto:

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