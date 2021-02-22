---
layout: post
title: Como verificar se o ano é bissexto em Python?
date: 2021-02-17T09:45:00.000-02:00
categories:
- python
sitemap: true
image: "/uploads/covers/python.png"
excerpt: Para verificar se um ano é bissexto em Python, basta importar calendar. Ele
  possuí uma função chamada isleap, que retorna True se o ano for bissexto.
color: "#ACF6E4"

---
Para verificar se um ano é bissexto em Python, basta importar o módulo `calendar`. Ele possuí uma função chamada `isleap`, que retorna `True` se o ano for bissexto.

Código:

```python
from calendar import isleap

ano = 2021

if isleap(ano):
    print('É bissexto')
else:
    print('Não é bissexto')
```