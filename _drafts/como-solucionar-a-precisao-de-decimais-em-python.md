---
layout: post
title: Como solucionar a precisão de decimais em Python
image: '/uploads/covers/python.svg'
date: 2021-05-19 13:49:00 -0300
excerpt: Aprenda a solucionar o problema da precisão ao realizar operações aritiméticas com números decimais (float) em Python.
categories:
- python
- matemática
sitemap: true

---

É comum o programador que está iniciando em Python ter problemas ao realizar operações aritiméticas entre números decimais. 

Por exemplo, ao somar `0.1` com `0.2`, esperamos o resultado como `0.3`, porém não é o que ocorre.

Veja:

```python
resultado = 0.1 + 0.2
print(resultado) # 0.30000000000000004
``` 

Podemos ver o mesmo problema em operações de subtração:

```python
resultado = 0.3 - 0.1
print(resultado) # 0.19999999999999998
```


Isso não ocorre especificamente por culpa do Python. Em outras linguagens de programação o mesmo pode ocorrer. Na verdade, o problema ocorre por causa da forma que os computadores representam um [número em ponto flutuante](https://pt.wikipedia.org/wiki/V%C3%ADrgula_flutuante).

Mas, felizmente, existe uma solução para isso em Python!

## Resolvendo o problema da precisão de números decimais

Para resolver isso, podemos simplesmente utilizar o módulo `decimal`. 

De acordo com a [documentação do módulo decimal](https://docs.python.org/3/library/decimal.html), podemos ler o seguinte (tradução livre):

> O módulo `decimal` fornece suporte para aritmética de numeros decimais corretamente arredondados. Ele oferece várias vantagens sobre o tipo `float`.

Exemplo:

```python
from decimal import Decimal

soma = Decimal('0.1') + Decimal('0.2')
print(soma) # 0.3
```


<cite>**Nota**: É importante observar que os números decimais informados em `Decimal` devem ser sempre uma `str` com a representação do número. Se utilizassemos `0.1`, que é um valor `float` nativo, ao invés de `'0.1'`, o resultado do cálculo seria diferente do esperado.</cite>