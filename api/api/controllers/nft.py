from flask import Blueprint, request
from xrpl.wallet import Wallet

from api.dto.pokemon import Pokemon, MissingFieldError
from api.services.XrpLedger import xrp_ledger
from api.services.db_services import insert_nft

nft_routes = Blueprint('nft_routes', __name__)

@nft_routes.route('/nft/<string:wallet>', methods=['GET'])
def retrieve_account_nft(wallet):
    return xrp_ledger.get_all_nft_data(wallet), 200

@nft_routes.route('/nft', methods=['POST'])
def mint_nft():
    wallet = Wallet(seed=request.json['seed'], public_key=request.json['public_key'], private_key=request.json['private_key'])
    try:
        nft_metadata = Pokemon.from_json(request.json['nft'])
    except MissingFieldError as e:
        print(e)
        return {'error': str(e)}, 400
    uuid = insert_nft(nft_metadata)
    res = xrp_ledger.mint_nft(wallet, Pokemon.to_dict(nft_metadata), uuid)
    if res is None:
        return {"error": "impossible to mint NFT"}, 500
    if "error" in res:
        return {"error": res["error"]}, 400
    return res, 201
