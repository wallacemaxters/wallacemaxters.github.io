---
layout: post
title: Como instalar o adminer no Linux?
date: 2020-11-29 01:00:00 -0200
categories:
- adminer
- php
sitemap: false
image: ''
excerpt: Aprenda a configurar o Adminer de maneira simples no seu Linux

---
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

A ideia agora é que você coloque o script do Adminer dentro dessa pasta que criamos acima e renomeio-o para `index.php`. O caminho final deve ser `/var/www/adminer/index.php`.


Para baixar o Adminer, eu costumo utilizar o `wget` diretamente para já baixar e renomear o arquivo. Dessa forma

```bash
wget https://github.com/vrana/adminer/releases/download/v4.7.7/adminer-4.7.7.php
mv adminer-4.7.7.php index.php
```

Mas caso tenha baixado via download, você pode simplesmente recortar o arquivo, colar na pasta `/var/www/adminer` e renomear pra `index.php`.

Você poderá baixar através do [link das releases mais recentes](https://github.com/vrana/adminer/releases/) ou no link para download na [página do Adminer](https://www.adminer.org/#download)

### Criando o Virtualhost

Vá para a pasta `/etc/apache2/sites-avaliables`. Nessa pasta fica os arquivo de Virtual Hosts utilizado pelo Apache2. 

Crie um arquivo chamado `adminer.conf`, assim:

```bash
sudo nano adminer.conf
```

E coloque o seguinte conteúdo

```
<VirtualHost *:80>
  ServerName adminer
  DocumentRoot /var/www/adminer
</VirtualHost>
```

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