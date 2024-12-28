   // A variável "projetos" é passada pelo Flask
   var projetos = {{ projetos | tojson }};  // Converte o objeto Python para JSON em JavaScript

   // Verifica se "projetos" não é vazio
   if (projetos && projetos.length > 0) {
       // Pega o container de cards
       var container = document.getElementById("cards-container");

       // Para cada projeto na lista "projetos", criamos um card
       projetos.forEach(function(projeto) {
           var card = document.createElement("div");
           card.classList.add("card");  // Classe para estilizar os cards
           
           // Adiciona conteúdo no card
           card.innerHTML = `
               <h3>${projeto.nome_social}</h3>
               <p>${projeto.descricao || 'Sem descrição'}</p>
           `;

           // Coloca o card dentro do container
           container.appendChild(card);
       });
   } else {
       // Caso não tenha projetos, mostra uma mensagem
       var container = document.getElementById("cards-container");
       container.innerHTML = "<p>Não há projetos sociais disponíveis.</p>";
   }
   