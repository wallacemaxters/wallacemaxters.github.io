---
layout: post
title: Como criar uma biblioteca para distribuição via Composer?
date: 2019-03-18 03:00:00 +0000
categories:
- PHP
- Composer
sitemap: false

---
composer init

composer dump


```json
{
  "name" : "wallacemaxters/test"
  "autoload" : {
  	    "psr-4" : {
  			"src" : "WallaceMaxters\\Test\\",
		}
	}
}
```