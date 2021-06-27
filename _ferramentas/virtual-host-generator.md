---
layout: tools
image: /uploads/covers/apache.png
sitemap: true
title: Apache VirtualHost Generator
excerpt: 'Ferramenta online para geração de virtual host para apache'
---


<div class="columns is-multiline">
    <div class="column is-12-mobile is-9-desktop">
        <form id="form-apache">
            <label class="label">
                ServerName*
                <input type="text" name="ServerName" class="input" placeholder="hostname.com" required>
            </label>
            <label class="label">
                DocumentRoot* 
                <input type="text" name="DocumentRoot" class="input" placeholder="/var/www/hostname.com" required>
            </label>
            <label class="label">
                ErrorLog
                <input type="text" name="ErrorLog" class="input" placeholder="/var/www/hostname.com/apache.log">
            </label>
        </form>
        <div class="mt-5">
            <textarea id="textarea-virtualhost" class='textarea' readonly placeholder="Ao preencher o conteúdo acima, o código será gerado aqui..."></textarea>
        </div>
    </div>
    <div class="column is-12-mobile is-3-desktop">
        {% include ads_common.html %}
    </div>
</div>



<script>
    function template(options) {

        const tpl = Object.keys(options).map(key => {
            return options[key] ? `    ${key} ${options[key]}` : ''
        }).join('\n');

        return `<VirtualHost *:80>\n${tpl}\n</VirtualHost>`;
    }

    document.querySelector('#form-apache').addEventListener('input', function () {
        const options = Object.fromEntries(new FormData(this));

        document.querySelector('#textarea-virtualhost').value = template(options); 
    })
</script>


