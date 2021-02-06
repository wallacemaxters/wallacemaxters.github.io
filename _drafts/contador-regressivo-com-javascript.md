---
layout: post
title: Contador regressivo com JAvascript
date: 2021-02-06 01:00:00 -0200
categories:
- javascript
sitemap: true
image: ''
excerpt: ''

---
```html
<head>
	<title>Counter</title>
	<style type="text/css">
		#contador {
			width: 100px;
			height: 100px;
			box-sizing: border-box;
			background-color: #f1f1f1;
			color: blue;
			display: flex;
			align-items: center;
			justify-content: center;
			font-family: sans-serif;
			font-size: 50px;
			font-weight: bold;
			border-radius: 50%;
			border: 5px solid currentColor;
			margin-bottom: 5px;
		}
	</style>
	<script type="text/javascript">
		function contador(inicial, callback) {

			clearTimeout(contador.timeout);

			(function rodar() {
				inicial >= 0 && callback(inicial--);	
				contador.timeout = setTimeout(rodar, 1000);
			})()

		}

		document.addEventListener('DOMContentLoaded', function () {

			var el = document.querySelector('#contador');

			document.querySelector('#iniciar-contador').addEventListener('click', function () {
				contador(59, function (valor) {
					el.innerText = valor; 
				})
			})
		})
	</script>
</head>
<body>
	<div id="contador">-</div>
	<button id="iniciar-contador">Iniciar Contador</button>
</body>
```

<!-- Código contador --->


	
	<script type="text/javascript">
		function contador(inicial, callback) {

			clearTimeout(contador.timeout);

			(function rodar() {
				inicial >= 0 && callback(inicial--);	
				contador.timeout = setTimeout(rodar, 1000);
			})()

		}

		document.addEventListener('DOMContentLoaded', function () {

			var el = document.querySelector('#contador');

			document.querySelector('#iniciar-contador').addEventListener('click', function () {
				contador(59, function (valor) {
					el.innerText = valor; 
				})
			})
		})
	</script>

	<div id="contador">-</div>
	<button id="iniciar-contador">Iniciar Contador</button>