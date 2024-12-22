import hashlib
import json
import sqlite3
from api.config.db.db_init import DB_FILE
from xrpl.core.addresscodec import is_valid_classic_address

def validate_xrp_address(address):
    return is_valid_classic_address(address)


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

def generate_metadata_hash(metadata: dict) -> str:
    """
    Generate a hash from the NFT metadata to ensure uniqueness.

    Args:
        metadata (dict): The metadata for the NFT.

    Returns:
        str: A unique hash of the metadata.
    """
    metadata_str = json.dumps(metadata, sort_keys=True)  # Ensure consistent ordering
    metadata_hash = hashlib.sha256(metadata_str.encode('utf-8')).hexdigest()
    return metadata_hash

def is_metadata_unique(metadata: dict) -> bool:
    """
    Check if the metadata is unique by looking up its hash in the database.

    Args:
        metadata (dict): The metadata to check.

    Returns:
        bool: True if unique, False if duplicate.
    """
    metadata_hash = generate_metadata_hash(metadata)
    connection = sqlite3.connect(DB_FILE)
    cursor = connection.cursor()
    cursor.execute('SELECT * FROM nft_metadata WHERE hash = ?', (metadata_hash,))
    exists = cursor.fetchone() is not None
    connection.close()
    return not exists

def save_metadata(metadata: dict):
    """
    Save the metadata hash to the database.

    Args:
        metadata (dict): The metadata to save.
    """
    metadata_hash = generate_metadata_hash(metadata)
    connection = sqlite3.connect(DB_FILE)
    cursor = connection.cursor()
    print(metadata_hash)
    print(json.dumps(metadata))
    cursor.execute('INSERT INTO nft_metadata (hash, metadata) VALUES (?, ?)', (metadata_hash, json.dumps(metadata)))
    connection.commit()
    connection.close()

