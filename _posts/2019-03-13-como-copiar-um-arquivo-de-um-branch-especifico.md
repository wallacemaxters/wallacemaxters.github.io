---
layout: post
date: 2019-03-13 23:36:58 +0000
title: Como copiar um arquivo de um branch específico
categories:
- Git
sitemap: true
image: "/uploads/covers/git.jpg"

---
Já aconteceu de eu precisar de um arquivo apenas que estava em outro branch, não sendo viável fazer o checkout no branch inteiro ou fazer um merge para trazer aquele arquivo.

Aprendi que é possível você trazer apenas um arquivo específico!

```bash
git checkout branch-desejado -- caminho/para/o/arquivo/no/branch
```

O arquivo será copiado e será definido como modificado no branch atual.