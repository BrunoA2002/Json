

$(document).ready(function(){

    $.ajax({
        type: 'GET' ,
        contentType: 'application/json' ,
        url: 'https://gilsonpolito-api.herokuapp.com/alunos' ,
        dataType: 'json' ,
        success: function(data, textStatus, jqXHR){
            $.each(data, function(index, itemData){
                insereLinha(itemData.id, itemData.nome, itemData.site);
            });    
        },
        error: function(jqXHR, textStatus, errorThrown){
            alert('Status: ' + textStatus + '\nTipo:' + errorThrown + '\nMensagem: ' + jqXHR.responseText);
        }
    })    

})

function insereLinha(id, nome, site){
    
    let linha = '<tr><td class=\'col-xs-2\'>' + '<a href=\'#\'class=\'action_edit\' value=\'' + id + '\'><img src=\'imagens/editar.jpeg\'/>' + 
    '<a href=\'#\'class=\'action_delete\' value=\'' + id + '\'><img src=\'imagens/excluir.jpeg\' /></td><td class=\'col-xs-4\'>' + nome + '</td><td class=\'col-xs-6\' >' + site + '</td></tr>';
    
    $('#alunoTable').append(linha);
}