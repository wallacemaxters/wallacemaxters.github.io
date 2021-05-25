---
layout: post
last_modified_at: 
color: "#222222"
title: Como gerar cores hexadecimais aleatórias no Python?
image: ''
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