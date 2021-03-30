---
layout: post
title: Configurando um virtual host para Laravel no Apache
date: 2020-12-03T15:14:00.000-02:00
categories:
- laravel
- apache
- linux
sitemap: true
image: "/uploads/Laravel.jpg"
excerpt: Aprenda como configurar um Virtual Host no Linux para executar seu site/projeto  Laravel
  através do Apache 2.

---
O servidor Apache e Linux são muito utilizados em diversas hospedagens de site. Por isso, creio que é importante saber configurá-lo na sua própria máquina, para estar familiarizado com o mesmo. Neste tutorial, vamos aprender como configurar um Virtual Host no Linux para executar sua aplicação Laravel através do Apache 2.

> **Nota:** Esse tutorial assume que você já tenha o Apache2 e o PHP instalado no seu Linux.

***

## Em qual diretório deve estar meu projeto Laravel?

Por padrão, no Linux, os sites do Apache estão localizados no diretório `/var/www/`. A sugestão é que você mova a pasta do seu projeto para dentro desta pasta. O caminho deverá ficar parecido com `/var/www/seu-projeto`.

***

## Configurando um host local para sua aplicação

É possível criar um host na sua máquina, diferente do `localhost`, para executar a sua aplicação Laravel localmente. Para isto,  basta deve editar o arquivo `/etc/hosts` e adicionar uma nova linha de configuração. É necessário permissão de `root` para editar este arquivo. 

No exemplo abaixo, vamos usar o `nano` para editar o arquivo. Veja: 

```bash
sudo nano /etc/hosts
```

Em seguida, adicione a seguinte linha:

    127.0.0.1 seu-projeto.local

Para testar se o novo host está funcionando, você pode acessar `http://seu-projeto.local` no seu navegador, após salvar o arquivo acima.

***

## Criando um Virtual Host

Agora, precisamos criar um arquivo de Virtual Host no seu Apache, para apontar para o domínio local criado anteriormente.  Os arquivos de virtual hosts devem ser armazenados na pasta `/etc/apache2/sites-avaliable` e possuir a extensão `.conf`.

Faça o seguinte:

```bash
cd /etc/apache2/sites-avaliable
sudo nano seu-projeto.conf
```

Em seguida, adicione o seguinte conteúdo em seu arquivo `seu-projeto.conf`:

```apache
<VirtualHost *:80>
    ServerName seu-projeto.local
    DocumentRoot /var/www/seu-projeto/public
</VirtualHost>
```

Observe que `DocumentRoot` está apontando para a pasta `public` da sua aplicação Laravel. Isso deve ser feito para que a aplicação funcione corretamente, pois no Laravel essa pasta é tratada como a raiz da sua aplicação web.

---

## Habilitando o Virtual Host

Após salvar o arquivo do Virtual Host, você precisa executar o comando `a2ensite`. Esse comando é responsável por habilitar o virtual host.

Faça assim:

```bash
sudo a2ensite seu-projeto.conf
```

Esse comando retornará a seguinte saída:

    Enabling site seu-projeto.local.
    To activate the new configuration, you need to run:
      systemctl reload apache2

Com isso, o seu virtual host foi habilitado e está pronto para funcionar, porém é recomendável fazer uma coisa antes...

### Teste o Apache após habilitar um Virtual Host

A mensagem acima está sugerindo que você já pode recarregar o Apache,  para que o novo site esteja disponível. Mas, antes de fazer isso, **é sempre importante** executar o comando `sudo apache2ctl configtest`. Este comando verificará se existe algum problema com a sintaxe e afins em seu Virtual Host. Caso haja falhas, será apresentado os detalhes dos erros que precisarão ser corrigidos. Se tudo estiver certo, você receberá a saída `Syntax OK`.

---

## Recarregando o Apache

Toda vez que você habilita um virtual host novo, você precisa recarregar o Apache, para que as mudanças entrem em vigor.

Utilize o seguinte comando:

```bash
sudo service apache2 reload
```

Ou:

```bash
sudo systemctl reload apache2
```

> É importante informar que o Apache cria um link simbólico dos virtual hosts ativos. Ele os cria dentro da pasta `/etc/apache2/sites-enabled`. Quando você executa o comando `a2ensite`,  o arquivo alvo em `/etc/apache2/sites-avaliable`  passa a ter um link em `/etc/apache2/sites-enabled`. 

--- 
## Testando a aplicação

Agora, você já pode acessar a url `seu-projeto.local` em seu navegador para conferir se está tudo certo. Se as demais configurações do seu projeto ou dependências já estiverem definidas, sua aplicação está funcionando agora pelo Apache!

---

## Reescrita de URL no Laravel

O Laravel internamente utiliza o `mod_rewrite` para que as rotas da aplicação funcionem como esperado. Caso não tenha ainda configurado o seu Apache, ou sua aplicação no Apache apresentar problemas com a URL, recomendo a leitura de [como habilitar a reescrita de urls no Apache](/blog/2020/11/26/como-habilitar-a-reescrita-de-url-no-apache2).