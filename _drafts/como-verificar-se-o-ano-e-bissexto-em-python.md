---
layout: post
title: Como verificar se o ano é bissexto em Python?
date: 2021-02-17 09:45:00 -0200
categories:
- python
sitemap: true
image: "/uploads/python-ano-verificar-bissexto.jpeg"
excerpt: ''

---
```python
import calendar

ano = 2021
if calendar.isleap(ano):
	print('É bissexto')
else:
	print('Não é bissexto')
```