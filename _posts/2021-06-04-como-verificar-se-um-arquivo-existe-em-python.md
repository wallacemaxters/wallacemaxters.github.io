---
layout: post
last_modified_at: 
color: "#222222"
title: Como verificar se um arquivo ou diretório existe em Python?
image: "/uploads/covers/python.svg"
date: 2021-06-04 13:12:00 +0000
excerpt: Como descobrir se um determinado caminho existe? Como saber se é um arquivo
  ou não? Descubra neste tutorial!
categories:
- arquivos
- python
sitemap: true

---
## Verificando se um arquivo ou diretório existe

Você pode utilizar a função `os.path.exists` para saber se determinado diretório ou arquivo existe.

Veja:

```python
import os
filename = '/home/user/arquivos.txt'
os.path.exists(filename)
```

Quando você utiliza `os.path.exists`, não é possível saber se o objeto verificado é um arquivo ou um diretório.

Por isso, você pode tentar outra opção...

## Verificando se um arquivo existe

Além de verificar se determinado caminho existe, você também pode querer validar se o mesmo é um arquivo. 

Para isso, você pode utilizar a função `os.path.isfile`. Ela Retorna `True` caso o caminho exista e o mesmo seja um arquivo.

```python
import os
filename = '/home/user/arquivos.txt'
if os.path.isfile(filename):
	print('O caminho {} existe'.format(filename))
```
