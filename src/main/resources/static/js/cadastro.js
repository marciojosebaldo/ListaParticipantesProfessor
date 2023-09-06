$("#btnEnviar").click(validaEnvio);

    function campoVazio(campo) {
        if (campo == '') {
            return true;
        } else {
            return false;
        }
    }

    function createToastArea() {
        if ($(".toaster").length == 0) {
            $("body").prepend('' +
                '<div aria-live="polite" aria-atomic="true"' +
                'class="position-absolute top-0 erros">' +
                '<div class="toaster position-absolute top-0 end-0">' +
                '</div>' +
                '</div>');
        }

    }

    function showToast(alerta) {
        createToastArea();

        let tipo
        if (alerta.sucesso) {
            tipo = 'bg-success';
        } else {
            tipo = 'bg-danger';
        }

        const toastElement = $('<div class="mt-1 toast align-items-center' + tipo + 'text-white border-0" role="alert" aria-live="assertive" aria-atomic="true">' +
            '<div class="d-flex">' +
            '<div class="toast-body">' +
            alerta.mensagem +
            '</div>' +
            '<button type="button" class="btn-close btn-close-white me-2 m-auto" data-bs-dismiss="toast" aria-label="Close"></button>' +
            '</div>' +
            '</div>');

        toastElement.on('hidden.bs.toast', function () {
            $(this).remove();
        });

        $(".toaster").append(toastElement);
        const newToast = new bootstrap.Toast(toastElement);
        newToast.show();
    }

    function validaEnvio() {
        let podeEnviar = true;
        let cpf = $("#cpf").val();
        let nome = $("#nome").val();
        let email = $("#email").val();
        let telefone = $("#telefone").val();
        let senha = $("#senha").val();
        let confSenha = $("#confSenha").val();

        $("#errorMessage").text("");
        if (!validarCPF(cpf)) {
            podeEnviar = false;
            showToast({ sucesso: podeEnviar, mensagem: "O CPF informado é inválido!" });
            $(".tCpf").addClass("error-field");
        }
        if (campoVazio(nome)) {
            podeEnviar = false;
            showToast({ sucesso: podeEnviar, mensagem: "O nome precisa ser preenchido!" });
            $(".tNome").addClass("error-field");
        }
        if (campoVazio(email) && campoVazio(telefone)) {
            podeEnviar = false;
            showToast({ sucesso: podeEnviar, mensagem: "E-mail ou telefone precisa ser informado" });
            $(".tTelefone").addClass("error-field");
            $(".tEmail").addClass("error-field");
        }
        if (campoVazio(senha) || senha != confSenha) {
            podeEnviar = false;
            showToast({ sucesso: podeEnviar, mensagem: "A senha precisa ser informada e igual à confirmação de senha" });
            $(".tSenha").addClass("error-field");
            $("#errorMessage").append('A senha precisa ser preenchida e igual a confirmação de senha!');
        }
        if (podeEnviar) {
            $.ajax({
                type: "POST",// Tipo da requisição
                url: "/cadastro", // Caminho para envio da requisição
                data: {
                    cpf: cpf,
                    nome: nome,
                    email: email,
                    telefone: telefone,
                    senha: senha,
                    confSenha: confSenha
                },
                success: function (data) {
                    $("#errorMessage").text("");
                    if (data.sucesso) {
                        window.location.href = "/";
                    } else {
                        showToast(data);
                    }
                },
                error: function () {
                    $('#errorMessage').append("Falha na comunicação com o servidor!");
                }
            });
        }
    }