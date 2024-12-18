function carregaTela(cep){
    window.location.href = 'map.html'; 

}

function obterLatitudeLongitude()


function obterBairro(latitude, longitude) {
    const url = `https://nominatim.openstreetmap.org/reverse?lat=${latitude}&lon=${longitude}&format=json&addressdetails=1`;

    fetch(url)
        .then(response => response.json())
        .then(data => {
            // A estrutura de resposta inclui vários elementos de endereço
            const bairro = data.address.neighbourhood; // O bairro geralmente fica dentro de 'address.neighbourhood'
            
            if (bairro) {
                console.log("Nome do bairro: ", bairro);
            } else {
                console.log("Bairro não encontrado.");
            }
        })
        .catch(error => console.error('Erro ao buscar informações do bairro:', error));
}

// Exemplo de latitude e longitude
const latitude = -23.550520;  // Substitua pelo valor real
const longitude = -46.633308; // Substitua pelo valor real

obterBairro(latitude, longitude);
