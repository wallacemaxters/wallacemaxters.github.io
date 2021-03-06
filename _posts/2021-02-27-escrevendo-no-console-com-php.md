---
layout: post
color: "#79D4C0"
title: Escrevendo no console do navegador com PHP
date: 2021-02-27T14:50:00.000+00:00
categories:
- PHP
- javascript
sitemap: true
image: "/uploads/php_console_log.png"
excerpt: Seria possível fazer debug ou enviar uma saída do PHP para o console do navegador?
  Veja os truques e as possibilidades de fazer isso neste tutorial!

---
No Javascript, podemos usar o `console.log` para enviar alguma informação para a ferramenta de desenvolvedor do seu navegador web.

Seria possível enviar uma saída do PHP diretamente para lá?

Bem, diretamente pelo PHP, não tem como, mas há um truque simples que pode ser feito.

## Enviando uma saída do PHP para o Console do Navegador

Podemos utilizar o PHP para escrever no Console através do Javascript.

Exemplo:

```php
echo '<script>console.log("teste")</script>';
```

Isso exibirá`"teste"` no console do navegador.

### Enviando JSON para o console do navegador através do PHP

Vamos fazer algo mais elaborado agora. Que tal uma função que envie os dados que você deseja examinar em formato JSON?

Exemplo:

```php
function console_log($dados)
{
	printf('<script>console.log(%s);</script>', json_encode($dados));
}
```

A função acima utiliza apenas `printf` e `json_encode`.
A função `printf` imprime uma string formatada, onde `%s` representa o argumento que será inserido na string, de acordo com o formato. Já a função `json_encode` tem como finalidade serializar os dados PHP para JSON.

Ao chamarmos essa função, ela produzirá uma saída parecida com isso:

```php
console_log(array('nome' => 'Wallace'))
```

Saída:

```html
<script>console.log({"nome": "Maxters"});</script>
```

Console:
<img alt="Enviando uma saída PHP para o Console do Javascript" title="Enviando uma saída PHP para o Console do Javascript" src="/uploads/console-log-json_encode.png" loading="lazy" width="100%">


### Enviando o var_dump para o console do navegador

Apesar do exemplo anterior ser útil, ele possui limitações, já que alguns dados do PHP podem não ser serializados corretamente pela função `json_encode`, o que atrapalharia a exibição correta dos dados que você deseja analisar.

O ideal seria usar a função `var_dump`. Ela é muito útil para visualizar as informações de uma variável e seria interessante se conseguíssemos enviá-la ao console. Porém, diferentemente da função  `json_encode`, que usamos anteriormente, ela não retorna valor. Ao invés disso, ela exibe a saída.

Mas, ainda assim, é possível contornar isso. Basta combinarmos o uso de `ob_start` e `ob_get_clean` para capturar o conteúdo exibido por `var_dump`.

Código:
```php
function console_log($data)
{
    ob_start();
    var_dump($data);
    $output = ob_get_clean();
    printf('<script>console.log(%s);</script>', json_encode($output));
}

console_log(['name' => 'Wallace Maxters']);
```

O resultado será:

```html
<script>console.log("array(1) {\n  [\"name\"]=>\n  string(15) \"Wallace Maxters\"\n}\n");</script>
```

Console:
<img alt="Enviando uma saída PHP para o Console do Javascript" title="Enviando uma saída PHP para o Console do Javascript" src="/uploads/consolelog-var_dump.png" loading="lazy" width="100%">