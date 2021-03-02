---
layout: post
color: "#222222"
title: Como criar um arquivo JSON com PHP?
date: 2021-03-02 00:00:00 -0300
categories: []
sitemap: false
image: ''
excerpt: ''

---
```php
$dados = [
	'nome' => 'Wallace',
    'linguagens' => [
    	'PHP',
        'Javascript',
        'Python',
        'C#'
    ]
];

file_put_contents('arquivo.json', json_encode($dados));
```