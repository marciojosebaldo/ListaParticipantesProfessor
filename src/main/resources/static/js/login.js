$("#btnCadastrar").click(function(event){
    event.preventDefault();
    $.get("/cadastro", function(data) {
        $(".container").html(data);
    });
});