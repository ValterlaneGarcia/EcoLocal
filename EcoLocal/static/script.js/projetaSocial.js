const botao = document.getElementById('criar');
const botaoC = document.getElementById('inserir');
const abaProjeto = document.getElementById('inserir_projeto');

botao.addEventListener('click', aba);

function aba() {
    if (abaProjeto.style.display === 'none' || abaProjeto.style.display === '') {
        abaProjeto.style.display = 'block';
        botao.style.display = 'none';
        botaoC.style.display = '';
    } else {
        abaProjeto.style.display = 'none';
        botao.style.display = '';
        botaoC.style.display = 'none';
    }

    if (botaoC.style.display != 'none') {
        abaProjeto.innerHTML = `
                    <fieldset>
                        <legend style="font-weight: bold;">Criar Evento Social</legend>
                                <form action="">

                                <div class="form">

                                    <label for="nome" class="label_class">Nome:</label>
                                    <input type="text" name="nome" id="nome" placeholder="Insira seu nome *" required>
                                    
                                    <label for="telefone" class="label_class">Telefone:</label>
                                    <input type="text" name="telefone" id="telefone" placeholder="Número para Contato *" required>

                                </div>

                                <div class="form2">

                              <input type="email" name="email" id="email" placeholder="Insira seu E-mail Para Contato">
                              <input type="text" name="nome_social" id="nome_social" placeholder="Nome do seu projeto *" required>
                              <textarea name="descricao_social" id="decricao_social" placeholder="Do que se trata o projeto?"></textarea>
                          </div>
                    </fieldset>`;
    }else {
        abaProjeto.innerHTML = '';
    }
}

botaoC.addEventListener('click',ValidaInfo);

function ValidaInfo(event) {
    event.preventDefault();

    const nomePessoa        = document.getElementById('nome')?.value.trim();
    const telefone          = document.getElementById('telefone')?.value.trim();
    const email             = document.getElementById('email')?.value.trim();
    const nomeSocial        = document.getElementById('nome_social')?.value.trim();
    const descricao         = document.getElementById('decricao_social')?.value;
    const numero_cep        = localStorage.getItem('cep');
    const nome_bairro       = localStorage.getItem('bairro');

    if(botaoC.style.display != 'none') {
        if (!nomePessoa || (!telefone && !nomeSocial)) {
            alert(!nomePessoa ? 'Nome não pode ser vazio' : "Campos faltando ser preenchido");
            return false;
        }
    }

    fetch('/api/map/banco', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            MyInfo: {
                nomePessoa,
                telefone,
                email,
                nomeSocial,
                descricao,
                numero_cep,
                nome_bairro,
            }
        }),
    })

    setTimeout(()=> {
        atualizarProjetos();
    }, 2000);

    aba();

}


