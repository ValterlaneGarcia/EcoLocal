# -*- coding: utf-8 -*-

import sqlite3

def set_infomacoes(info):

    nome            = info.get('nomePessoa')
    email           = info.get('email')
    telefone        = info.get('telefone')
    nome_social     = info.get('nomeSocial')
    descricao       = info.get('descricao')
    numero_cep      = info.get('numero_cep')
    nome_bairro     = info.get('nome_bairro')
    with sqlite3.connect('ecolocal.db') as conn:
        cursor = conn.cursor()

        cursor.execute('''SELECT id FROM ecolocal_cep WHERE cep = ?''', (numero_cep,))
        result = cursor.fetchone()
        id_numero_cep = result[0] if result else None

        if not id_numero_cep:
            cursor.execute('''
                INSERT INTO ecolocal_cep (cep, nome)
                VALUES (?, ?)
            ''', (numero_cep, nome_bairro))

        cursor.execute('''
        INSERT INTO pessoa_social (nome, email, telefone)
        VALUES (?, ?, ?)
        ''', (nome, email, telefone))
        id_pessoa_social = cursor.lastrowid

        cursor.execute('''
        INSERT INTO social (nome_social, descricao, id_pessoa_social, id_ecolocal_cep)
        VALUES (?, ?, ?, ?)
        ''', (nome_social, descricao, id_pessoa_social, id_numero_cep))


        conn.commit()
        projetos = get_projetos(numero_cep)  
        return projetos