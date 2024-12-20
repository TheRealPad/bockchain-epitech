import sqlite3

DB_FILE = "api/config/db/db_file.db"

def initialize_database():
    connection = sqlite3.connect(DB_FILE)
    cursor = connection.cursor()

    cursor.execute('''
    CREATE TABLE IF NOT EXISTS wallets (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        wallet_address TEXT NOT NULL UNIQUE,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    )
    ''')
    connection.commit()
    connection.close()