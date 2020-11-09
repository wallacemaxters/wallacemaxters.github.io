---
layout: post
title: Validar se uma hora é válida pelo PHP
date: 2020-11-09 01:00:00 -0200
categories: []
sitemap: false
image: ''
excerpt: ''

---
```php
function validate_hour($input) 
{
    $format = 'H:i';

    $date = date_create_from_format('!'. $formato, $input);

    return $date && $date->format($format) === $input;
}
```


```php
function validate_hour($input)
{
    return date('H:i', strtotime($input)) == $input;
}
```