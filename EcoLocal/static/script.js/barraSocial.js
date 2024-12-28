window.onload = () => {
    novaTela();
}

function novaTela() {

    const numeroBairro = localStorage.getItem('cep');
    fetch('/api/map', {
        method: 'POST', 
        headers: {
            'Content-Type': 'application/json',  
        },
        body: JSON.stringify({ myData: numeroBairro })  
    })
    .then(response => response.json())  
    .then(data => {

        if (data && data.length > 0) {
            var container = document.getElementById("cards-container"); 

            data.forEach(function(projeto) {
                var card = document.createElement("div");
                card.classList.add("card");

                card.innerHTML = `
                    <h3>${projeto.nome_social}</h3>
                    <p>${projeto.nome_pessoa || 'Sem descrição'}</p>
                `;

                container.appendChild(card);
            });
        } else {
            var container = document.getElementById("cards-container");
            container.innerHTML = `<div class="NoProject"><p>Não há projetos sociais disponíveis.</p><div>`;
        }
    })
    .catch(error => {
        console.error('Erro:', error);
    });
}

function atualizarProjetos() {
    const container = document.getElementById("cards-container");
    container.innerHTML = ''; 

    novaTela();
    
}