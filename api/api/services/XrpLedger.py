from xrpl.clients import JsonRpcClient
from xrpl.models import NFTokenMint
from xrpl.transaction import autofill, sign, submit_and_wait
from xrpl.wallet import generate_faucet_wallet, Wallet
from xrpl.core import addresscodec
from xrpl.models.requests.account_info import AccountInfo
from xrpl.models.requests import AccountNFTs
from xrpl.utils import hex_to_str, str_to_hex
from xrpl.models.transactions import NFTokenMint
import json
import requests

class XrpLedger:
    def __init__(self):
        print("XrpLedger init")

    def create_wallet(self):
        JSON_RPC_URL = "https://s.altnet.rippletest.net:51234/"
        client = JsonRpcClient(JSON_RPC_URL)
        test_wallet = generate_faucet_wallet(client, debug=True)
        test_account = test_wallet.address
        test_xaddress = addresscodec.classic_address_to_xaddress(test_account, tag=12345, is_test_network=True)
        print("\nClassic address:\n\n", test_account)
        print("X-address:\n\n", test_xaddress)
        acct_info = AccountInfo(
            account=test_account,
            ledger_index="validated",
            strict=True,
        )
        response = client.request(acct_info)
        result = response.result
        print("response.status: ", response.status)
        print(json.dumps(response.result, indent=4, sort_keys=True))
        res = response.result
        res["seed"] = test_wallet.seed
        res["public_key"] = test_wallet.public_key
        res["private_key"] = test_wallet.private_key
        return res

    def retrieve_wallet(self, wallet_address):
        JSON_RPC_URL = "https://s.altnet.rippletest.net:51234/"
        client = JsonRpcClient(JSON_RPC_URL)
        account_info_request = AccountInfo(
            account=wallet_address,
            ledger_index="validated",  # Use 'validated' ledger to get the most recent stable data
            strict=True  # Ensures the account exists
        )

        try:
            response = client.request(account_info_request)
            if response.status == "success":
                return response.result
            else:
                print(f"Failed to retrieve wallet data. Status: {response.status}")
                return None
        except Exception as e:
            print(f"Error fetching wallet data: {e}")
            return None

    def get_all_nft_data(self, account):
        """
        Retrieve all NFT data for a given account.

        Args:
            account (str): The classic XRP Ledger address.

        Returns:
            list: A list of dictionaries containing NFT data.
        """
        JSON_RPC_URL = "https://s.altnet.rippletest.net:51234/"
        client = JsonRpcClient(JSON_RPC_URL)

        account_nfts_request = AccountNFTs(
            account=account,
            ledger_index="validated"
        )
        response = client.request(account_nfts_request)
        result = response.result

        if response.status != "success":
            print("Failed to retrieve NFTs for account:", account)
            return []

        nfts = result.get("account_nfts", [])
        nft_list = []

        for nft in nfts:
            nft_data = {
                "nft_details": nft,
                "decoded_uri": None,
                "metadata": None
            }

            if "URI" in nft and nft["URI"]:
                uri_hex = nft["URI"]
                uri = bytes.fromhex(uri_hex).decode('utf-8')
                nft_data["decoded_uri"] = uri

                if uri.startswith("{") and uri.endswith("}"):
                    # Parse JSON metadata
                    nft_data["metadata"] = json.loads(uri)
                else:
                    # Fetch metadata from external URL
                    nft_data["metadata"] = self.fetch_nft_metadata_final(uri)

            nft_list.append(nft_data)

        return nft_list

    def fetch_nft_metadata_final(self, uri):
        """
        Fetch NFT metadata from a given URI.

        Args:
            uri (str): The URI of the metadata.

        Returns:
            dict or None: The metadata as a dictionary if successful, None otherwise.
        """
        try:
            if uri.startswith("ipfs://"):
                # Replace "ipfs://" with the IPFS gateway URL
                ipfs_gateway_url = f"https://ipfs.io/ipfs/{uri[7:]}"
                response = requests.get(ipfs_gateway_url)
            else:
                # Standard HTTP/HTTPS URI
                response = requests.get(uri)

            if response.status_code == 200:
                return response.json()
            else:
                print("Failed to fetch metadata. HTTP Status:", response.status_code)
                return None
        except Exception as e:
            print("Error fetching metadata:", str(e))
            return None

    def mint_nft(self, wallet: Wallet, metadata: dict):
        """
        Mint an NFT with the given metadata.

        Args:
            wallet (Wallet): The wallet to mint the NFT.
            metadata (dict): The metadata to include with the NFT.

        Returns:
            dict: The result of the transaction.
        """
        JSON_RPC_URL = "https://s.altnet.rippletest.net:51234/"
        client = JsonRpcClient(JSON_RPC_URL)
        # Encode metadata as a hex-encoded JSON string
        uri = json.dumps(metadata)
        uri_hex = str_to_hex(uri)

        # Create NFTokenMint transaction
        mint_txn = NFTokenMint(
            account=wallet.classic_address,
            uri=uri_hex,
            flags=8,  # NFTokenMint.FREEZE_TOKEN (Optional: Adjust flags as needed)
            nftoken_taxon=0,  # Arbitrary category, can be used to classify NFTs
        )

        # Autofill transaction details (like sequence, fee)
        autofilled_txn = autofill(mint_txn, client)

        # Sign the transaction
        signed_txn = sign(autofilled_txn, wallet)

        # Submit the transaction and wait for validation
        try:
            response = submit_and_wait(signed_txn, client)
            print("Minting transaction submitted successfully.")
            return response.result
        except Exception as e:
            print(f"Failed to mint NFT: {e}")
            return None

    """
    ce code est juste du test, inutile, mais je garde au cas ou
    """
    def check_xrp_ledger(self):
        JSON_RPC_URL = "https://s.altnet.rippletest.net:51234/"
        client = JsonRpcClient(JSON_RPC_URL)
        # test_wallet = generate_faucet_wallet(client, debug=True)
        test_account = "rH1F25LXrdFM4XGXrYy6xQjSAwkk8PUdwe"
        test_xaddress = addresscodec.classic_address_to_xaddress(test_account, tag=12345, is_test_network=True)
        print("\nClassic address:\n\n", test_account)
        print("X-address:\n\n", test_xaddress)
        acct_info = AccountInfo(
            account=test_account,
            ledger_index="validated",
            strict=True,
        )
        response = client.request(acct_info)
        result = response.result
        print("response.status: ", response.status)
        print(json.dumps(response.result, indent=4, sort_keys=True))
        print("Retrieving NFTs for account:", test_account)
        account_nfts_request = AccountNFTs(
            account=test_account,
            ledger_index="validated"
        )
        response = client.request(account_nfts_request)
        result = response.result

        print("NFTs response status:", response.status)
        print("NFTs owned by the account:")
        print(json.dumps(result, indent=4, sort_keys=True))
        nfts = response.result.get("account_nfts", [])

        # Process each NFT
        for nft in nfts:
            print("\nNFT Details:")
            print(json.dumps(nft, indent=4, sort_keys=True))

            # Decode the URI
            if "URI" in nft and nft["URI"]:
                uri_hex = nft["URI"]
                uri = bytes.fromhex(uri_hex).decode('utf-8')
                print("Decoded URI:", uri)

                # Check if URI is JSON
                if uri.startswith("{") and uri.endswith("}"):
                    # Parse JSON metadata
                    metadata = json.loads(uri)
                    print("NFT Metadata (from embedded JSON):")
                    print(json.dumps(metadata, indent=4, sort_keys=True))
                else:
                    # Fetch and display metadata
                    self.fetch_nft_metadata(uri)

    def fetch_nft_metadata(self, uri):
        try:
            if uri.startswith("ipfs://"):
                # Replace "ipfs://" with the IPFS gateway URL
                ipfs_gateway_url = f"https://ipfs.io/ipfs/{uri[7:]}"
                response = requests.get(ipfs_gateway_url)
            else:
                # Standard HTTP/HTTPS URI
                response = requests.get(uri)

            if response.status_code == 200:
                metadata = response.json()
                print("NFT Metadata (from external URL):")
                print(json.dumps(metadata, indent=4, sort_keys=True))
            else:
                print("Failed to fetch metadata. HTTP Status:", response.status_code)
        except Exception as e:
            print("Error fetching metadata:", str(e))