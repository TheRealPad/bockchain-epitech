from api.services.db_services import get_all_wallet_addresses
from api.services.XrpLedger import xrp_ledger

class MarketplaceService:
    def __init__(self):
        print("Initializing Marketplace Service")

    def retrieve_sell_offers(self):
        addresses = get_all_wallet_addresses()
        all_offers = []
        for address in addresses:
            nfts = xrp_ledger.get_all_nft_data(address)
            for nft in nfts:
                nftoken_id = nft["nft_details"]["NFTokenID"]
                sell_offers = xrp_ledger.get_sell_offers(nftoken_id)
                if isinstance(sell_offers, dict) and "error" in sell_offers:
                    print(f"Error retrieving sell offers for NFT {nftoken_id}: {sell_offers['error']}")
                    continue
                for offer in sell_offers:
                    offer_with_metadata = {
                        "offer": offer,  # Original offer details
                        "nft_metadata": nft.get("metadata"),  # NFT metadata
                        "nft_details": nft["nft_details"],  # Additional NFT details if needed
                    }
                    all_offers.append(offer_with_metadata)
        return all_offers

    def retrieve_account_sell_offers(self, address):
        all_offers = []
        nfts = xrp_ledger.get_all_nft_data(address)
        for nft in nfts:
            nftoken_id = nft["nft_details"]["NFTokenID"]
            sell_offers = xrp_ledger.get_sell_offers(nftoken_id)
            if isinstance(sell_offers, dict) and "error" in sell_offers:
                print(f"Error retrieving sell offers for NFT {nftoken_id}: {sell_offers['error']}")
                continue
            for offer in sell_offers:
                offer_with_metadata = {
                    "offer": offer,  # Original offer details
                    "nft_metadata": nft.get("metadata"),  # NFT metadata
                    "nft_details": nft["nft_details"],  # Additional NFT details if needed
                }
                all_offers.append(offer_with_metadata)
        return all_offers


marketplace_service = MarketplaceService()