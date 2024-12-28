# -*- coding: utf-8 -*-

from flask import Flask, render_template, jsonify
from db_conection import get_projetos  # Fun��o para pegar os projetos

# Configura��o da aplica��o Flask
app = Flask(__name__, 
            template_folder='../templates',  # Caminho para a pasta 'templates', um n�vel acima
            static_folder='../static')  # Caminho para a pasta 'static', um n�vel acima

# Rota para a p�gina principal (index.html)
@app.route('/')
def index():
    return render_template('index.html')  # Renderiza o template index.html

# Rota para a p�gina map.html, incluindo os dados da tabela 'social'
@app.route('/map')
def map_page():
    projetos = get_projetos()  # Chama a fun��o que vai pegar os projetos
    return render_template('map.html', projetos=projetos)  # Passa os projetos para o template

# Rota para pegar projetos sociais da tabela 'social' (API para o JS pegar os dados)
@app.route('/api/projetos', methods=['GET'])
def api_projetos():
    projetos = get_projetos()  # Chama a fun��o para obter os dados
    return jsonify(projetos)  # Retorna em formato JSON

if __name__ == '__main__':
    app.run(debug=True)
