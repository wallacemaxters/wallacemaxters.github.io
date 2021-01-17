---
layout: post
title: 'Pt-Br-Validator: Uma biblioteca para adicionar validações em português no
  Laravel'
date: 2021-01-17 11:46:00 -0200
categories:
- laravel
sitemap: true
image: "/uploads/Laravel.jpg"
excerpt: 'O Pt-Br-Validator é uma biblioteca criada por Wallace Maxters para adicionar
  validações em português em Laravel. Aprenda como utilizá-la neste tutorial. '

---
Volta e meia me deparava com situações onde eu precisava validar alguns "dados brasileiros" nas minhas aplicações escritas no framework Laravel. Constantemente, precisava validar o formato do telefone, ou se em CPF ou CNPJ era válido. E é comum nesses casos você querer criar um [Validator](https://laravel.com/docs/8.x/validation) personalizado para fazer isso.

Foi pensando nisso que, há alguns anos, eu criei a biblioteca chamada [LaravelLegends/PT-BR-Validator](https://github.com/LaravelLegends/pt-br-validator).

## Instalando a biblioteca Pt-Br-Validator

A instalação é bem simples. Você só precisa rodar o composer.

```bash
composer require laravellegends/pt-br-validator
```

### Service Provider

Essa biblioteca tem um *Service Provider* chamado de `LaravelLegends\\PtBrValidator\\ValidatorProvider`. Se você estiver utilizar a versão do Laravel maior que 5.5, não precisa se preocupar em adicioná-lo ao `config/app.php`. Porém, se for necessário, você pode simplesmente adicioná-lo como último elemento em `providers`.

```php
'providers' => [
    // outros Services Providers
    LaravelLegends\\PtBrValidator\\ValidatorProvider::class
]
```

## Validando com Pt-Br-Validation

Agora que a instalação foi feita, você pode simplesmente validar seus dados, adicionando as regras a chamada de seu validator.

Exemplo:

```php
class UsuariosController extends Controller
{
     public function store(Request $request)
     {
     	$dados = $request->validate(
        	'cpf' => 'required|cpf|formato_cpf'
        );
     }
}
```

No exemplo acima, quando você tentar cadastrar um usuário, as validações `cpf` e `formato_cpf` serão chamadas.