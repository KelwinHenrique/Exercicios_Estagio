$(document).ready(function () {
    var xmlHttp = new XMLHttpRequest();//elemento para fazer a requisição
    xmlHttp.open("GET", "https://reqres.in/api/users?page=1", false);//
    xmlHttp.send(null);

    var Data = JSON.parse(xmlHttp.responseText);

    var users_iniciais = getUsers(1);//pega os usuarios da primeira pagina para preencher a tabela
    var userTable = criarTabela($("#tabela"), users_iniciais);
    var botoes = criarBotoes($("#botoes"), Data["total_pages"]);


    $('.btn').click(function (e) {
        e.preventDefault();     //prevenir novos clicks
        var users = getUsers(e["currentTarget"]["id"]);//pega os usuarios da pagina referente ao numero do id do botão
        var userTable = criarTabela($("#tabela"), users);
    });
});

function getUsers(pagina) {
    var xmlHttp = new XMLHttpRequest();//elemento para fazer a requisição
    xmlHttp.open("GET", "https://reqres.in/api/users?page="+pagina, false);//abre a conexão com o método get para a url especificada
    xmlHttp.send(null);

    var Data = JSON.parse(xmlHttp.responseText);//Transformo o arquivo que o método get retornou em um JSON

    var users = Array();
    users[0] = ["ID", "FIRST NAME", "LAST NAME", "AVATAR"];//cABEÇALHO
    for (var i = 0; i < Data["data"].length; i++) {//Pegando os elementos de cada user
        var auxiliar = Array();
        auxiliar[0] = Data["data"][i]["id"];
        auxiliar[1] = Data["data"][i]["first_name"];
        auxiliar[2] = Data["data"][i]["last_name"];
        auxiliar[3] = Data["data"][i]["avatar"];
        users[i + 1] = auxiliar;
    }
    return users;
}


function criarTabela(container, data) {
    container.empty();
    var table = $('<table border="1" width="50%">');//criando uma tabela.
    $.each(data, function (rowIndex, r) {//percorre os elementos de data, sendo rowIndex o indice atual do elemento e r o elementos em si(a linha)
        var row = $("<tr/>");//Criando uma linha
        $.each(r, function (colIndex, c) {//percorre os elementos da linha(r), sendo colIndex o indice atual do elemento e c o elemento em si(coluna)
            if(colIndex<3 || rowIndex==0) row.append($("<t" + (rowIndex == 0 ? "h" : "d") + "/>").text(c));//se for a linha 0 coloca o elemento com cabeçalho
            else row.append($('<td align="center" valign="middle"><img src="'+c+'" height="100" ></td>'));
            
        });
        table.append(row);//adiciona a linha na tabela
    });
    return container.append(table);
}

function criarBotoes(container, total_botoes) {
    var div_botoes = $("<div/>");
    for (var i = 0; i < total_botoes; i++) {//Cria um botão para chamar cada página
        div_botoes.append('<button class="btn" id="' + (i + 1) + '">' + (i + 1) + '</button>');//Cria um botão com uma classe padrão(btn) com um id específico referente a cada pagina
    }
    return container.append(div_botoes);
}

/*REFERÊNCIAS
Função each do JQuery: https://medium.com/weyes/usando-a-fun%C3%A7%C3%A3o-each-do-jquery-9a037c81670
Criar tabelas: https://www.htmlgoodies.com/beyond/css/working_w_tables_using_jquery.html
Método get: https://stackoverflow.com/questions/247483/http-get-request-in-javascript
*/
