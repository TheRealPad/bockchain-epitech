import hashlib
import json
import sqlite3
import uuid

from api.config.db.db_init import DB_FILE
from xrpl.core.addresscodec import is_valid_classic_address

from api.dto.pokemon import Pokemon


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

def insert_nft(pokemon: Pokemon):
    """
    Insert a Pokemon into the database.

    Args:
        pokemon (Pokemon): The Pokemon instance to insert.
    """
    with sqlite3.connect(DB_FILE) as connection:
        cursor = connection.cursor()

        # Generate a UUID for the new Pokemon
        pokemon_uuid = str(uuid.uuid4())

        # Insert the Pokemon into the table
        cursor.execute('''
        INSERT INTO nft (
            uuid, name, language, number, series, type, quality, holo,
            reverse_holo, first_edition, creation_date, front_image,
            back_image, description
        ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
        ''', (
            pokemon_uuid,
            pokemon.name,
            pokemon.language,
            pokemon.number,
            pokemon.series,
            pokemon.type,
            pokemon.quality,
            pokemon.holo,
            pokemon.reverse_holo,
            pokemon.first_edition,
            pokemon.creation_date,
            pokemon.front_image,
            pokemon.back_image,
            pokemon.description
        ))

        connection.commit()
        print(f"Pokemon {pokemon.name} inserted successfully with UUID: {pokemon_uuid}.")
        return pokemon_uuid

def get_nft_by_uuid(pokemon_uuid: str) -> Pokemon:
    """
    Retrieve a Pokemon from the database by its UUID.

    Args:
        pokemon_uuid (str): The UUID of the Pokemon to retrieve.

    Returns:
        Pokemon: The retrieved Pokemon instance, or None if not found.
    """
    with sqlite3.connect(DB_FILE) as connection:
        cursor = connection.cursor()

        # Fetch the Pokemon by UUID
        cursor.execute('SELECT * FROM nft WHERE uuid = ?', (pokemon_uuid,))
        row = cursor.fetchone()

        if row:
            # Map the row to a Pokemon instance
            return Pokemon(
                name=row[1],
                language=row[2],
                number=row[3],
                series=row[4],
                type=row[5],
                quality=row[6],
                holo=bool(row[7]),
                reverse_holo=bool(row[8]),
                first_edition=bool(row[9]),
                creation_date=row[10],
                front_image=row[11],
                back_image=row[12],
                description=row[13]
            )
        else:
            print(f"Pokemon with UUID {pokemon_uuid} not found.")
            return None

def delete_nft_by_uuid(nft_uuid: str) -> bool:
    """
    Delete an NFT from the database by its UUID.

    Args:
        nft_uuid (str): The UUID of the NFT to delete.

    Returns:
        bool: True if the NFT was deleted successfully, False otherwise.
    """
    try:
        with sqlite3.connect(DB_FILE) as connection:
            cursor = connection.cursor()
            cursor.execute('DELETE FROM nft WHERE uuid = ?', (nft_uuid,))
            connection.commit()
            print(f"NFT with UUID {nft_uuid} deleted successfully.")
            return True
    except sqlite3.Error as e:
        print(f"Error deleting NFT: {e}")
        return False
