---
layout: post
title: Como mover arquivos para outros diretórios no Sublime Text?
date: 2019-03-12 23:41:13 +0000
categories:
- sublime-text
sitemap: true
image: "/uploads/covers/sublime-text-com-logo.jpg"

---
Ao contrário do VS Code, o Sublime Text não tem uma opção "padrão" para mover os arquivos. Bem, pelo menos não com a opção de "arrastar e soltar", mas existe uma solução para isso!

Suponhamos que você tenha a seguinte estruruta no seu projeto:

    css/
       default.css
    img/
       logo.png
    js/
    	app.js
    app.css

Tomando como exemplo, no caso acima, para mover o `app.css` para dentro da pasta `css`, você teria que fazer o seguinte:

* clicar com o botão direito sobre esse arquivo
* selecionar a opção "rename".
* Após isso, basta colocar o nome da pasta antes do nome do arquivo. Exemplo: `css/app.css`

Após fazer isso, o arquivo será movido.

Veja:

![Sublime text movendo arquivos](/uploads/sublime-text-mover-arquivo.gif)

A mesma regra se aplica para mover para fora da pasta. Você poderia usar `../app.css` caso quisesse, por exemplo, tirar o `app.css` dentro da pasta `css` e movê-lo para raiz.