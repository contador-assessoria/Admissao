# Admissao

Esta página HTML coleta dados de admissão de empregados. Abra `index.html` em um navegador para preencher o formulário.

Após o envio, os dados são enviados para um script do Google Apps Script definido em `script.js`. Certifique-se de ter acesso à internet para que o envio funcione.

### Como usar
1. Clone o repositório ou faça o download dos arquivos.
2. Abra `index.html` em um navegador moderno.
3. Preencha os campos obrigatórios e opcionais.
4. Utilize o pequeno checkbox no canto superior esquerdo caso deseje preencher o formulário com dados de exemplo.
5. É possível replicar o horário da segunda-feira para os demais dias com o botão **Replicar horários da segunda**.
6. Clique em **Enviar Formulário** para enviar as informações.

O código CSS está em `style.css` e a lógica JavaScript em `script.js`. O script também utiliza APIs públicas para preencher dados a partir do CNPJ e CEP informados.
