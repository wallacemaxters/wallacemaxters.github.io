---
layout: post
title: Criando uma biblioteca própria no Composer
date: 2021-01-21 01:00:00 -0200
categories:
- PHP
- composer
sitemap: true
excerpt: Aprenda a publicar a sua biblioteca no packagist.org para utilização no Composer
image: "/uploads/composer.jpg"

---
Nesse tutorial estarei ensinando detalhadamente como criar a estrutura para  distribuição de uma biblioteca para instalação via Composer.

## Antes de começar

Para continuar se dar bem com esse passo a passo, você precisa ter um considerável conhecimento sobre ferramentas de versionamento [GIT "Git - Ferramenta de Versionamento"](https://git-scm.com/). Além disso, é importante ter instalado na sua máquina o [Composer](https://getcomposer.org/).

## Crie a conta no Packagist

A primeira coisa que deve ser feita é ter uma conta no [Packagist](https://packagist.org/). Esse passo é necessário, pois é aqui onde o Composer busca as informações da sua biblioteca.

## Github

O próximo passo é você criar um repositório no Github. Crie o repositório como público. Você pode fazer isso clicando [aqui "Criar um repositório no Github"](https://github.com/new).

> **DICA**: Para um pacote chamado `vendor_name/library_name` no Packagist, seria importante que o seu repositório no Github chamasse `library_name`.

## Criando a estrutura da biblioteca e iniciando o repositório

Crie o diretório para sua biblioteca. Como exemplo, vamos criar uma pasta chamada `library_name`.

Exemplo:

```bash
mkdir library_name
cd libray_name
```

Em seguida, inicie o repositório GIT e adicione a origem remota, apontando para o repositório que você criou no Github.

Código:

```bash
git init
git remote add origin https://github.com/vendorname/libraryname.git
```

Agora é necessário criar o arquivo `composer.json`  dentro dela. Para utilizar sua biblioteca no Composer, é necessário que esse arquivo esteja na raiz do seu projeto. Ele contém as informações relevantes para que sua biblioteca seja processada, como, por exemplo, o nome e a descrição da sua biblioteca.

Podemos criar esse arquivo de duas formas...

### Criando o composer.json iterativamente pela linha de comando

Você pode criar o `composer.json` através do comando `composer init`.  Esse comando roda interativamente. Você precisa preencher as informações, conforme a necessidade.

A imagem abaixo ilustra as informações preenchidas.

![Criando o composer.json interativamente](/uploads/composer_init.png)

### Criando o composer.json manualmente

Caso você prefira, você também pode criar seu arquivo `composer.json` manualmente. Abaixo você pode usar esse modelo com as informações essenciais para o funcionamento da sua biblioteca.

Exemplo:

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

#### Escolhendo o namespace da sua biblioteca

No composer, o nome da biblioteca é composto por _Vendor Name_ e _Package Name_. Você deve defini-lo na propriedade `name` do `composer.json`. Da mesma forma, o `namespace` usado na biblioteca seguirá o mesmo padrão do nome da biblioteca.

**Vendor Name**

Esse é nome do "fornecedor" da biblioteca. É comum nas bibliotecas do Composer utilizar o _Vendor Name_ como primeiro segmento do seu namespace.

Por exemplo, como utilizamos o nome `vendorname`, o namespace principal das bibliotecas desenvolvidas deve ser `VendorName`.

**Library Name**
O _Library Name_ é o nome da biblioteca. Esse nome vem depois do _Vendor Namespace_, após a barra. No nosso exemplo, como criamos o nome  `libraryname` para a biblioteca, o namespace utilizado deve ser `VendorName\LibraryName`.

Sendo assim, seu namespace será:

```php
namespace VendorName\LibraryName;
// restante do código ...
```

### Estrutura das pastas

Vamos começar a criar os arquivos da biblioteca. Dentro de `library_name`, precisamos criar os seguintes arquivos e pastas:

    library_name/
        .gitignore
        composer.json
        src/
           Hello.php

Na pasta `src` é o local onde ficarão os scripts da biblioteca. Crie a pasta `src` e crie um script chamado `src/Hello.php`. Vamos definir o seguinte conteúdo para nosso arquivo:

```php
namespace VendorName\LibraryName;

class Hello
{
    public function say()
    {
        echo "Hello!";
    }
}
```

Crie o arquivo `.gitignore`, para configuramos os arquivos que não farão parte do nosso repositório GIT. A pasta `vendor` deve ser adicionada nele.

Exemplo:

    /vendor/

### Configurando o autoloader

O arquivo `composer.json` já foi criado anteriormente. Precisamos definir a configuração do autoload da biblioteca. Vamos utilizar o padrão [PSR-4](https://www.php-fig.org/psr/psr-4/).

Adicione a seguinte linha ao seu `composer.json`:

```json
     "autoload" : {
           "psr-4" : {
               "VendorName\\LibraryName\\" :  "src/"
           }
     }
```

Em `psr-4`, temos que definir uma chave e um valor. A chave representa o `namespace` principal da sua biblioteca. O `valor` é a pasta onde os `scripts` estão localizados.

#### Testando o autoload

Para testar, primeiro rode o comando `composer dump`. Isso vai gerar uma pasta chamada `vendor` no seu projeto,  com o autoloader das classes do seu projeto.

Em seguida, crie um arquivo chamado `teste.php` na raiz do projeto e cole o seguinte código

```php
require __DIR__ . '/vendor/autoload.php';
use VendorName\LibraryName;
$hello = new Hello;
$hello->say();
```

Execute-o na linha de comando.

```bash
php teste.php 
```

Se você receber a saída _"Hello!"_, isso significa que seu autoload está correto.

> O arquivo não faz parte do repositório, então você pode removê-lo ou adicioná-lo ao seu`.gitignore`

## Enviando as alterações para o repositório remoto

Se você fez todas as confirmações acima, agora você já pode atualizar o repositório remoto com os arquivos da sua biblioteca.

Faça assim:

```bash
git add .
git commit -m "primeiro commit"
git push -u origin master
```

## Adicionando o repositório ao Packagist

Agora, você precisa submeter a sua biblioteca para o Packagist, através [desse link](https://packagist.org/packages/submit).

Você precisa adicionar o URL do repositório do Github no campo _Repository URL_, conforme a imagem abaixo.

![](/uploads/enviando-biblioteca-para-o-packagist-composer.png)

### Configurando o TOKEN API no Packagist

Depois da submissão, é necessário inserir o seu _TOKEN API_ do Packagist nas configurações do seu repositório do Github. 

Para fazer isso, acesse a opção <kbd>Settings</kbd> > <kbd>Integrations & Services</kbd>  do seu repositório.

![](/uploads/integrando-o-packagist-com-github.png)

Depois disso, você deve clicar no serviço "packagist" que foi adicionado, e configurá-lo, colocando seu usuário e o token do Packagist.

Veja:

![](/uploads/configurar-token-composer-github.png)

O token do packagisto deverá ser adicionado no formulário acima. Ele pode ser encontrado [nesse link,](https://packagist.org/profile/) conforme a imagem abaixo:

![](/uploads/token-da-api-packagist-composer.png)

### Instalando sua biblioteca

Depois de fazer tudo isso, você já poderá testar se sua biblioteca está funcionando corretamente utilizando o comando `composer require`.

Exemplo:

    composer require vendorname/libraryname

## Como funciona o versionamento no Composer?

Para você definir uma release (versão de lançamento) para sua biblioteca, você deve usar uma [git tag](https://git-scm.com/book/en/v2/Git-Basics-Tagging). Você basicamente usa o comando `git tag` para criar uma tag com o nome da versão.

Caso você ache que sua biblioteca está pronta para o uso, você pode definir uma tag.

Assim:

```bash
git tag 0.0.1
```

Depois, para enviá-la ao seu repositório, você precisa rodar o comando:

```bash
git push --tags
```

> **NOTA**: As tags precisam seguir o [padrão do Composer](https://getcomposer.org/doc/articles/versions.md). Geralmente, trata-se dos 3 conjuntos de números separados por ponto (`.`).