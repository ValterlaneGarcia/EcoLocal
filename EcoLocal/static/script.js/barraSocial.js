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
        var container = document.getElementById("cards-container");
        container.innerHTML = ''; // Limpa os cards existentes antes de adicionar novos

        if (data && data.length > 0) {
            data.forEach(function(projeto) {
                var card = document.createElement("div");
                card.classList.add("card");

                // Adiciona os dados do projeto como atributos data-* no card
                card.setAttribute("data-nome-social", projeto.nome_social);
                card.setAttribute("data-nome-pessoa", projeto.nome_pessoa || 'Sem descrição');
                card.setAttribute("data-descricao", projeto.descricao || 'Sem descrição');
                card.setAttribute("data-telefone", projeto.telefone || 'Não informado');

                card.innerHTML = `
                    <h3>${projeto.nome_social}</h3>
                    <p>${projeto.nome_pessoa || 'Sem descrição'}</p>
                `;

                // Adiciona o evento click ao card
                card.addEventListener('click', function() {
                    exibeMais(this); // Passa o próprio card para a função
                });

                container.appendChild(card);
            });
        } else {
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



function exibeMais(card) {
    const container2 = document.getElementById("mostra_projeto");
    const container3 = document.getElementById("inserir_projeto");
    const container4 = document.getElementById("inserir");
    const container5 = document.getElementById("criar");

    if (container2.style.display === "none") {
        container3.style.display = 'none';
        container4.style.display = 'none';
        container5.style.display = '';

        container2.style.display = "block";
        container2.innerHTML = `
            <fieldset>
                <legend>Mais Informações</legend>
                <p><strong>Nome do Projeto:</strong> ${card.getAttribute("data-nome-social")}</p>
                <p><strong>Nome da Pessoa:</strong> ${card.getAttribute("data-nome-pessoa")}</p>
                <p><strong>Descrição:</strong> ${card.getAttribute("data-descricao")}</p>
                <p><strong>Telefone:</strong> ${card.getAttribute("data-telefone")}</p>
            </fieldset>`;
    } else {
        container2.style.display = "none"; // Oculta se já estiver visível
    }
}
