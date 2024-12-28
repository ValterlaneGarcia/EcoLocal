# -*- coding: utf-8 -*-

from flask import Flask, render_template, request, jsonify
from db_conection import get_projetos 
from db_insereBanco import set_infomacoes
app = Flask(__name__, 
            template_folder='../templates',  
            static_folder='../static')  

@app.route('/')
def index():
    return render_template('index.html')

@app.route('/map', methods=['GET'])
def map_page():
    return render_template('map.html') 

@app.route('/api/map/banco', methods=['POST'])
def api_mapb():
    data        = request.get_json()
    info        = data.get('MyInfo')

    print(info)
    projetos = set_infomacoes(info)
    return jsonify(projetos)


@app.route('/api/map', methods=['POST'])
def api_map():
    data        = request.get_json()
    numero_cep  = data.get('myData') 

    projetos = get_projetos(numero_cep)

    return jsonify(projetos)

if __name__ == '__main__':
    app.run(debug=True)
