---
layout: post
title: Como ignorar mudanças de permissão com o GIT?
date: 2019-03-12 23:41:13 +0000
categories:
- git
- linux

---
Vez ou outra, sempre tive problemas com alteração de permissões no GIT. Um amigo que trabalhava no mesmo projeto que eu costumava usar o usuário `root` do linux para muitas coisas, inclusive para abrir o Sublime Text e editar os arquivos do projeto.

Acontece que, quando ele ia dar o `git commit` e `git push`, além das modificações de arquivos, chegavam para mim os arquivos com restrições de edição. Daí eu aplicava o `chmod -R 777` para poder editar esses arquivos.

O problema é que, quando eu fazia isso, ao rodar o comando `git status`, aparecia uma lista de arquivos que eu nem tinha mexido constando como tendo alterações.

Para solucionar isso, descobri que existe uma configuração no GIT que faz as modificações de permissões serem ignoradas. Ele permite configurar localmente (por projeto/repositório) ou globalmente.

Globalmente:

```bash
git --global config core.fileMode false```

Localmente:

```bash
cd repositorio-desejado
git config core.fileMode false```

No meu caso, a configuração global geralmente não afetava a configuração já vigente, sendo necessário sempre executar o segundo exemplo demonstrado.