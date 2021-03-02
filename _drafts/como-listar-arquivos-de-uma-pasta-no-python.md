---
layout: post
color: "#222222"
title: Como listar arquivos de uma pasta no Python?
date: 2021-03-02 13:31:00 -0300
categories:
- python
sitemap: true
image: "/uploads/covers/python.svg"
excerpt: Neste tutorial, aprenda como listar arquivos de uma pasta recursivamente
  através do  Python.

---
Para listar os arquivos de um diretório/pasta no Python, basta utilizamos a função `os.walk`.

Suponhamos que temos a seguinte estrutura de diretório

```text
pasta
    1/
        file.txt
        2a/
            file.txt
        2/
            file_2.txt
            file_3.txt
            file.txt
            3/
                file.txt
```

Basta apenas usar o seguinte código:

```python
import os
pasta = './pasta'
for diretorio, subpastas, arquivos in os.walk(pasta):
	for arquivo in arquivos:
    	print(os.path.join(diretorio, arquivo))
```

O resultado será parecido com isso

```text
./pasta/1/file.txt
./pasta/1/2a/file.txt
./pasta/1/2/file_2.txt
./pasta/1/2/file_3.txt
./pasta/1/2/file.txt
./pasta/1/2/3/file.txt
```

Caso deseje retornar o caminho completo, você pode utilizar `os.path.realpath`. Essa função retorna o nome completo do diretório, ao invés de utilizar o caminho relativo ( caminho com `.` ou `..`).

```python
import os
pasta = './pasta'
for diretorio, subpastas, arquivos in os.walk(pasta):
	for arquivo in arquivos:
    	print(os.path.join(os.path.realpath(diretorio), arquivo))
```

## O que faz a função os.walk?

Resumidamente, `os.walk` retorna os nomes dos arquivos em uma árvore de diretórios. Em cada item da iteração, existe uma tupla com três elementos (`dirpath`, `dirnames`, `filenames`).

* `dirpath` é uma string, o caminho para o diretório.
* `dirnames` é uma lista dos nomes dos subdiretórios em dirpath (excluindo '.'e '..').
* `filenames` é uma lista dos nomes dos arquivos.

Para mais informações, você pode consultar a [documentação do Python](https://docs.python.org/3/library/os.html#os.walk).