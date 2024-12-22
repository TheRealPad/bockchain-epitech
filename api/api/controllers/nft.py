from flask import Blueprint, request
from xrpl.wallet import Wallet

from api.services.XrpLedger import xrp_ledger

nft_routes = Blueprint('nft_routes', __name__)

@nft_routes.route('/nft/<string:wallet>', methods=['GET'])
def retrieve_account_nft(wallet):
    return xrp_ledger.get_all_nft_data(wallet), 200

@nft_routes.route('/nft', methods=['POST'])
def mint_nft():
    wallet = Wallet(seed=request.json['seed'], public_key=request.json['public_key'], private_key=request.json['private_key'])
    nft_metadata =request.json['nft']
    res = xrp_ledger.mint_nft(wallet, nft_metadata)
    if res is None:
        return {"error": "impossible to mint NFT"}, 500
    if "error" in res:
        return {"error": res["error"]}, 400
    return res, 201
