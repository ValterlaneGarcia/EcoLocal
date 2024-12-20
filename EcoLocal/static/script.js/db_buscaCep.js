function validaCep() {
    var cep = $('#buscar_cep').val();
    if (cep == '') {
        alert("É preciso de um CEP válido.");
        return false;
    }

    var regexCep = /^[0-9]{5}-?[0-9]{3}$/;
    if (!regexCep.test(cep)) {
        alert("Formato de CEP inválido. Exemplo correto: 01001-000");
        $('#buscar_cep').val('');
        return false;
    }

    return true;
}

function buscarCep(cep) {
    if ($('#loadingOverlay').length === 0) {
        $('main').append('<div id="loadingOverlay"><div class="loader">Carregando...</div></div>');
    }
    $('#loadingOverlay').fadeIn();

    $.ajax({
        url: `https://viacep.com.br/ws/${cep}/json/`,
        dataType: 'json',
        success: function (data) {
            $('#loadingOverlay').fadeOut();

            if (data.erro) {
                alert("CEP não encontrado.");
            } else {
                var bairro = data.bairro ? data.bairro : 'Bairro não encontrado';
                
                if (bairro === 'Bairro não encontrado') {
                    alert("Bairro não encontrado para este CEP.");
                }

                localStorage.setItem('bairro', bairro);
                window.location.href = 'map.html';
            }
        },
        error: function () {
            $('#loadingOverlay').fadeOut();
            alert("Erro ao buscar informações do CEP.");
        }
    });
}
