
let urlAPI = 'https://gilsonpolito-api.herokuapp.com/alunos/'

$(document).ready(function(){

    $.ajax({
        type: 'GET' ,
        contentType: 'application/json' ,
        url: urlAPI,
        dataType: 'json' ,
        success: function(data){
            $.each(data, function(index, itemData){
                insereLinha(itemData.id, itemData.nome, itemData.nota, itemData.site, itemData.endereco, itemData.telefone);
            });
            handler();    
        },
        error: function(jqXHR, textStatus, errorThrown){
            alert('Status: ' + textStatus + '\nTipo:' + errorThrown + '\nMensagem: ' + jqXHR.responseText);
        }
    })    

});

function insereLinha(id, nome, nota, site, endereco, telefone){
    
    let linha = '<tr>'+
                    '<td class=\'col-xs-2\'>' +
                        '<a href=\'#\'class=\'action_edit\' value=\'' + id + 
                        '\'><img src=\'imagens/editar.jpeg\'/>' + 
                        '<a href=\'#\'class=\'action_delete\' value=\'' + id +
                        '\'><img src=\'imagens/excluir.jpeg\' />'+
                    '</td>' +
                        '<td id=\'nameIdTb\' class=\'col-xs-4\'>' + nome + 
                    '</td>' +
                        '<td id =\'notaaIdTb\' class=\'col-xs-6\' >' + nota + 
                    '</td>'+                    
                        '<td id =\'siteeIdTb\' class=\'col-xs-8\' >' + site + 
                    '</td>'+
                        '<td id =\'enderecooIdTb\' class=\'col-xs-10\' >' + endereco + 
                    '</td>'+
                        '<td id =\'telefoneeIdTb\' class=\'col-xs-12\' >' + telefone + 
                    '</td>'+
                '</tr>';
    
    $('#alunoTable').append(linha);
}

$('#update-to-list').on('click', (evento) =>{
    evento.preventDefault();
    var validator = $("#formAluno").data("bs.validator");
    validator.validate();
    if(!validator.isIncomplete()){

        $.ajax({
            type: 'PUT' ,
            contentType: 'application/json' ,
            url: urlAPI ,
            dataType: 'json' ,
            data: formToJSON() ,
            success: function (){
                $('#alunoTable tr').each(function(){
                    if($(this).find('.action_edit').attr('value') == $('#idHidden').val()){
                        $(this).find('#nameIdTb').html($('#nomeId').val());
                        $(this).find('#notaaIdTb').html($('#notaId').val());
                        $(this).find('#siteeIdTb').html($('#siteId').val());
                        $(this).find('#enderecooIdTb').html($('#enderecoId').val());
                        $(this).find('#telefoneeIdTb').html($('#telefoneId').val());
                        
                        $('#add-to-list').removeClass('d-none');
                        $('#update-to-list').addClass('d-none');
                        $('#formAluno').get(0).reset();                                     
                    }
                }) 
            },
            error: function(jqXHR, textStatus, errorThrown){
                alert('Status: ' + textStatus + '\nTipo:' + errorThrown + '\nMensagem: ' + jqXHR.responseText);
            }    
        });
    }
});

$('#add-to-list').on('click',(evento)=>{
    evento.preventDefault();
    var validator = $("#formAluno").data("bs.validator");
    validator.validate();
    if(!validator.isIncomplete()){
    
        $.ajax({
            type: 'POST',
            contentType: 'application/json',
            url: urlAPI,
            dataType: 'json',
            data: formToJSON(),
            success: function(data){                        
                insereLinha(data.id, data.nome, data.nota, data.site, data.endereco, data.telefone);           
                handler();  
                $('#formAluno').get(0).reset();          
            },
            error: function(jqXHR, textStatus, errorThrown){
                alert('Status: ' + textStatus + '\nTipo:' + errorThrown + '\nMensagem: ' + jqXHR.responseText);
            }
        })
    }
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
                    $('#notaId').val(data.nota);
                    $('#sitelId').val(data.site);
                    $('#enderecoId').val(data.endereco);
                    $('#telefoneId').val(data.telefone);                   

                    $('#add-to-list').addClass('d-none');
                    $('#update-to-list').removeClass('d-none');
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
        "nota": $('#notaId').val(),
        "site": $('#siteId').val(),
        "endereco": $('#enderecoId').val(),
        "telefone": $('#telefoneId').val(),
    });
}