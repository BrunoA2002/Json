let urlAPI = 'https://gilsonpolito-api.herokuapp.com/alunos/'

$(document).ready(function(){

    $.ajax({
        type: 'GET' ,
        contentType: 'application/json' ,
        url: urlAPI,
        dataType: 'json' ,
        success: function(data){
            $.each(data, function(index, itemData){
                insereLinha(itemData.id, itemData.nome, itemData.site);
            });
            handler();    
        },
        error: function(jqXHR, textStatus, errorThrown){
            alert('Status: ' + textStatus + '\nTipo:' + errorThrown + '\nMensagem: ' + jqXHR.responseText);
        }
    })    

});

function insereLinha(id, nome, site){
    
    let linha = '<tr>'+
                    '<td class=\'col-xs-2\'>' +
                        '<a href=\'#\'class=\'action_edit\' value=\'' + id + 
                        '\'><img src=\'imagens/editar.jpeg\'/>' + 
                        '<a href=\'#\'class=\'action_delete\' value=\'' + id +
                        '\'><img src=\'imagens/excluir.jpeg\' />'+
                    '</td>' +
                        '<td class=\'col-xs-4\'>' + nome + 
                    '</td>' +
                    '<td class=\'col-xs-6\' >' + site + 
                    '</td>'+
                '</tr>';
    
    $('#alunoTable').append(linha);
}

$('#add-to-list') .on('click',(evento)=>{
    evento.preventDefault();
    
    $.ajax({
        type: 'POST',
        contentType: 'application/json',
        url: urlAPI,
        dataType: 'json',
        data: formToJSON(),
        success: function(data){
            insereLinha(data.id, data.nome, data.site);
            handler();
        },
        error: function(jqXHR, textStatus, errorThrown){
            alert('Status: ' + textStatus + '\nTipo:' + errorThrown + '\nMensagem: ' + jqXHR.responseText);
        }
    })
});

function handler(){

    $('.action_delete').each(function(){
        $(this).click(function(evento){
            evento.stopImmediatePropagation();
            evento.preventDefault();
            let tr = $(this).parent().parent()
            if(confirm('Deseja remover o aluno?')){
                $.ajax({
                    type: 'DELETE' ,
                    contentType: 'application/json' ,
                    url: urlAPI + $(this).attr('value'),
                    success: function(){
                        tr.remove();
                    },
                    error: function(jqXHR, textStatus, errorThrown){
                        alert('Status: ' + textStatus + 
                            '\nTipo:' + errorThrown + 
                            '\nMensagem: ' + jqXHR.responseText);
                    },
                });
            }
        });
    });
    
    $('.action_edit').each(function(){
        $(this).click(function(evento){
            evento.preventDefault();
            $.ajax({
                type: 'GET' ,
                contentType: 'application/json' ,
                url: urlAPI + $(this).attr('value') ,
                success: function(data){
                    $('#idHidden').val(data.id);
                    $('#nomeId').val(data.nome);
                    $('#emailId').val(data.site);
                },
                error: function(jqXHR, textStatus, errorThrown){
                    alert('Status: ' + textStatus + 
                        '\nTipo:' + errorThrown + 
                        '\nMensagem: ' + jqXHR.responseText);
                },
            });
        });
    });

}

function formToJSON(){
    return JSON.stringify({
        "id": $('#idHidden').val(),
        "nome": $('#nomeId').val(),
        "site": $('#emailId').val(),
    });
}