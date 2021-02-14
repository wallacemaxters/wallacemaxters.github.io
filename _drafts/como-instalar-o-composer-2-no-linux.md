---
layout: post
title: Como instalar o Composer 2 no Linux?
date: 2021-02-14 11:14:00 -0200
categories:
- linux
- composer
- php
sitemap: true
image: ''
excerpt: O Composer 2 foi lançado, com várias novidades, principalmente em relação
  ao desempenho, como melhorias no uso da CPU e um considerável diminuição no tempo
  de instalação e atualizações dos pacote. Veja como instalar no Linux.

---
O [Composer 2](https://getcomposer.org/2/) foi lançado, com várias novidades, principalmente em relação ao desempenho, como melhorias no uso da CPU e um considerável diminuição no tempo de instalação e atualizações dos pacotes.

Vejamos como podemos instalar essa incrível versão no seu Linux 

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

Para testar, basta rodar o comando `composer diagnose`

## Atualizando o composer

Para atualizar o composer, basta utilizar o comando `composer self-update`. No nosso caso, como movemos o composer para a pasta `/usr/local/bin`, **é necessário permissão de root** para afetuar a operação.

```bash
sudo composer self-update
```