---
layout: post
title: Como configurar a variável PATH?
date: 2021-01-12 01:00:00 -0200
categories:
- linux
sitemap: true
image: "/uploads/linux-terminal.png"
excerpt: Nesse tutorial, vamos aprender a configurar a variável de ambiente PATH para
  adicionar o caminho de seus scripts ou executáveis.

---
Nesse tutorial, vamos aprender a configurar a variável de ambiente `PATH` para adicionar o caminho de seus excetuáveis. Mas primeiro vamos aprender algumas coisas básicas sobre esta variável de ambiente e também sobre executáveis.

## Onde ficam os executáveis ou comandos usados no Terminal?

Você já deve ter percebido que no Terminal temos vários comandos à disposição. E já deve ter percebido também que alguns deles só ficam disponíveis após instalar determinado pacote. O Linux armazena esses executáveis em alguma pasta específica do sistema operacional. Você pode verificar o diretório de origem de um executável qualquer rodando o comando `which`.

Exemplo:

```bash
which echo
# /usr/bin/echo
```

No caso acima, vemos que o executável `echo` está localizado na pasta `/usrb/bin/`.
Sabemos então que os executáveis sempre vêm de algum diretório. 

A questão é:  O que faz com que possamos executá-los usando apenas o nome, ao invés de ter que digitar o caminho completo?

## O que é a variável PATH?

A variável `PATH` é usada no Linux para localizar executáveis necessários da linha de comandos.  Em outras palavras, esta variável possui uma lista de caminhos onde se localizam os executáveis que usamos, por exemplo, no Terminal.

Você pode conferir o que há na variável `PATH` simplesmente rodando o comando `echo`.

Exemplo:

```bash
echo $PATH
# /usr/local/sbin:/usr/local/bin:/usr/sbin:/usr/bin:/sbin:/bin:/usr/games:/usr/local/games:/snap/bin
```

Notem que essa variável possui uma lista de caminhos separados por `:`. Cada caminho desse representa um local onde o Linux encontra os executáveis.

Sendo assim, se modificarmos o valor de `PATH`, isso também mudará a maneira que o Linux reconhece os executáveis/comandos usados no terminal.

## Configurando a variável PATH

Se você deseja adicionar os seus próprios scripts ou executáveis no terminal, você precisa adicionar o caminho onde encontra-se os mesmos se encontram à variável `PATH`.

Você pode fazer isso dessa forma:

```bash
PATH="${PATH}:/caminho/para/meus/executáveis"
```

### Exemplo: adicionando uma pasta de scripts

Para entendermos na prática, vamos adicionar o caminho `/tmp/meus_scripts` na variável `$PATH` para testarmos.

O que vamos fazer é o seguinte:
1 - Criar a pasta `/tmp/meus_scripts`
2 - Criar um script chamado `hello` dentro da pasta `/tmp/meus_scripts`
3 - Adicionar `/tmp/meus_scripts` em `PATH`
4 - Dar permissão de execução para `hello`.

Dessa forma:

```bash
mkdir /tmp/meus_scripts
echo "echo Hello" > /tmp/meus_scripts/hello
chmod +x /tmp/meus_scripts/hello
PATH="${PATH}:/tmp/meus_scripts"
```

Se tudo ocorreu como esperado, você pode testar, assim:

```bash
hello
# Hello
```

Se tudo ocorreu bem, significa que a sua pasta foi adicionada com sucesso na variável de ambiente `PATH`.

> **Nota** : Para que seu script seja executável na linha de comando, você precisa dar a permissão d execução para o mesmo. Você pode fazer isso através do comando `chmod +x script`.