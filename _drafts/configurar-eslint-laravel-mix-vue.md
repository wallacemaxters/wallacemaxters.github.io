---
layout: post
last_modified_at: 2021-04-30T22:59:44.000-03:00
color: "#222222"
title: Como configurar o ESLint no Laravel Mix?
image: "/uploads/laravel_mix_vue_eslint.png"
date: 2021-05-21T09:22:00.000-03:00
excerpt: Nesse tutorial, vamos aprender a configurar o ESLint no Laravel Mix para
  garantir padrões de formatação e codificação em projetos que utilizam o Vue.js.
categories:
- laravel
- vue
sitemap: true

---
Nesse tutorial, vamos aprender a configurar o ESLint no Laravel Mix para garantir padrões de formatação e codificação em projetos que utilizam o Vue.js.

Para a elaboração do tutorial, preferi utilizar o `yarn` com a versão do Laravel Mix `6.0`


## Instalando e configurando o ESLint

Em primeiro lugar, você deve adicionar ESLint como dependência do seu projeto.

```bash
yarn add eslint -D
```


Em seguida, para que o ESlint funcione com seus arquivos `.vue`, é necessário instalar o [eslint-plugin-vue](https://github.com/vuejs/eslint-plugin-vue).



```bash
yarn add eslint-plugin-vue  -D
```

## Criando a configuração do ESLint

Agora que já instalamos as dependências principais, você deve definir um arquivo de configuração. Ao executar `yarn eslint`, você poderá selecionar o estilo de codificação padrão do ESLint, mas também é possível configurar cada item de acordo com suas preferências.

Para criar o arquivo de configuração, execute o comando abaixo:

```bash
yarn eslint --init
```

Quando você executar o comando acima, será gerado um arquivo chamado `.eslintrc.js`. 

No teste que realizei, a saída do arquivo foi a seguinte:

```javascript
module.exports = {
    'env': {
        'browser': true,
        'es2021': true
    },
    'extends': [
        'eslint:recommended',
        'plugin:vue/essential'
    ],
    'parserOptions': {
        'ecmaVersion': 12,
        'sourceType': 'module'
    },
    'plugins': [
        'vue'
    ],
    'rules': {
        'indent': [
            'error',
            4
        ],
        'linebreak-style': [
            'error',
            'unix'
        ],
        'quotes': [
            'error',
            'single'
        ],
        'semi': [
            'error',
            'always'
        ]
    }
};
```

## Executando o ESLint no seu projeto

Você pode executar o linter diretamente da sua linha de comando, para verificar todos os arquivos `.js` e `.vue` presentes no seu diretório.

Supondo que os seus arquivos do Laravel Mix estejam na pasta `resources/js`, bastaria executar os seguintes comandos:

Para Javascript:

```bash
yarn eslint resources/js/**/*.js
```

Para Vue:

```bash
yarn eslint resources/js/**/*.vue
```

### Executando correções automáticas de estilo e codificação

Se você deseja executar as correções automáticas para problemas comuns de estilo de codificação, você pode simplesmente utilizar o argumento `--fix`. Isso faz com que seus arquivos sejam modificados com as correções feita pelo próprio ESLint.

Exemplo:

```bash
yarn eslint resources/js/**/*.vue --fix
```

<hr>

{% include ads_article.html %}

## Integrando o ESLint com Laravel Mix

Para integrar o ESLint de fato com o Laravel Mix, precisamos adicionar a dependência `eslint-loader` e adicionar uma configuração para o mesmo em `webpack.mix.js`. O `eslinter-load` será executado sempre que você salvar um arquivo durante a execução do comando `npm run watch` ou `yarn watch`.

Primeiro, instale o `eslint-loader`:

```bash
yarn add eslint-loader -D
```

Em seguida, adicione as seguintes linhas ao seu `webpack.mix.js`:

```javascript
mix.webpackConfig({
  module: {
    rules: [
      {
        enforce: 'pre',
        test: /\.(js|vue)$/,
        loader: 'eslint-loader',
        exclude: /node_modules/
      }
    ]
  }
})
```

Feito isso, agora basta utilizar o comando `yarn watch` no seu projeto, para ver a mágica do ESLint funcionar!