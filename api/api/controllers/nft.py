from flask import Blueprint, jsonify, request
from xrpl.wallet import Wallet

from api.services.XrpLedger import XrpLedger

nft_routes = Blueprint('nft_routes', __name__)

@nft_routes.route('/nft/<string:wallet>', methods=['GET'])
def retrieve_account_nft(wallet):
    xrp_ledger = XrpLedger()
    return xrp_ledger.get_all_nft_data(wallet)

@nft_routes.route('/nft', methods=['POST'])
def mint_nft():
    wallet = Wallet(seed=request.json['seed'], public_key=request.json['public_key'], private_key=request.json['private_key'])
    xrp_ledger = XrpLedger()
    nft_metadata =request.json['nft']
    return xrp_ledger.mint_nft(wallet, nft_metadata)
