const nomeBairro = localStorage.getItem('bairro');
if (nomeBairro) {
    document.getElementById('NomeBairro').textContent = `Bairro: ${nomeBairro}`;
}

const map = L.map("map").setView([-23.55052, -46.633308], 13);
L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png").addTo(map);
const marker = L.marker([-23.55052, -46.633308]).addTo(map);
marker.bindPopup("Você está aqui").openPopup();