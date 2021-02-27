---
layout: post
color: "#222222"
title: Escrevendo no console do navegador com PHP
date: 2021-02-27 03:00:00 +0000
categories:
- php
- javascript
sitemap: false
image: "/uploads/php_console_log.png"
excerpt: Veja esse truque do PHP para escrever uma saída no console navegador!

---
No Javascript, podemos usar o `console.log` para enviar alguma informação para a ferramenta de desenvolvedor do seu navegador web.

Seria possível enviar uma saída do PHP diretamente para lá?

Bem,  diretamente pelo PHP, não tem como, mas há um truque simples que pode ser feito.

## Enviando uma saída do PHP para o Console do Navegador

Podemos utilizar o PHP para escrever no Console através do Javascript.

Exemplo:

```php
echo '<script>console.log("teste")</script>';
```

Isso imprimirá `1` no console do navegador.

### Enviando JSON para o console através do PHP

Vamos fazer algo mais elaborado agora. Que tal uma função que envie os dados que você deseja depurar em formato JSON?

Exemplo:

```php
function console_log($dados)
{
	printf('<script>console.log(%s);</script>', json_encode($dados));
}
```

A função acima utiliza apenas `printf` e `json_encode`. A função `printf` imprime uma string formatada, onde `%s` representa o argumento que será inserido na string, de acordo com o formato. Já a função jsonencode tem como finalidade serializar os dados PHP para JSON.

Ao chamarmos essa função, ela produzirá uma saída parecida com isso:

```php
console_log(array('nome' => 'Wallace'))
```

Saída:

```html
<script>console.log({"nome": "Maxters"});</script>
```

### Enviando o var_dump para o console

A função `var_dump` é muito útil para visualizar as informações de uma variável. O problema dessa função é que, diferente de `json_encode`, ela não retorna valor. Ela exibe a saída ao invés disso.

Mas ainda sim é possível driblar isso. Podemos fazer a mesma coisa que fizemos acima, porém utilizando `ob_start` e `ob_get_clean` para capturar o conteúdo exibido por `var_dump`.

```php