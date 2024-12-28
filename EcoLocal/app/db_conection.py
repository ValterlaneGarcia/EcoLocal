# -*- coding: utf-8 -*-

from flask import Flask, jsonify
import sqlite3

app = Flask(__name__)

def get_projetos():
    conn = sqlite3.connect('ecolocal.db')
    cursor = conn.cursor()
    
    cursor.execute('SELECT nome_social FROM social')
    
    dados = cursor.fetchall()
    conn.close()
    
    return [{"nome_social": projeto[0]} for projeto in dados]
