var notas;
var contadorTareas = 0;
var contadorTareasPendientes = 0;
$(document).ready(function () {
    if (localStorage.notas != null)
        leerNotas();
    else
        notas = [];

    $("#input").keypress(function (event) {
        if (event.which == 13) {
            crearnota();
        }

    })
})
function crearnota() {
    let nota = {
        title: ($("#input").val()),
        priority: "high",
        date: Date.now(),
        completed: false
    }
    notas.push(nota);
    localStorage.setItem("notas", JSON.stringify(notas));
    contadorTareas++;
    contadorTareasPendientes++;
    $("#tareas").html(contadorTareasPendientes);
    $("#de").html(contadorTareas);
    const div = document.createElement("div");
    const divH2 = document.createElement("div");
    const divH2Div = document.createElement("div");
    const divH2Div2 = document.createElement("div");
    const divPriority = document.createElement("div");
    const pPrioridad = document.createElement("p");
    const h2 = document.createElement("h2");
    const i = document.createElement("i");
    $(divH2).addClass("div--1");
    $(divH2Div).addClass("div--1--div");
    $(divH2Div2).addClass("div--2--div");
    $(divPriority).addClass("div--2");
    $(i).addClass("fa fa-trash");
    $(i).attr('aria-hidden', 'true');
    $(div).addClass("note--div");
    const pTimeAdd = document.createElement("p");
    $(div).append(divH2);
    $(div).append(divPriority);
    $(divH2).append(divH2Div);
    $(divH2).append(divH2Div2);
    $(divH2Div).append(
        $(document.createElement('input')).prop({
            class: 'myCheckBox',
            name: 'interest',
            value: 'car',
            type: 'checkbox'
        }))
    $(divH2Div).append(h2);
    $(divH2Div2).append(i);
    $(divPriority).append(pTimeAdd);
    $(h2).html($("#input").val());
    $("#div--tareas").append(div);
    $(pPrioridad).html("Prioridad: ");
    $(divPriority).append(pPrioridad);
    $(divPriority).append($('<button class="low  prioridad">Low ↓</button>'), $('<button class="normal prioridad">Normal</button>'), $('<button aria-pressed="true" class="high prioridad">High ↑</button>'));
    $("#input").val(" ");

    $(".myCheckBox").on('change', function () {
        if ($(this).is(':checked')) {
            $(this).siblings().css("text-decoration", "line-through");
            notas[$(this).parent().parent().parent().index()].completed = "true";
            localStorage.notas = JSON.stringify(notas);
            contadorTareasPendientes--;
        } else {
            $(this).siblings().css("text-decoration", "none");
            notas[$(this).parent().parent().parent().index()].completed = "false";
            localStorage.notas = JSON.stringify(notas);
        }
    })
    $(divPriority).append($(`<p>Añadido hace ${Math.floor(((Date.now() - nota.date)/1000)/60)} minutos</p>`));
}

