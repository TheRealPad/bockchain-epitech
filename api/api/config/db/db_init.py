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
    cursor.execute('''
            CREATE TABLE IF NOT EXISTS nft_metadata (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                hash TEXT NOT NULL UNIQUE,
                metadata TEXT NOT NULL,
                created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
            )
            ''')
    cursor.execute('''
            CREATE TABLE IF NOT EXISTS nft (
                uuid TEXT PRIMARY KEY,
                name TEXT NOT NULL,
                language TEXT NOT NULL,
                number TEXT NOT NULL,
                series TEXT,
                type TEXT,
                quality TEXT,
                holo BOOLEAN,
                reverse_holo BOOLEAN,
                first_edition BOOLEAN,
                creation_date TEXT NOT NULL,
                front_image TEXT,
                back_image TEXT,
                description TEXT
            )
            ''')
    connection.commit()
    connection.close()