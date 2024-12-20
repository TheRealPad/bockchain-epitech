import sqlite3
from api.config.db.init_db import DB_FILE
from xrpl.core.addresses import is_valid_classic_address

def validate_xrp_address(address):
    if is_valid_classic_address(address):
        return True
    return False


def add_wallet_address(wallet_address):
    if not validate_xrp_address(wallet_address):
        return {"error": "Invalid XRP Ledger wallet address!"}

    connection = sqlite3.connect(DB_FILE)
    cursor = connection.cursor()

    try:
        cursor.execute('''
        INSERT INTO wallets (wallet_address) VALUES (?)
        ''', (wallet_address,))
        connection.commit()
        return {"message": "Wallet added successfully!"}
    except sqlite3.IntegrityError:
        return {"error": "Wallet already exists!"}
    finally:
        connection.close()

def get_all_wallet_addresses():
    connection = sqlite3.connect(DB_FILE)
    cursor = connection.cursor()

    try:
        cursor.execute('SELECT wallet_address FROM wallets')
        addresses = cursor.fetchall()
        return [address[0] for address in addresses]
    except sqlite3.DatabaseError as e:
        return {"error": f"Database error: {e}"}
    finally:
        connection.close()

