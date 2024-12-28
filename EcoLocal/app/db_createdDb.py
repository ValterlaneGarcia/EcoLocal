# -*- coding: utf-8 -*-
import sqlite3

conn = sqlite3.connect('ecolocal.db')
cursor = conn.cursor()

cursor.execute('''
    CREATE TABLE IF NOT EXISTS pessoa_social (
        id           INTEGER PRIMARY KEY,
        nome         TEXT NOT NULL,
        email        TEXT NOT NULL,
        telefone     TEXT NOT NULL,
        data_update  TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        data_created TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    )
''')

cursor.execute('''
    CREATE TABLE IF NOT EXISTS ecolocal_cep (
        id 			INTEGER PRIMARY KEY,
        cep 		INTEGER,
        nome 		TEXT
    )
''')

cursor.execute('''
CREATE TABLE IF NOT EXISTS social (
    id               INTEGER PRIMARY KEY,
    nome_social      TEXT NOT NULL,
    descricao        TEXT,
    data_update      TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    data_created     TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    id_pessoa_social INTEGER,
    id_ecolocal_cep  INTEGER, 
    FOREIGN KEY (id_pessoa_social) REFERENCES pessoa_social(id),
    FOREIGN KEY(id_ecolocal_cep) REFERENCES ecolocal_cep(id)
)
''')



conn.commit()



conn.close()
