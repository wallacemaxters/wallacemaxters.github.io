---
layout: post
last_modified_at: 
color: "#222222"
title: Como verificar se um arquivo ou diretório existe em Python?
image: "/uploads/covers/python.svg"
date: 2021-06-04 13:12:00 +0000
excerpt: ''
categories:
- python
sitemap: false

---

## Verificando se um arquivo ou diretório existe

Você pode utilizar a função `os.path.exists` para saber se determinado diretório ou arquivo existe.

Veja:

```python
import os
filename = '/home/user/arquivos.txt'
os.path.exists(filename)
```

>**NOTA**: Quando você utiliza `os.path.exists`, não é possível saber se o objeto verificado é um arquivo ou um diretório.


## Verificando se um arquivo existe

Você pode utilizar a função `os.path.isfile`. Ela Retorna `True` caso o caminho exista e o mesmo seja um arquivo. 

```python
import os
filename = '/home/user/arquivos.txt'
if os.path.isfile(filename):
	print('O caminho {} existe'.format(filename))
```