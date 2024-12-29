# -*- coding: utf-8 -*-

import sqlite3

def get_projetos(numero_cep):
    conn = sqlite3.connect('ecolocal.db')
    cursor = conn.cursor()

    cursor.execute('''SELECT nome_social 
                      FROM social 
                      WHERE id_ecolocal_cep IN (
                          SELECT id 
                          FROM ecolocal_cep 
                          WHERE cep = ?)''', (numero_cep,))
    
    cursor.execute('''
        SELECT pessoa_social.nome, social.nome_social, social.descricao, pessoa_social.telefone 
        FROM social
        JOIN pessoa_social ON social.id_pessoa_social = pessoa_social.id
        JOIN ecolocal_cep ON social.id_ecolocal_cep = ecolocal_cep.id
        WHERE ecolocal_cep.cep = ?
    ''', (numero_cep,))

    dados = cursor.fetchall()
    conn.close() 

    return [{"nome_pessoa": dado[0], "nome_social": dado[1], "descricao": dado[2], "telefone": dado[3],} for dado in dados]
