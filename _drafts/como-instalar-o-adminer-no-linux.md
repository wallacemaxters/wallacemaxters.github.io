---
layout: post
title: Como instalar o adminer no Linux?
date: 2020-11-29 01:00:00 -0200
categories:
- adminer
- php
- linux
sitemap: true
image: ''
excerpt: O Adminer é um gerenciador de banco de dados  bem simples escrito em PHP.
  Ele utiliza apenas um script PHP para fazer isso. Aprenda a configurá-lo para melhor
  aproveitamento no seu Linux.

---
O Adminer é um gerenciador de banco de dados escrito em PHP. A simplicidade dele chama a atenção, porque ele utiliza apenas um script para fazer isso.

Nesse tutorial, vamos aprendar a configurar o Adminer, rodando-o a partir do Apache2 no Linux.

## Configurando o arquivo /etc/hosts

Configure seu `/etc/hosts` para ficar mais fácil acessar o seu adminer através do navegador. Minha sugestão é que você crie um host virtual chamado `adminer`, mas você pode usar outros nomes como `db`, `database.local`, etc...

Faça assim:

```bash
sudo nano /etc/hosts
```

E adicione a seguinte linha:

```nano
127.0.0.1 adminer
```

> Ao fazer isso, o host `adminer` deve estar disponível no seu navegador, através de `http://adminer`.

Feche o arquivo e salve as alterações. No `nano`, você aperta <kbd>CTRL + X</kbd> e em seguida aperta `S` (ou `Y`).

## Configurando o Apache

> Essa parte do tutorial presume que você já tenha o PHP e o Apache2 instalados na sua máquina.

Para adicionar o nosso host no Apache, você precisa seguir os seguintes passos:

### Preparando a estrutura para rodar pelo Apache

Crie a pasta `adminer` dentro de `/var/www`. 

```
cd /var/www
sudo mkdir adminer
```
### Baixando o Adminer

A ideia agora é que você coloque o script do Adminer dentro dessa pasta que criamos acima e renomeio-o para `index.php`. O caminho final deve ser `/var/www/adminer/index.php`.

Para baixar o Adminer, eu costumo utilizar o `wget` diretamente para já baixar e renomear o arquivo. Dessa forma:

```bash
wget https://github.com/vrana/adminer/releases/download/v4.7.7/adminer-4.7.7.php
mv adminer-4.7.7.php index.php
```

Ou, se preferir, você pode fazer o download pelo navegador. Após baixar o arquivo, recorte e cole o arquivo na pasta `/var/www/adminer`. Depois, basta renomeá-lo para `index.php`.

Você poderá baixar através do [link das releases mais recentes](https://github.com/vrana/adminer/releases/) ou no link para download na [página do Adminer](https://www.adminer.org/#download).

Feito isso, vamos ao próximo passo.

### Criando o Virtualhost

Vá para a pasta `/etc/apache2/sites-avaliables`. Nessa pasta fica os arquivo de Virtual Hosts utilizado pelo Apache2. 

```bash
cd /etc/apache2/sites-avaliables
```

Crie um arquivo chamado `adminer.conf` dentro da pasta que navegamos. Assim:

```bash
sudo nano adminer.conf
```
Agora, vamos adicionar um conteúdo ao nosso arquivo. 

Faça assim:

```
<VirtualHost *:80>
  ServerName adminer
  DocumentRoot /var/www/adminer
</VirtualHost>
```

> O `ServerName` é o nome do host criado dentro de `/etc/hosts`. No nosso tutorial, estamos usando o host `adminer`, porém, como dito antes, você pode usar o que desejar. O `DocumentRoot` aponta para a pasta raiz da aplicação, que no nosso caso, é o `adminer`.

Para ativar nosso Virtual Host, é necessário rodar o comando `a2ensite`. Esse comando habilita um arquivo `.conf` para ser utilizado pelo Apache.

Faça assim:

```bash
sudo a2ensite adminer.conf
```

Após fazer isso, teste se as configurações acima estão corretas, através do comando:

```bash
sudo apache2ctl configteste
```

Se tudo estiver correto, basta recarregar o Apache, para que as configurações tenham efeito.

Faça isso:

```bash
sudo service apache2 reload
```

## Testando o adminer

Abra o seu navegador e em seguida digite o endereço `http://adminer`. Se tudo estiver correto, você verá a página do adminer funcionando.