$(function () {


    //teste ajax
    var servico = "http://livro-capitulo07.herokuapp.com/hello";
    $.get(servico, function (data) {
        alert(data);
    });
    var servico = "http://livro-capitulo07.herokuapp.com/error";
    $.get(servico)
        .fail(function (data) {
            alert(data.responseText);
        });

    var servico = "http://api.postmon.com.br/v1/cep/";
    var cep = "12345-789";

    function onCepDone(data) {
        console.log("A Casa do Código fica na " + data.logradouro);
    }

    function onCepError(error) {
        console.log("Erro: " + error.statusText)
    };
    $.getJSON(servico + cep)
        .done(onCepDone)
        .fail(onCepError);


    var $lastClicked;
    $(".tarefa-delete").click(onTarefaDeleteClick);

    $(".tarefa-item").click(onTarefaItemClick);

    $("#tarefa").keydown(onTarefaKeydown);


    function onTarefaDeleteClick() {

        $(this).parent('.tarefa-item')
        //.off para nao chamar o click na div
            .off('click')
            .hide('slow', function () {
                $(this).remove();
            });
    }

    function addTarefa(text) {
        var $tarefa = $("<div />")
            .addClass("tarefa-item")
            .append($("<div />")
                .addClass("tarefa-texto")
                .text(text))
            .append($("<div />")
                .addClass("tarefa-delete"))
            .append($("<div />")
                .addClass("clear"));

        $("#tarefa-list").append($tarefa);

        $(".tarefa-delete").click(onTarefaDeleteClick);

        $(".tarefa-item").click(onTarefaItemClick);
    }

    function onTarefaKeydown(event) {
        if (event.which === 13) {
            addTarefa($("#tarefa").val());
            $("#tarefa").val("");
        }
    }

    function onTarefaEditKeydown(event) {
        if (event.which === 13) {
            savePendingEdition($lastClicked);
            $lastClicked = undefined;
        }
    }

    //se você clica em outra tarefa a atual é salva
    function onTarefaItemClick() {

        //interessante notar como o $this funciona aqui (o objeto que chamou é o proprio this)
        if (!$(this).is($lastClicked)) {

            if ($lastClicked !== undefined) {
                savePendingEdition($lastClicked);
            }
            console.log((this));

            $lastClicked = $(this);

            var text = $lastClicked.children('.tarefa-texto').text();

            var content = "<input type='text' class='tarefa-edit' value='" + text + "'/>";

            $lastClicked.html(content);
            //adiciona evento keydown ao objeto recem criado
            $(".tarefa-edit").keydown(onTarefaEditKeydown);
        }

    }

    function savePendingEdition($tarefa) {
        var text = $tarefa.children('.tarefa-edit').val();
        $tarefa.empty();
        $tarefa.append("<div class='tarefa-texto'>" + text + "</div>")
            .append("<div class='tarefa-delete'></div>")
            .append("<div class='clear'></div>");


        //readiciona evento (os eventos nao sao automaticos depois da remoção do dom
        $(".tarefa-delete").click(onTarefaDeleteClick);

        $tarefa.click(onTarefaItemClick);
    }


});