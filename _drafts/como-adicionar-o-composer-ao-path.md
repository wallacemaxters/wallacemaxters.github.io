O comando `composer global require` tem como finalidade instalar os [vendor binaries](https://getcomposer.org/doc/articles/vendor-binaries.md). Podemos usar esse comando para instalar algum utilitário da linha de comando, para auxiliar na produtividade. 

Porém, as vezes, a execução dos mesmos pode falhar. Por exemplo, ao tentar rodar o comando `laravel`, que é fornecido por `composer global require laravel/installer`, você pode receber o seguinte erro:

```text
laravel: comando não encontrado
```

## O que causa o problema?
  
Quando você digita um comando na linha de comando, basicamente o shell tentará rodar um executável com o nome fornecido. O Shell procura por esses executáveis em todas as pastas que estão definidas na variável `$PATH`. A variável `$PATH` possui algumas pastas, como `/usr/local/bin` ou `/usr/bin`, definidas por padrão. Elas estão separadas por `:`.

Sendo assim, se você deseja tornar os executáveis instalados via `composer global require` disponíveis no seu Terminal, você precisa adicionar o diretório onde o Composer instala os executáveis na variável `$PATH`.

## Onde o Composer armazena os executáveis quando usamos "composer global require"?

Para descobrir o local onde o Composer instala os executáveis ([vendor binaries](https://getcomposer.org/doc/articles/vendor-binaries.md)), basta rodar o comando abaixo:

```bash
composer global config bin-dir --absolute --quiet
```

Esse comando vai retornar o caminho absoluto onde os *vendor binaries* são armazenados. 
O retorno poderá ser com isso:

```text
/home/seu_usuario/.config/composer/vendor/bin
```

## Adicionando o Composer ao $PATH

Edite o arquivo chamado `.bashrc`. Ele fica dentro da pasta `/home/seu_usuario`, mas pode ser acessado adicionando apenas o `~` antes.

Assim:

```bash
nano ~/.bashrc
```

Adicione ao final a seguinte linha:

```bash
export PATH=$PATH:/home/seu_usuario/.config/composer/vendor/bin
```

Ou, se preferir:

```bash
export PATH=$PATH:~/.config/composer/vendor/bin
```

Após fazer isso, basta apenas rodar o comando `source ~/.bashrc` e conferir se os executáveis estão disponíveis no terminal.