---
layout: post
title: 'Pt-Br-Validator:  adicionando validações em português no Laravel'
date: 2021-01-17 11:46:00 -0200
categories:
- laravel
sitemap: true
image: "/uploads/Laravel.jpg"
excerpt: 'O Pt-Br-Validator é uma biblioteca criada por Wallace Maxters para adicionar
  validações em português em Laravel. Aprenda como utilizá-la neste tutorial. '

---
## A minha história...

Volta e meia me deparava com situações onde eu precisava validar alguns "dados brasileiros" nas minhas aplicações escritas no framework Laravel. Constantemente, precisava validar o formato do telefone, ou se em CPF ou CNPJ era válido. E é comum nesses casos você querer criar um [Validator](https://laravel.com/docs/8.x/validation) personalizado para fazer isso. Porém,  eu notei que estava ficando cansativo ter que adicionar as mesmas adições de validações repetidamente nessas aplicações.

Foi pensando nisso que, há alguns anos, eu criei a biblioteca chamada [LaravelLegends/PT-BR-Validator](https://github.com/LaravelLegends/pt-br-validator). Comecei a desenvolver ela quando eu utilizava o Laravel 4 ainda.  Depois de um tempo, outros desenvolvedores começaram a utilizar a mesma, solicitando a adição de novas versões do Laravel. Com o tempo, também foram surgindo várias contribuições, para melhoria da mesma, seja através de issues ou de _pull request_.

## Instalando a biblioteca Pt-Br-Validator

A instalação é bem simples. Você só precisa rodar o composer.

```bash
composer require laravellegends/pt-br-validator
```

### Service Provider

Essa biblioteca tem um _Service Provider_ chamado de `LaravelLegends\PtBrValidator\ValidatorProvider`. Se você estiver utilizar a versão do Laravel maior que 5.5, não precisa se preocupar em adicioná-lo ao `config/app.php`. Porém, se for necessário, você pode simplesmente adicioná-lo como último elemento em `providers`.

```php
'providers' => [
    // outros Services Providers
    LaravelLegends\PtBrValidator\ValidatorProvider::class
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

### Validações disponíveis

Com essa biblioteca,  é possível validar os seguintes dados.

#### CPF e Formato de CPF

Você pode usar `cpf` e `formato_cpf` para validar um CPF.
O `cpf` adiciona validação para saber se o CPF contém ou não um valor válido. Para testar sua aplicação, você pode utilizar o [Gerador de CPF](https://www.geradordecpf.org/).
O `formato_cpf`, por sua vez, validará se o seu CPF contém a máscara `000.000.000-00`  utilizada em CPF.

#### CNPJ e Formato de CNPJ

A mesma regra do CPF. Você pode usar `cnpj` ou `formato_cnpj` para validar um determinado campo.

#### PIS e Formato de PIS

Você pode usar `pis` para validar se um número de PIS (Programa de Integração Social) é válido. Já o `formato_pis` valida se o formato do valor enviado corresponde a `000.00000.00-0`.

#### Telefone e Celulares

Esses validadores permitem checar o formato de telefones e celulares.
As validações de celulares consideram o nono dígito opcional. Sendo assim, `celular` pode conter `99999-9999` ou `9999-9999`.

O mesmo vale para as regras `celular_com_ddd` e `celular_com_codigo`. O primeiro valida se o campo possui o valor `(99)9999-9999` ou `(99)99999-9999`. O segundo valida se possui o DDD e o código do país `+99(99)99999-9999`.

As validações `telefone`, `telefone_com_ddd` e `telefone_com_codigo` seguem a mesma regra do celular, exceto que esta não tem o nono dígito opcional. Sendo assim, os valores válidados para telefone são `3333-3333`, `(31)3333-3333` e `+55(31)3333-3333` respectivamente.

#### Placa de veículos

`formato_placa_de_veiculo` valida se a placa de um veículo está na formatação correta. O formato antigo e o formato mercosul são considerados. Exemplificando, `ABC-1234` ou `ABC1B34`.

## Conclusão

Se você quiser conhecer mais sobre a biblioteca LaravelLegends/Pt-Br-Validator, você pode acessar a [página do Github](https://github.com/LaravelLegends/pt-br-validator).

> Se tiver alguma sugestão, melhoria ou correção de bug, faça o fork e envie um pull request.