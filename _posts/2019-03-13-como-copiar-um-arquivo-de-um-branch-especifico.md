---
layout: post
date: 2019-03-13T23:36:58.000+00:00
title: Como copiar um arquivo de um branch para outro no GIT?
categories:
- git
sitemap: true
image: "/uploads/covers/git.jpg"
last_modified_at: 2021-03-06 11:00:00 +0000

---
Se você trabalha com o GIT, pode já ter surgido a necessidade de copiar apenas um ou alguns arquivos que estavam em outro branch. As vezes não é viável fazer um `git checkout` ou `git merge`, só por causa de dois ou três modificações de arquivos que estejam em outro branch, pois isso poderia acarretar mudanças não esperadas no branch atual de trabalho.

Mas seria possível fazer isso no GIT?


## Possíveis cenários de necessidade de cópia de arquivos de um branch para outro

Suponhamos o cenário onde você possua o branch A e o branch B. Você está trabalhando atualmente no branch A, porém precisa das modificações do arquivo `b.txt` e `c.txt`, que está no branch B. Porém, você não está seguro para fazer merge de A com B (ou vice-versa), pois pode haver muitos conflitos para resolver, ou mesmo pelo fato de tal branch está muito desatualizado, ou ainda possuir mudanças que não podem ser enviadas para A, por algum motivo especial.

Você poderia simplesmente fazer um `git checkout B`, copiar os dados de `b.txt` e `c.txt` e, ao retornar para o branch A, colar os dados...
Bem, isso não parece elegante...

## Copiando arquivo de outro branch para o branch atual

Ainda pensando no cenário anterior, supondo que você deseja copiar os arquivos `b.txt` e `c.txt` para o branch atual (que é o branch A) e estes arquivos estejam dentro da pasta `arquivos`, você pode fazer isso de duas formas no GIT:


### GIT RESTORE
Esse comando tem como finalidade restaurar arquivos da árvore de trabalho, conforme a [documentação do GIT](https://git-scm.com/docs/git-restore).

Use o comando `git restore` com a opção `-s` ou `--source` e especifique os arquivos que deseja copiar. 

Veja:

```bash
 git restore --source B arquivos/b.txt arquivos/c.txt
```

ou:

```bash
 git restore -s B arquivos/b.txt arquivos/c.txt
```
### GIT CHECKOUT

Sim, o `git checkout` também pode ser usado para copiar um arquivo de um branch para o outro. Você só vai precisar passar alguns argumentos a mais para obter os arquivos.

Veja:


```bash
git checkout B -- arquivos/b.txt arquivos/c.txt
```


**Observação**: Nos dois exemplos, os arquivos selecionados serão copiados e definidos como modificado no branch atual. Importante observar que os mesmos serão adicionados como `staged` (como se tivesse executado `git add` neles).