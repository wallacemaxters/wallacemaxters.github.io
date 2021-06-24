---
layout: post
title: Como instalar o Composer 2 no Linux?
date: 2021-02-14T11:14:00.000-02:00
categories:
- composer
- PHP
- linux
sitemap: true
image: "/uploads/composer.jpg"
excerpt: O Composer 2 foi lançado, com várias novidades, principalmente em relação
  ao desempenho, como melhorias no uso da CPU e uma considerável diminuição no tempo
  de instalação e atualizações dos pacote. Veja como instalar no Linux.
last_modified_at: 
color: ''

---

## O que é Composer?

O Composer é uma ferramenta de gerenciamento de dependências para o PHP, criado principalmente para facilitar a instalação e atualização para dependências de projeto. 
O Composer verifica de quais outros pacotes um projeto específico depende e os instalará para você, usando as versões de acordo com os requisitos do projeto.

## O que há de novo no Composer 2?

O [Composer 2](https://getcomposer.org/2/) foi lançado, com várias novidades, principalmente em relação ao desempenho, como melhorias no uso da CPU e um a considerável diminuição no tempo de instalação e atualizações dos pacotes.

Vejamos como podemos instalar essa incrível versão no seu Linux.

## Instalando o composer 2

Você deve utilizar o PHP na linha de comando para copiar o script de instalação do composer, [conforme a documentação do Composer](https://getcomposer.org/download/).

Execute o seguinte comando no Terminal:

```bash
php -r "copy('https://getcomposer.org/installer', 'composer-setup.php');"
php composer-setup.php
```

O comando acima vai criar o arquivo `composer.phar` no diretório atual.

Agora, dê permissão de execução para o arquivo, usando o comando `chmod`.

```bash
chmod +x composer.phar
```

Em seguida, mova o arquivo para a pasta `/usr/local/bin` para torná-lo disponível no Terminal.

```bash
sudo mv composer.phar /usr/local/bin/composer
```

Pronto! Você instalou o Composer 2 no seu Linux.

## Testando o Composer 2

Através do comando `composer --version`, você poderá verificar a versão do Composer.

Exemplo:

```bash
composer --version
```

O resultado será parecido com isso:

    Composer version 2.0.9 2021-01-27 16:09:27

### Verificando informações e dependências

Para verificar a integridade da instalação, podemos rodar o comando `composer diagnose`. Esse comando tem como objetivo mostrar algumas informações sobre as dependências utilizadas, bem como verificar se existem erros comuns na instalação.

Exemplo:

```bash
composer diagnose
```

Saída:

    Checking platform settings: OK
    Checking git settings: OK
    Checking http connectivity to packagist: OK
    Checking https connectivity to packagist: OK
    Checking github.com oauth access: OK
    Checking disk free space: OK
    
    Checking composer version: OK
    Composer version: 2.0.9
    PHP version: 7.3.27
    PHP binary path: /usr/bin/php7.3
    OpenSSL version: OpenSSL 1.1.1i  8 Dec 2020
    cURL version: 7.68.0 libz 1.2.11 ssl OpenSSL/1.1.1i
    zip: extension present, unzip present

## Atualizando o composer

Para atualizar o Composer, basta utilizar o comando `composer self-update`. No nosso caso, como movemos o composer para a pasta `/usr/local/bin`, **é necessário permissão de root** para efetuar a operação.

```bash
sudo composer self-update
```