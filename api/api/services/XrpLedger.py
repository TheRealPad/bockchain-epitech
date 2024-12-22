from xrpl.clients import JsonRpcClient
from xrpl.models import NFTokenCreateOffer, NFTokenCancelOffer, NFTokenAcceptOffer
from xrpl.transaction import autofill, sign, submit_and_wait
from xrpl.wallet import generate_faucet_wallet, Wallet
from xrpl.core import addresscodec
from xrpl.models.requests.account_info import AccountInfo
from xrpl.models.requests import AccountNFTs
from xrpl.utils import str_to_hex
from xrpl.models.transactions import NFTokenMint
from xrpl.models.requests import NFTSellOffers
import json
import requests

from api.services.db_services import is_metadata_unique, save_metadata

JSON_RPC_URL = "https://s.altnet.rippletest.net:51234/"

class XrpLedger:
    def __init__(self):
        print("Initializing XrpLedger Service")
        self.client = JsonRpcClient(JSON_RPC_URL)

    def create_wallet(self):
        test_wallet = generate_faucet_wallet(self.client, debug=True)
        test_account = test_wallet.address
        test_xaddress = addresscodec.classic_address_to_xaddress(test_account, tag=12345, is_test_network=True)
        print("\nClassic address:\n\n", test_account)
        print("X-address:\n\n", test_xaddress)
        acct_info = AccountInfo(
            account=test_account,
            ledger_index="validated",
            strict=True,
        )
        response = self.client.request(acct_info)
        result = response.result
        print("response.status: ", response.status)
        print(json.dumps(response.result, indent=4, sort_keys=True))
        res = response.result
        res["seed"] = test_wallet.seed
        res["public_key"] = test_wallet.public_key
        res["private_key"] = test_wallet.private_key
        return res

    def retrieve_wallet(self, wallet_address):
        account_info_request = AccountInfo(
            account=wallet_address,
            ledger_index="validated",
            strict=True
        )

        try:
            response = self.client.request(account_info_request)
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
        account_nfts_request = AccountNFTs(
            account=account,
            ledger_index="validated"
        )
        response = self.client.request(account_nfts_request)
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
                    nft_data["metadata"] = json.loads(uri)
                else:
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
                ipfs_gateway_url = f"https://ipfs.io/ipfs/{uri[7:]}"
                response = requests.get(ipfs_gateway_url)
            else:
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
        if not is_metadata_unique(metadata):
            return {"error": "NFT metadata is not unique. Cannot mint duplicate NFTs."}
        uri = json.dumps(metadata)
        uri_hex = str_to_hex(uri)
        if len(uri_hex) > 512:
            return {"error": "Metadata exceeds the maximum allowed length of 512 characters."}
        mint_txn = NFTokenMint(
            account=wallet.classic_address,
            uri=uri_hex,
            flags=8,
            nftoken_taxon=0,
        )
        autofilled_txn = autofill(mint_txn, self.client)
        signed_txn = sign(autofilled_txn, wallet)
        try:
            response = submit_and_wait(signed_txn, self.client)
            save_metadata(metadata)
            print("Minting transaction submitted successfully.")
            return response.result
        except Exception as e:
            print(f"Failed to mint NFT: {e}")
            return None


    def create_sell_offer(self, wallet: Wallet, nftoken_id: str, amount: int):
        """
        Create a sell offer for an NFT.

        Args:
            wallet (Wallet): The wallet to create the sell offer.
            nftoken_id (str): The NFTokenID of the NFT to sell.
            amount (int): The amount in drops to sell the NFT for (1 XRP = 1,000,000 drops).

        Returns:
            dict: The result of the transaction or an error message.
        """
        offer_txn = NFTokenCreateOffer(
            account=wallet.classic_address,
            nftoken_id=nftoken_id,
            amount=str(amount),
            flags=1
        )

        try:
            autofilled_txn = autofill(offer_txn, self.client)
            signed_txn = sign(autofilled_txn, wallet)
            response = submit_and_wait(signed_txn, self.client)
            if response.is_successful():
                print("Sell offer created successfully.")
                return response.result
            else:
                print("Failed to create sell offer.")
                return {"error": response.result.get("engine_result_message", "Unknown error")}
        except Exception as e:
            print(f"Error creating sell offer: {e}")
            return {"error": str(e)}

    def get_sell_offers(self, nftoken_id: str):
        """
        Retrieve all sell offers for a specific NFT.

        Args:
            nftoken_id (str): The NFTokenID of the NFT.

        Returns:
            list: A list of dictionaries containing sell offer details, or an error message if something goes wrong.
        """
        try:
            nft_offers_request = NFTSellOffers(
                nft_id=nftoken_id,
            )
            response = self.client.request(nft_offers_request)
            if response.status == "success":
                offers = response.result.get("offers", [])
                return offers
            else:
                print(f"Failed to retrieve sell offers. Status: {response.status}")
                return {"error": response.result.get("error_message", "Unknown error")}
        except Exception as e:
            print(f"Error fetching sell offers: {e}")
            return {"error": str(e)}

    def delete_sell_offer(self, wallet: Wallet, offer_index: str):
        """
        Delete a sell offer on the XRP Ledger.

        Args:
            wallet (Wallet): The wallet of the owner of the offer.
            offer_index (str): The index of the sell offer to delete.

        Returns:
            dict: The result of the transaction, or an error message if something goes wrong.
        """
        # Create the NFTokenCancelOffer transaction
        cancel_offer_txn = NFTokenCancelOffer(
            account=wallet.classic_address,
            nftoken_offers=[offer_index]
        )

        try:
            autofilled_txn = autofill(cancel_offer_txn, self.client)
            signed_txn = sign(autofilled_txn, wallet)
            response = submit_and_wait(signed_txn, self.client)
            if response.is_successful():
                print("Sell offer deleted successfully.")
                return response.result
            else:
                print("Failed to delete sell offer.")
                return {"error": response.result.get("engine_result_message", "Unknown error")}
        except Exception as e:
            print(f"Error deleting sell offer: {e}")
            return {"error": str(e)}

    def buy_nft(self, buyer_wallet: Wallet, sell_offer_index: str):
        """
        Buy an NFT by accepting a sell offer.

        Args:
            buyer_wallet (Wallet): The wallet of the buyer.
            sell_offer_index (str): The index of the sell offer to accept.

        Returns:
            dict: The result of the transaction, or an error message if something goes wrong.
        """
        # Create the NFTokenAcceptOffer transaction
        accept_offer_txn = NFTokenAcceptOffer(
            account=buyer_wallet.classic_address,
            nftoken_sell_offer=sell_offer_index
        )

        try:
            autofilled_txn = autofill(accept_offer_txn, self.client)
            signed_txn = sign(autofilled_txn, buyer_wallet)
            response = submit_and_wait(signed_txn, self.client)

            if response.is_successful():
                print("NFT purchased successfully.")
                return response.result
            else:
                print("Failed to purchase NFT.")
                return {"error": response.result.get("engine_result_message", "Unknown error")}
        except Exception as e:
            print(f"Error purchasing NFT: {e}")
            return {"error": str(e)}

xrp_ledger = XrpLedger()