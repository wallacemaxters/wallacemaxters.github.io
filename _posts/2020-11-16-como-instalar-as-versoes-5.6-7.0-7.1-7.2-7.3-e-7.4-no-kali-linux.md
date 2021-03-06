---
layout: post
title: Como instalar múltiplas versões do PHP no Kali Linux
date: 2020-11-16T01:25:00.000-02:00
categories:
- linux
- PHP
- kali
sitemap: true
image: "/uploads/kali-linux.jpg"
excerpt: 'Aprenda a resolver o erro a o instalar versões anteriores do PHP no Kali Linux.'

---
## Problemas ao instalar versões anteriores do PHP no Kali Linux

Eu me aventurei a instalar o Kali Linux na minha máquina pela primeira vez , porém não sabia de forma alguma como colocar as outras versões do PHP, como o 5.6 e o 7.2, que são as versões que costumo mais usar para desenvolver as aplicações em PHP.

Quando eu tentava rodar o comando `sudo apt install php7.2`, eu recebia o seguinte erro:

> E: Unable to locate package php7.2

Depois de algumas pesquisa, percebi a solução:

## Por que as outras versões do PHP não estão disponíveis no Kali Linux?

Percebi que no [Kali Linux Package Tracker](https://pkg.kali.org/pkg/php7.2), a respeito do PHP 7.2, constava a seguinte nota (tradução livre):

> Este pacote não faz parte de nenhuma distribuição Kali Linux. Portanto, você não encontrará muitas informações aqui. O pacote é muito novo e ainda não apareceu nos espelhos ou é um pacote antigo que acabou sendo removido. As notícias antigas são mantidas apenas para fins históricos.

Depois de fazer várias pesquisas aprofundadas sobre o problema, eu encontrei [esse trecho](https://www.kali.org/docs/policy/kali-linux-relationship-with-debian/ "Documentação do Kali Linux") na documentação da Kali Linux, que diz o seguinte (tradução livre):

> A distribuição Kali Linux é baseada no [Debian Testing](https://www.debian.org/releases/testing/) . Portanto, a maioria dos pacotes Kali são importados, como estão, dos repositórios Debian. Em alguns casos, os pacotes mais novos podem ser importados do Debian Unstable ou Debian Experimental, seja para melhorar a experiência do usuário, ou para incorporar as correções de bugs necessárias.

Sendo assim, eu fiz o teste de colocar o source do PHP apontando para o "buster", que é o nome da distro da versão 10 do Debian.

## Instalando versões anteriores do PHP no Kali Linux

Crie um arquivo chamado `php.list` dentro da pasta `/etc/apt/source.list.d`, dessa forma:

```bash
sudo nano /etc/apt/source.list.d/php.list
```

Adicione a seguinte linha de código:

```bash
deb https://packages.sury.org/php/ buster main
```

Após fazer isso e salvar, rode o comando abaixo:

```bash
sudo apt update
```

Se tudo deu certo, você poderá instalar as versões anteriores do PHP. No meu caso, tenho acesso a instalação das versões 5.6, 7.0, 7.1, 7.2 e 7.3 do PHP.

Para testar, rode:

```bash
sudo apt install php7.2
```
