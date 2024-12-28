const nomeBairro = localStorage.getItem('bairro');
const localidade = localStorage.getItem('localidade');
const latitude = parseFloat(localStorage.getItem('latitude'));  // Converte para número
const longitude = parseFloat(localStorage.getItem('longitude'));  // Converte para número


// Exibe o nome do bairro no elemento correto, caso ele tenha sido armazenado
if (nomeBairro) {
    document.getElementById('NomeBairro').textContent = `Bairro: ${nomeBairro}`;
}

if (localidade) {
    document.getElementById('capital').textContent = `Capital: ${localidade}`;
}

// Verifica se latitude e longitude são válidos antes de tentar carregar o mapa
if (!isNaN(latitude) && !isNaN(longitude)) {
    // Inicia o mapa com a latitude e longitude
    const map = L.map("map").setView([latitude, longitude], 13); // Latitude primeiro, Longitude segundo

    // Adiciona o tile layer do OpenStreetMap ao mapa
    L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png").addTo(map);

    // Adiciona um marcador no mapa na posição da latitude e longitude
    const marker = L.marker([latitude, longitude]).addTo(map);
    marker.bindPopup("Você está aqui").openPopup();
} else {
    console.error("Latitude ou longitude inválidos.");
}
