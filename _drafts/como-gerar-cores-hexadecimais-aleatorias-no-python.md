---
layout: post
last_modified_at: 
color: "#222222"
title: Como gerar cores hexadecimais aleatórias no Python?
image: "/uploads/covers/python.png"
date: 2021-05-25 00:31:22 +0000
excerpt: ''
categories:
- cores
- python
sitemap: false

---
```python
from random import random
hex = '#%06X' % round(random() * 0xffffff)
print(hex)
```
Ou:

```python
from random import random
hex = '#{:06X}'.format(round(random() * 0xffffff))
print(hex)
```

Sendo assim, poderíamos criar uma função:

```python
from random import random

def random_hex_color(end = 0xffffff):
    return '#%06X' % round(random() * end)

random_hex_color() # '#B52D1B'
random_hex_color() # '#85D257' 
``` 

## Explicando o código
A lógica é bem parecida com [a geração de cores aleatórias pelo PHP]({%link _posts/2021-02-03-como-gerar-cores-aleatorias-com-php.md %}).

A função `random.random` gerará um número aleatório `float` de 0 a 1. Multiplicamos o resultado por `0xffffff`, que é uma notação hexadecimal, representando o valor máximo de uma cor hexadecimal. A função `round` garante que o valor sempre será um `int`. 

Em seguida, utilizamos a string `#%06X` ou `#{:06X}` para formatar o número para hexadecimal, preenchendo sempre com até 6 zeros a esquerda, para que não forme uma cor hexadecimal inválida. 
