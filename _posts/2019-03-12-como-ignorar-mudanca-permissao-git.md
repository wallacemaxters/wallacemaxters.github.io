---
layout: post
title: Como ignorar mudanças de permissão do CHMOD no GIT?
date: 2020-11-16 16:20:13 -0200
categories:
- linux
- git
sitemap: true
image: "/uploads/covers/git.jpg"
excerpt: O git costuma considerar como modificação as alterações de permissão feitas
  pelo comando chmod e, algumas vezes, isso acaba atrapalhando no momento que é feito
  um git pull. Aprenda a solucionar esse problema definitivamente.

---
Vez ou outra, sempre tive problemas com alteração de permissões no GIT. Um amigo que trabalhava no mesmo projeto que eu costumava usar o usuário `root` do linux para muitas coisas, inclusive para abrir o Sublime Text e editar os arquivos do projeto.

Acontece que, quando ele ia dar o `git commit` e `git push`, além das modificações de arquivos, chegavam para mim os arquivos com restrições de edição, geralmente criadas pelo comando `chmod`. Para resolver isso, eu aplicava o `chmod -R 777` para poder editar esses arquivos.

O problema é que, quando eu fazia isso, ao rodar o comando `git status`, aparecia uma lista de arquivos que eu nem tinha mexido constando como tendo alterações. Isso porque o Git estava reconhecendo as alterações da permissão pelo `chmod` como uma modificação.

## Solucionando o problema

Para solucionar isso, descobri que existe uma configuração no GIT que faz as modificações de permissões serem ignoradas. Ele permite configurar localmente (por projeto/repositório) ou globalmente.

Globalmente:

```bash
git config --global core.filemode false
```

Localmente:

```bash
cd repositorio-desejado
git config core.filemode false
```

Após fazer isso, use `git status` para ver se a configuração funcionou corretamente.

**Observação:**
No meu caso, a configuração global geralmente não afetava a configuração já vigente, sendo necessário sempre executar o segundo exemplo demonstrado.