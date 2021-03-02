---
layout: post
color: "#222222"
title: Como listar arquivos de uma pasta no Python?
date: 2021-03-02 13:31:00 -0300
categories:
- python
sitemap: false
image: ''
excerpt: ''

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

Basta apenas fazer o seguinte:

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