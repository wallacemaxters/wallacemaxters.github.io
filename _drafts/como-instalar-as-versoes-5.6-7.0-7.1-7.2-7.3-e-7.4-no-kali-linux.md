---
layout: post
title: Como instalar as versões 5.6, 7.0, 7.1, 7.2, 7.3 e 7.4 no Kali Linux
date: 2020-11-16 01:25:00 -0200
categories:
- php
- linux
- kali
sitemap: true
image: ''
excerpt: ''

---
Eu me aventurei a instalar o Kali Linux na minha máquina pela primeira vez , porém não sabia de forma alguma como colocar as outras versões do PHP, como o 5.6 e o 7.2, que são as versões que costumo mais usar para desenvolver as aplicações em PHP.

Foi quando encontrei [esse trecho](https://www.kali.org/docs/policy/kali-linux-relationship-with-debian/ "Documentação do Kali Linux") na documentação da Kali Linux, que diz o seguinte (tradução livre):

> A distribuição Kali Linux é baseada no [Debian Testing](https://www.debian.org/releases/testing/) . Portanto, a maioria dos pacotes Kali são importados, como estão, dos repositórios Debian. Em alguns casos, os pacotes mais novos podem ser importados do Debian Unstable ou Debian Experimental, seja para melhorar a experiência do usuário, ou para incorporar as correções de bugs necessárias.

Sendo assim, eu fiz o teste de colocar o source do PHP apontando para o "buster", que é o nome da distro da versão 10 do Debian.

### A solução

Crie um arquivo chamado `php.list` dentro da pasta `/etc/apt/source.list.d`, dessa forma:

    sudo nano /etc/apt/source.list.d/php7.list

Adicione a seguinte linha de código

    deb https://packages.sury.org/php/ buster main
    

Após fazer isso e salvar, rode o comando `sudo apt update`.

Se tudo deu certo, você poderá instalar as versões anteriores do PHP. No meu caso, tenho acesso a instalação das versões 5.6, 7.0, 7.1, 7.2 e 7.3 do PHP.

Para testar, rode:

```bash
sudo apt install php7-2
```