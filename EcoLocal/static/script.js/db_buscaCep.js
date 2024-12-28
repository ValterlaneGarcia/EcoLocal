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

    // Primeira requisição para obter o bairro via ViaCEP
    $.ajax({
        url: `https://viacep.com.br/ws/${cep}/json/`,
        dataType: 'json',
        success: function (data) {
            $('#loadingOverlay').fadeOut();

            if (data.erro) {
                alert("CEP não encontrado.");
            } else {
                var bairro = data.bairro ? data.bairro : 'Bairro não encontrado';
                var localidade = data.localidade;

                if (bairro === 'Bairro não encontrado') {
                    alert("Bairro não encontrado para este CEP.");
                }

                // Segundo Ajax para pegar as coordenadas do CEP via Nominatim (OpenStreetMap)
                $.ajax({
                    url: `https://nominatim.openstreetmap.org/search?postalcode=${cep}&countrycodes=BR&format=json`,
                    dataType: 'json',
                    success: function (geoData) {
                        if (geoData.length > 0) {
                            var latitude = geoData[0].lat;
                            var longitude = geoData[0].lon;

                            localStorage.setItem('localidade',localidade);
                            localStorage.setItem('cep', cep);
                            localStorage.setItem('bairro', bairro);
                            localStorage.setItem('latitude', latitude);
                            localStorage.setItem('longitude', longitude);

                            window.location.href = 'http://127.0.0.1:5000/map';
                        } else {
                            alert("Coordenadas não encontradas para esse CEP.");
                        }
                    },
                    error: function () {
                        alert("Erro ao buscar coordenadas geográficas.");
                    }
                });
            }
        },
        error: function () {
            $('#loadingOverlay').fadeOut();
            alert("Erro ao buscar informações do CEP.");
        }
    });
}