function leerNotas() {
    notas = [];
    notasRecogidas = JSON.parse(localStorage.notas);
    for (j = 0; j < notasRecogidas.length; j++) {
        contadorTareas++;
        contadorTareasPendientes++;
        notas.push(notasRecogidas[j]);
        const div = document.createElement("div");
        const divH2 = document.createElement("div");
        const divH2Div = document.createElement("div");
        const divH2Div2 = document.createElement("div");
        const divPriority = document.createElement("div");
        const h2 = document.createElement("h2");
        const pPrioridad = document.createElement("p");
        const i = document.createElement("i");
        $(divH2).addClass("div--1");
        $(divH2Div).addClass("div--1--div");
        $(divH2Div2).addClass("div--2--div");
        $(divPriority).addClass("div--2");
        $(i).addClass("fa fa-trash");
        $(i).attr('aria-hidden', 'true');
        const pTimeAdd = document.createElement("p");
        $("#div--tareas").append(div);
        $(div).append(divH2);
        $(div).append(divPriority);
        $(divH2).append(divH2Div);
        $(divH2).append(divH2Div2);
        let checkBox = $(document.createElement('input')).prop({
            class: 'myCheckBox',
            name: 'interest',
            value: 'car',
            type: 'checkbox'});
        $(divH2Div).append(checkBox);
        $(divH2Div).append(h2);
        $(divH2Div2).append(i);
        $(divPriority).append(pTimeAdd);
        $(div).addClass("note--div");
        $(h2).html(notasRecogidas[j].title);
        $("#div--tareas").append(div);
        let btnHigh = $('<button class="high prioridad">High ↑</button>');
        let btnLow = $('<button class="low prioridad">Low ↓</button>');
        let btnNormal = $('<button class="normal prioridad">Normal</button>');
        $(pPrioridad).html("Prioridad: ");
        $(divPriority).append(pPrioridad);
        $(divPriority).append(btnLow);
        $(divPriority).append(btnNormal);
        $(divPriority).append(btnHigh);
        $(divPriority).append($(`<p>Añadido hace ${Math.floor(((Date.now() - notasRecogidas[j].date)/1000)/60)} minutos</p>`));
        if (notasRecogidas[j].priority == "low"){
            btnLow.attr('aria-pressed', 'true');
        }
        else if (notasRecogidas[j].priority == "normal") {
            btnNormal.attr('aria-pressed', 'true');
        }
        else if (notasRecogidas[j].priority == "high") {
            btnHigh.attr('aria-pressed', 'true');
        }

        if (notasRecogidas[j].completed == "true") {
            checkBox.attr('checked', "true");
            $(h2).css("text-decoration", "line-through");
            contadorTareasPendientes--;
        }

    }
    $("#tareas").html(contadorTareasPendientes);
    $("#de").html(contadorTareas);

    $("#borrarTareas").click(function() {
        let nuevasNotas = [];
        for (nota of notas) {
            if (!nota.completed) {
                nuevasNotas.push(nota);
            }
        }
        localStorage.setItem('notas', JSON.stringify(nuevasNotas));
        $("#div--tareas").html("");
        leerNotas();
        contadorTareas = nuevasNotas.length();
        contadorTareasPendientes = nuevasNotas.length();
    });


    $(".myCheckBox").on('change', function () {
        if ($(this).is(':checked')) {
            $(this).siblings().css("text-decoration", "line-through");
            notas[$(this).parent().parent().parent().index()].completed = "true";
            localStorage.notas = JSON.stringify(notas);
            contadorTareasPendientes--;
        } else {
            $(this).siblings().css("text-decoration", "none");
            notas[$(this).parent().parent().parent().index()].completed = "false";
            localStorage.notas = JSON.stringify(notas);
        }
    })
    
    $("#div--tareas").on("click", ".low", function () {
        $(this).parent().parent().find(".prioridad").attr('aria-pressed', 'false');
        $(this).attr('aria-pressed', 'true');
        notas[$(this).parent().parent().index()].priority = "low";
        localStorage.notas = JSON.stringify(notas);
        $("#div--tareas").html("");
        leerNotas();

    })
    $("#div--tareas").on("click", ".normal", function () {
        $(this).parent().parent().find(".prioridad").attr('aria-pressed', 'false');
        $(this).attr('aria-pressed', 'true');
        notas[$(this).parent().parent().index()].priority = "normal";

        localStorage.notas = JSON.stringify(notas);
        $("#div--tareas").html("");
        leerNotas();
        
    })
    $("#div--tareas").on("click", ".high", function () {
        $(this).parent().parent().find(".prioridad").attr('aria-pressed', 'false');
        $(this).attr('aria-pressed', 'true');
        notas[$(this).parent().parent().index()].priority = "high";

        localStorage.notas = JSON.stringify(notas);
        $("#div--tareas").html("");
        leerNotas();
        
    })

    $("#div--tareas").on("click", "i", function () {
        $(this).fadeOut("normal", function () {
            $(this).parent().parent().parent().remove();
        });
        notas.splice($(this).parent().parent().parent().index(), 1);
        localStorage.notas = JSON.stringify(notas);
        contadorTareasPendientes--;
        contadorTareas--;
    });

}